$(document).ready(function () {
    // Load document from storage if available
    loadDocument();

    $( ".draggable" ).draggable();

    // add new textbox and make it draggable
    $("#new-text").click(function () {
        $(".page1").append("\n<p style='top:100px;left:100px' class='draggable' contenteditable>New Textbox</p>\n");
        $(".draggable").draggable();
    });

    $("#reset").click(function () {
        $(".exportable").html('<div class="page1"></div>');
        exportThis();
    })

    $(".page1").click(function () {
        exportThis();
    });

    // export all the positions of the new textboxes
    $("#export").click(function () {
       exportThis();
    });
});

function loadDocument() {
    var doc = localStorage.getItem("document");
    if (doc) {
        $(".exportable").html(doc);
        exportThis();
    }
}

function saveDocument() {
    localStorage.setItem("document", $(".exportable").html());
}

// Cleans all non-style related tags from the html to output
function cleanHTML(html) {
    var divNode = $.parseHTML(html)[0];
    var output = '<div class="' + divNode.className + '">\n';

    $.each(divNode.children, function (index, node) {
        for (let i; i = node.attributes.length - 1; i--) {
            if (node.attributes[i].name != "style") {
                node.removeAttribute(node.attributes[i].name);
            }
        }
        output += node.outerHTML + "\n";
    });

    return output + "</div>";
}

function exportThis() {
    saveDocument();
    $(".output textarea").val(cleanHTML($(".exportable").html()));
}
