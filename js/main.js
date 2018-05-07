$(document).ready(function () {
    $( ".draggable" ).draggable();

    // add new textbox and make it draggable
    $("#new-text").click(function () {
        $(".page1").append("\n<p style='top:100px;left:100px' class='draggable' contenteditable>New Textbox</p>\n");
        $(".draggable").draggable();
    });

    $(".page1").click(function () {
        exportThis();
    });

    // export all the positions of the new textboxes
    $("#export").click(function () {
       exportThis();
    });
});

function exportThis() {
    $(".output textarea").val($(".exportable").html());
}
