$(document).ready(function () {
    // Load document from storage if available
    loadDocument();
    registerPageClickEvent();
    setActiveTool("pointer")();

    $( ".draggable" ).draggable();

    // add new textbox and make it draggable
    $("#new-text").click(function () {
        addTextbox(100, 100);
    });

    $("#reset").click(function () {
        $(".exportable").html('<div class="page1"></div>');
        exportThis();
        registerPageClickEvent();
    });

    // export all the positions of the new textboxes
    $("#export").click(function () {
       exportThis();
    });

    $("#pointertool").click(setActiveTool("pointer"));
    $("#boxtool").click(setActiveTool("box"));
    $("#deletetool").click(setActiveTool("delete"));

    $("#showbounds").click(function () {
        if ($("#showbounds").hasClass("selected")) {
            $("#showbounds").removeClass("selected");
            $(".textfield").removeClass("bordered");
        } else {
            $("#showbounds").addClass("selected");
            $(".textfield").addClass("bordered");
        }
    });
});

function setActiveTool(tool) {
    return function () {
        $(".tool").removeClass("active-tool");
        $("#" + tool + "tool").addClass("active-tool");
    }
}

function getActiveTool() {
    return $(".active-tool")[0].id;
}

function registerPageClickEvent() {
    $(".page1").click(function (event) {
        switch(getActiveTool()) {
            case "pointertool":
                break;
            case "deletetool":
                if (event.target.tagName == "P") {
                    event.target.remove();
                }
                break;
            case "boxtool":
                if (event.target == this) {
                    addTextbox(event.pageY, event.pageX);
                }
                break;
        }
        exportThis();
    });
}

function addTextbox(top, left) {
    var textboxHTML = "\n<p style='top:" + top + "px;left:" + left + "px' class='draggable textfield' contenteditable>New Textbox</p>\n"
    $(".page1").append(textboxHTML);
    $(".draggable").draggable();
}

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
