# Marginal

A gitbook plugin that creates a margin for notes and callouts on the right-hand side of each page.

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
> #### Quote::I, the writer, was born of Presbyterian parents...
> [The Rights of Christ, 1815, p. 1](https://archive.org/details/cihm_62453)
{% endmarginal %}
```

Your callouts should now be marginalized :)

Note: the above "Quote" syntax comes from the [callouts](https://github.com/gubler/gitbook-plugin-callouts) gitbook plugin and can be used in conjunction with `gitbook-plugin-marginal`.