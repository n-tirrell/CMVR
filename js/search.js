
// this function executes our search via an AJAX call
function runSearch(dtype) {
    // hide and clear the previous results, if any
    $('#results').hide();
    $('tbody').empty();

    // // transforms all the form parameters into a string we can send to the server
    var frmStr = $('#variant_search').serialize();

    $.ajax({
        url: './search_product.cgi',
        dataType: 'json',
        data: frmStr,
        success: function (data, dtype, textStatus, jqXHR) {
            processJSON(data, dtype);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Failed to perform gene search! textStatus: (" + textStatus +
                ") and errorThrown: (" + errorThrown + ")");
        }
    });
}

// this function creates the table for the variant data
function make_variant_table_head(table, data) {
    let thead = table.createTHead();
    $('<th/>', { "text": "Patient Name" }).appendTo('thead');
    $('<th/>', { "text": "Variant ID" }).appendTo('thead');
    $('<th/>', { "text": "Gene ID" }).appendTo('thead');
    $('<th/>', { "text": "Gene Name" }).appendTo('thead');
    $('<th/>', { "text": "Gene Product" }).appendTo('thead');

}

// this function creates the table for the model data
function make_model_table_head(table) {

    // create a row and append it to the body of the table
    $('<th/>', { "text": "Patient Name" }).appendTo('thead');
    $('<th/>', { "text": "Variant ID" }).appendTo('thead');
    $('<th/>', { "text": "Process ID" }).appendTo('thead');
    $('<th/>', { "text": "Process Name" }).appendTo('thead');
    $('<th/>', { "text": "Model ID" }).appendTo('thead');
    $('<th/>', { "text": "Model Name" }).appendTo('thead');

}

// this processes a passed JSON structure representing gene matches and draws it to the result table
function processJSON(data, dtype) {
    //populate the rows
    $('tbody').empty();
    
    // set the span that lists the match count
    $('#match_count').text(data.match_count);

    if (data.match_count > 0)
    {
        $("#results_header").empty();
        let headers = Object.keys(data["matches"][0])
        headers.forEach(header => {
            $('<th/>', { 'text': header }).appendTo($('#results_header'));
        });

        data["matches"].forEach(row => {
            let table_row = $('<tr/>')

            Object.keys(row).forEach(key => {
                $('<td/>', { "text": row[key] }).appendTo(table_row);
            });

            table_row.appendTo('tbody');
        });
        $('#results_table').show();
    } else {     
        $('#results_table').hide();
    }

    $('#results').show();

    // create the appropriate table
    // if (dtype = 'Variant Data'){
    //     make_variant_table()
    // } else {
    //     make_model_table()
    // }

    // // this will be used to keep track of row identifiers
    // var next_row_num = 1;

    // // iterate over each match and add a row to the result table for each
    // $.each(data.matches, function (i, item) {
    //     var this_row_id = 'result_row_' + next_row_num++;

    //     // create a row and append it to the body of the table
    //     $('<tr/>', { "id": this_row_id }).appendTo('tbody');

    //     // add the actual columns with data we want
    //     $('<td/>', { "text": item.patient_name }).appendTo('#' + this_row_id);
    //     $('<td/>', { "text": item.variant_id }).appendTo('#' + this_row_id);

    //     // filter which information we show
    //     if (dtype = "Variant Data"){
    //         $('<td/>', { "text": item.gene_id }).appendTo('#' + this_row_id);
    //         $('<td/>', { "text": item.gene_name }).appendTo('#' + this_row_id);
    //         $('<td/>', { "text": item.gene_product }).appendTo('#' + this_row_id);
    //     } else if (dtype = "Model Data"){
    //         $('<td/>', { "text": item.process_id }).appendTo('#' + this_row_id);
    //         $('<td/>', { "text": item.process_name }).appendTo('#' + this_row_id);
    //         $('<td/>', { "text": item.model_id }).appendTo('#' + this_row_id);
    //         $('<td/>', { "text": item.model_name }).appendTo('#' + this_row_id);
    //     }

    // });

    // now show the result section that was previously hidden
}



// run our javascript once the page is ready
$(document).ready(function () {
    // define what should happen when a user clicks submit on our search form
    $('#submit').click(function () {
        runSearch();
        return false;  // prevents 'normal' form submission
    });
});
