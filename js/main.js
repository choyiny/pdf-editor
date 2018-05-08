$(document).ready(function () {
    // Load document from storage if available
    loadDocument();
    registerPageClickEvent();
    setActiveTool("pointer");

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

    $("#pointertool").click(function () {
        setActiveTool("pointer");
        $(".exportable").css("cursor", "default");
    });

    $("#checktool").click(function () {
        setActiveTool("check");
        $(".exportable").css("cursor", "crosshair");
    });

    $("#boxtool").click(function () {
        setActiveTool("box");
        $(".exportable").css("cursor", "crosshair");
    });

    $("#deletetool").click(function () {
        setActiveTool("delete");
        $(".exportable").css("cursor", "default");
    });

    $("#areatool").click(function () {
        setActiveTool("area");
        $(".exportable").css("cursor", "crosshair");
    });

    $("#showbounds").click(function () {
        if ($("#showbounds").hasClass("selected")) {
            $("#showbounds").removeClass("selected");
            $(".textfield").removeClass("bordered");
        } else {
            $("#showbounds").addClass("selected");
            $(".textfield").addClass("bordered");
        }
    });

    $("#loadimg").click(function () {
        $(".page1").css("background-image", "url(" + $("#imgfield").val() + ")");
    });

    $("#defaultimg").click(function () {
        $(".page1").css("background-image", 'url("../assets/ccac_page1.png")')
    });
});

function setActiveTool(tool) {
    $(".tool").removeClass("active-tool").removeAttr("clicknum");
    $("#" + tool + "tool").addClass("active-tool");
}

function getActiveTool() {
    return $(".active-tool")[0].id;
}

function registerPageClickEvent() {
    $(".page1").click(function (event) {
        switch(getActiveTool()) {
            case "areatool":
                if (event.target == this) {
                    if ($("#areatool").attr("clicknum") != 1) {
                        // First click -- set top left corner
                        $("#areatool").attr({"top": event.pageY, "left": event.pageX, "clicknum": 1});
                        $(".exportable").css("cursor", "cell");
                    } else {
                        // Second click -- create textbox
                        $("#areatool").attr("clicknum", 0);
                        var top = $("#areatool").attr("top");
                        var left = $("#areatool").attr("left");
                        addTextArea(top, left, event.pageY, event.pageX);
                        $(".exportable").css("cursor", "crosshair");
                    }
                }
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
            case "checktool":
                if (event.target == this) {
                    // Offset to center the checkbox
                    tickCheckbox(event.pageY - 8, event.pageX - 5);
                }
                break;
        }
        exportThis();
    });
}

function tickCheckbox(top, left) {
    var tickHtml = "\n<p style='top: " + top + "px;left: " + left + "px' class='draggable textfield'>&#10003;</p>"
    $(".page1").append(tickHtml);
    $(".draggable").draggable();
}

function addTextbox(top, left) {
    var textboxHTML = "\n<p style='top: " + top + "px;left: " + left + "px' class='draggable textfield' contenteditable>New Textbox</p>"
    $(".page1").append(textboxHTML);
    $(".draggable").draggable();
}

function addTextArea(top, left, bottom, right) {
    var width = right - left;
    var height = bottom - top;
    var textAreaHTML = "\n<p style='top: " + top + "px;left: " + left + "px; width: " + width + "px; height: " + height + "px;'  class='draggable textfield' contenteditable>New Text Area</p>"
    $(".page1").append(textAreaHTML);
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
function cleanHTML(element) {
    var divNode = element.clone();
    divNode.find("div").removeAttr("style").find("p").removeAttr("class").removeAttr("contenteditable");
    return divNode[0].innerHTML;
}

function exportThis() {
    saveDocument();
    $(".output textarea").val(cleanHTML($(".exportable")));
}
