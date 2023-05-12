
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


// this processes a passed JSON structure representing gene matches and draws it to the result table
function processJSON(data) {
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

}



// run our javascript once the page is ready
$(document).ready(function () {
    // define what should happen when a user clicks submit on our search form
    $('#submit').click(function () {
        runSearch();
        return false;  // prevents 'normal' form submission
    });
});
