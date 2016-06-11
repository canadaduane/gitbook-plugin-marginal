function marginalHasOverflow(element) {
    return (element.offsetHeight < element.scrollHeight ||
            element.offsetWidth < element.scrollWidth);
}

function marginalFindParagraphForPanel(panel) {
    var paragraphs = $(panel).parent().nextAll(':not(:empty)');
    if (paragraphs.length > 0) {
        return $(paragraphs[0]);
    } else {
        return null;
    }
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
            var paragraph = marginalFindParagraphForPanel(panel);
            if (paragraph) {
                panel.removeClass('marginal-overflow');

                var newHeight = panel[0].scrollHeight;
                // paragraph.height(newHeight);
                // panel.height(newHeight);
                paragraph.animate({height: newHeight}, 200);
                panel.animate({height: newHeight}, 200);
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
            var paragraph = marginalFindParagraphForPanel(panel);
            if (paragraph) {
                $(panel).height(paragraph.height());
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