#!/usr/local/bin/python3

import cgi, json
import mysql.connector

# this function will get the relevant information for the gene variant
def get_variant_info(cursor, variant, patient):
    qry = """
            SELECT p.patient_name , v.variant_id,  g.gene_id, g.gene_name, g.gene_product
                FROM variant v
                    JOIN patient_variant pv on pv.variant_id = v.variant_id
                    JOIN patient p on pv.patient_id = p.patient_id
                    JOIN gene g ON v.gene_id = g.gene_id
                WHERE v.variant_id = %s
                    AND p.patient_DOB = %s
    """
    cursor.execute(qry, (variant, patient))

    results = { 'match_count': 0, 'matches': list()}

    for (patient_name, variant_id, gene_id, gene_name, gene_product) in cursor:
        results['matches'].append({'Patient Name': patient_name, 'Variant ID': variant_id, 'Gene ID': gene_id, 'Gene Name': gene_name, 'Gene Product': gene_product})
        results['match_count'] += 1

    return results

# this function will get the relevant information about whether the variant is being modeled
def get_model_info(cursor, variant, patient):
    qry = """
            SELECT p.patient_name, v.variant_id, r.process_id, r.process_name, m.model_id, m.model_name
                FROM variant v
                    JOIN patient_variant pv on pv.variant_id = v.variant_id
                    JOIN patient p on pv.patient_id = p.patient_id
                    JOIN gene g ON v.gene_id = g.gene_id
                    JOIN process_gene gp ON g.gene_id = gp.gene_id
                    JOIN process r ON gp.process_id = r.process_id
                    JOIN model m ON r.model_id = m. model_id
                WHERE v.variant_id = %s
                    AND p.patient_DOB = %s
    """

    cursor.execute(qry, (variant, patient))

    results = { 'match_count': 0, 'matches': list() }

    for (patient_name, variant_id, process_id, process_name, model_id, model_name ) in cursor:
        results['matches'].append({'Patient Name': patient_name, 'Variant ID': variant_id, 'Process ID':process_id, 'Process Name': process_name, 'Model ID': model_id, 'Model Name': model_name})
        results['match_count'] += 1

    return results

# this function will get the relevant information about the patient with that variant
def get_patient_info(cursor, variant, patient):
    qry = """
            SELECT  v.variant_id, p.patient_name, p.patient_DOB, d.patient_sex, d.patient_ethnicity
                FROM variant v
                    JOIN patient_variant pv on pv.variant_id = v.variant_id
                    JOIN patient p on pv.patient_id = p.patient_id
                    JOIN demographics d on d.patient_id = p.patient_id
                WHERE v.variant_id = %s
                    AND p.patient_DOB = %s
    """

    cursor.execute(qry, (variant, patient))

    results = { 'match_count': 0, 'matches': list() }

    for (variant_id, patient_name, patient_DOB, patient_sex, patient_ethnicity ) in cursor:
        results['matches'].append({'Variant ID': variant_id, 'Patient Name': patient_name, 'DOB': patient_DOB.strftime("%m/%d/%Y"), 'Sex': patient_sex, 'Ethnicity': patient_ethnicity })
        results['match_count'] += 1

    return results

def main():

    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    variant = form.getvalue('search_term')
    patient = form.getvalue('patient_term')
    data = form.getvalue('data')
        
    conn = mysql.connector.connect(user='ntirrel1', password='Ntjhu98&', host='localhost', database='ntirrel1_final')
    cursor = conn.cursor()

    # get the information from the MySQL database
    if data == 'variant': # get variant info
        results = get_variant_info(cursor, variant, patient)
    elif data == 'model': # get model info
        results = get_model_info(cursor, variant, patient)
    else: # get patient info
        results = get_patient_info(cursor, variant, patient)

    conn.close()

    print(json.dumps(results))


if __name__ == '__main__':
    main()
