# APCC Final Project
## Computational Modeling Variant Reference (CMVR)

### About
The CMVR is a front-end webpage to search for genomic variants within patient data that has been saved in a MySQL database.  

The webpage can be accessed at: http://bfx3.aap.jhu.edu/ntirrel1/final/search.html


### Requirements
This tool requires a working browser to run on. 

This tool requires minimal storage, using no more than 1 KB during runs.

### Usage
1. Enter the patient's date of birth and the rsID of the variant of interest
2. Click the radio button of the data you want: variant, model, or patient data.
   - Variant data is the default search option. It provides the patient name, variant rsID, variant frequency, variant mutation, gene ID, gene name, and gene product. 
   - Model data returns the patient name, variant rsID, internal process ID, process name, internal model ID, and model name.
   - Patient data returns the variant rsID, patient name, patient date of birth, patient sex, and patient ethnicity.
3. Click the "Search" button for the results. If the variant rsID is not in the system, then we return "No matches found."

### Sample Runs
A sample run using the tool would be as follows:

      Patient DOB: 10/13/1989

      Variant ID: rs1799983

This will yield a successful match. If we change the variant ID to rs17999, then the search will yield 0 matches since this variant ID is not in the database. 

Here are several other examples that will yield results:

    Patient DOB: 12/10/1985

    Variant ID: rs1800795


    Patient DOB: 11/22/1967

    Variant ID: rs5186


    Patient DOB: 11/22/1967

    Variant ID: rs1132173
