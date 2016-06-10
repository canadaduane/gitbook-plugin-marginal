# Marginal

A gitbook plugin that creates a margin for notes and callouts on the left-hand side of each page. When notes are too large to fit within the height of its accompanying paragraph, the note is truncated and a button is made visible that allows the note to expand (along with the associated paragraph). Works best with Asciidoc.

## Installation

Add the following to your `book.json` configuration file:

```
{
	"plugins": ["marginal"]
}
```

## Usage

This plugin provides a new block, the `marginal`:


```
{% marginal %}
____
*Quote* I, the writer, was born of Presbyterian parents...

https://archive.org/details/cihm_62453[The Rights of Christ] , 1815, p. 1
____
{% endmarginal %}

Regular paragraph goes here...
```

Your callouts should now be marginalized :) Note that there is a blank line between the `{% endmarginal %}` and the `Regular paragraph goes here...`. Without the space, it won't know which paragraph to associate with.

Note: the above "Quote" syntax comes from the [callouts](https://github.com/gubler/gitbook-plugin-callouts) gitbook plugin and can be used in conjunction with `gitbook-plugin-marginal`.