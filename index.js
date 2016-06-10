module.exports = {
    book: {
        assets: "./assets",
        css: ["marginal.css"],
        js: ["marginal.js"]
    },

    blocks: {
        marginal: {
            process: function(block, c) {
                // var blocks = block.body.split("\n\n");
                // var promises = [];
                // for (var i = 0; i < blocks.length; i++) {
                //     promises.push(this.renderBlock('markdown', blocks[i]));
                // }
                // return Promise.all(promises).then(function(newBody) {
                //     // console.log("newBody", newBody);
                //     return ('<div class="marginal">'
                //         + newBody.join("\n\n")
                //         + '<div class="marginal-expander"><button class="marginal-expander-handle"><i class="fa fa-chevron-circle-down"></i></button></div>'
                //         + '</div>');
                // });

                return this.renderBlock('asciidoc', block.body).then(function(newBody) {
                    return ('<div class="marginal">'
                        + newBody
                        + '<div class="marginal-expander"><button class="marginal-expander-handle"><i class="fa fa-chevron-circle-down"></i></button></div>'
                        + '</div>');
                });
            }
        }
    }
};