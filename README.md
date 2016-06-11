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

This plugin provides a new block, the `margin`:

```
{% margin %}
____
Marginal callout
____
{% endmargin %}

Regular paragraph goes here...
```

Your callouts should now be marginalized :) Note that there is a blank line between the `{% endmarginal %}` and the `Regular paragraph goes here...`. Without the space, it won't know which paragraph to associate with.

### Optional: Number of Paragraphs

If you'd like to associate the marginal callout with more than one paragraph, tell `marginal` how many paragraphs:


```
{% margin 2 %}
____
Comment about first and second paragraph
____
{% endmargin %}

First paragraph goes here...

Second paragraph goes here...
```

Now the "Comment" will be associated with both the "First" and "Second" paragraphs (and thus, it will have more room to work with before the user must click the expander button on the marginal callout).
