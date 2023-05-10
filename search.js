
// this function executes our search via an AJAX call
function runSearch() {
    // hide and clear the previous results, if any
    $('#results').hide();
    $('tbody').empty();

    // // transforms all the form parameters into a string we can send to the server
    var frmStr = $('#variant_search').serialize();

    $.ajax({
        url: './search_product.cgi',
        dataType: 'json',
        data: frmStr,
        success: function (data, textStatus, jqXHR) {
            processJSON(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Failed to perform gene search! textStatus: (" + textStatus +
                ") and errorThrown: (" + errorThrown + ")");
        }
    });
}


// this processes a passed JSON structure representing gene matches and draws it
//  to the result table
function processJSON(data) {
    $('tbody').empty();
    
    // set the span that lists the match count
    $('#match_count').text(data.match_count);

    // this will be used to keep track of row identifiers
    var next_row_num = 1;

    // iterate over each match and add a row to the result table for each
    $.each(data.matches, function (i, item) {
        var this_row_id = 'result_row_' + next_row_num++;

        // create a row and append it to the body of the table
        $('<tr/>', { "id": this_row_id }).appendTo('tbody');

        // add the actual columns with data we want
        $('<td/>', { "text": item.patient_name }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.variant_id }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.gene_id }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.gene_name }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.gene_product }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.process_id }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.process_name }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.model_id }).appendTo('#' + this_row_id);
        $('<td/>', { "text": item.model_name }).appendTo('#' + this_row_id);


    });

    // now show the result section that was previously hidden
    $('#results').show();
}



// run our javascript once the page is ready
$(document).ready(function () {
    console.log('Hello')
    // define what should happen when a user clicks submit on our search form
    $('#submit').click(function () {
        runSearch();
        return false;  // prevents 'normal' form submission
    });

    $('#search_box').autocomplete({
        source: function (request, response) {
            var frmStr = $('#variant_search').serializeArray();

            frmStr.push({ name: 'ac', value: true });

            $.ajax({
                url: "search_product.cgi",
                dataType: "json",
                data: frmStr,
                success: function (data) {
                    options = []
                    Object.keys(data.matches).forEach((key) => {
                        options.push(data.matches[key].product);
                    });
                    response(options);
                    console.log(options);
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $('#search_box').val(ui.item.value);
        }
    });
});
