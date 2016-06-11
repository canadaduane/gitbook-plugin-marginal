module.exports = {
    book: {
        assets: "./assets",
        css: ["marginal.css"],
        js: ["marginal.js"]
    },

    blocks: {
        margin: {
            process: function(block) {
                // "corresps" is the number of corresponding paragraphs that this marginal block is associated with
                var corresps = block.args.length == 1 ? block.args[0] : 1;
                return this.renderBlock('asciidoc', block.body).then(function(newBody) {
                    return ('<div class="marginal" data-corresps="' + corresps + '">'
                        + newBody
                        + '<div class="marginal-expander"><button class="marginal-expander-handle"><i class="fa fa-chevron-circle-down"></i></button></div>'
                        + '</div>');
                });
            }
        }
    }
};