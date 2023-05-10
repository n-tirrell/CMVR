#!/usr/local/bin/python3

import cgi, json
import mysql.connector

def main():

    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    variant = form.getvalue('search_term')
    patient = form.getvalue('patient_term')
        
    conn = mysql.connector.connect(user='ntirrel1', password='Ntjhu98&', host='localhost', database='ntirrel1_final')
    cursor = conn.cursor()
    
    qry = """
            SELECT p.patient_name, v.variant_id,  g.gene_id, g.gene_name, g.gene_product, r.process_id, r.process_name, m.model_id, m.model_name
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

    for (patient_name, variant_id, gene_id, gene_name, gene_product, process_id, process_name, model_id, model_name ) in cursor:
        results['matches'].append({'patient_name': patient_name, 'variant_id': variant_id, 'gene_id': gene_id, 'gene_name': gene_name, 'gene_product': gene_product, 'process_id':process_id, 'process_name': process_name, 'model_id': model_id, 'model_name': model_name})
        results['match_count'] += 1

    conn.close()

    print(json.dumps(results))


if __name__ == '__main__':
    main()
