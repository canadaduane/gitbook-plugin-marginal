function marginalHasOverflow(element) {
    return (element.offsetHeight < element.scrollHeight ||
            element.offsetWidth < element.scrollWidth);
}

function marginalFindParagraphsForPanel(panel) {
    var paragraphs = $(panel).parent().nextAll(':not(:empty)');
    var corresps = parseInt($(panel).data("corresps"));
    if (paragraphs.length > 0 && corresps > 0) {
        var subset = paragraphs.slice(0, corresps);
        return subset;
    } else {
        return [];
    }
}

function marginalGetHeightForParagraphs(paragraphs) {
    var top = null, bottom = null;
    for (var i = 0; i < paragraphs.length; i++) {
        var p = $(paragraphs[i]);
        if (top === null || p.offset().top < top) {
            top = p.offset().top;
        }
        if (bottom === null || p.offset().top + p.height() > bottom) {
            bottom = p.offset().top + p.height();
        }
    }

    var height;
    if (top === null || bottom === null) {
        height = 0;
    } else {
        height = bottom - top;
    }
    console.log("height for paragraphs", height, paragraphs);
    return height;
}

function marginalAddExpanderEvents() {
    var marginPanels = $(".marginal");
    marginPanels.each(function(i, panel) {
        $(panel).mouseenter(function(e) {
            if (marginalHasOverflow(this)) {
                $(this).addClass('marginal-focused');
            } else {
                $(this).removeClass('marginal-focused');
            }
        });
        $(panel).mouseleave(function(e) {
            $(this).removeClass('marginal-focused');
        });
        $(panel).on("click", ".marginal-expander", function() {
            var panel = $(this).parent();
            var paragraphs = marginalFindParagraphsForPanel(panel);
            var paragraphsHeight = marginalGetHeightForParagraphs(paragraphs);
            if (paragraphs.length > 0) {
                panel.removeClass('marginal-overflow');
                var newPanelHeight = panel[0].scrollHeight;

                // Set bottom paragraph height
                var paragraph = $(paragraphs[paragraphs.length-1]);
                var newParagraphHeight = newPanelHeight - (paragraphsHeight - paragraph.height());
                if (newParagraphHeight > paragraph.height()) {
                    paragraph.animate({height: newParagraphHeight}, 200);
                }

                // Set panel height
                panel.animate({height: newPanelHeight}, 200);
            }
        });
    });
}

// Check panel overflow state and update classes as needed
function marginalPanelOverflow() {
    var marginPanels = $(".marginal");
    marginPanels.each(function(i, panel) {
        if (marginalHasOverflow(panel) && $(window).width() >= 800) {
            $(panel).addClass('marginal-overflow');
        } else {
            $(panel).removeClass('marginal-overflow');
        }
    });
}

// Check paragraph heights and update panel heights as needed
function marginalResizePanels() {
    var marginPanels = $(".marginal");
    marginPanels.each(function(i, panel) {
        if ($(window).width() >= 800) {
            var paragraphs = marginalFindParagraphsForPanel(panel);
            var height = marginalGetHeightForParagraphs(paragraphs);
            if (height > 0) {
                $(panel).height(height);
            }
        } else {
            $(panel).css('height', '');
        }
    });
}

function marginalFollowHeight() {
    $(window).resize(function(e) {
        marginalResizePanels();
        marginalPanelOverflow();
    });
}

// $(function() {

    
// });

require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        // On initial load, match the panel's height to its corresponding paragraph
        marginalResizePanels();
        // On initial load, set the panels' overflow states
        marginalPanelOverflow();

        // Whenenver the paragraph's height changes, make the panel's height match
        marginalFollowHeight();

        marginalAddExpanderEvents();

        $(".marginal").css('visibility', 'visible');
    });
});