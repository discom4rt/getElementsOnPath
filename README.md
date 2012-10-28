# getElementsOnPath
Retrieve all the elements that fall on a line defined by two coordinate pairs, starting at the first pair and moving in the direction of the second.

[Check it out on JSFiddle](http://jsfiddle.net/discomfort)

## Usage
**document.getElementsOnPath( x1, y1, x2, y2 )**

Pretty straightforward I think!

### Example

	// get all the elements on a diagonal through the page and turn them red
	var elements = document.getElementsOnPath( 0, 0, 1, 1 ),
		i = elements.length;

	while( i-- ) {
		elements[ i ].style.backgroundColor = 'red';
	}

## Caveats
If an element is totally obscured by another one, it will not appear in the results (&lt;html&gt; by &lt;body&gt;, for example).

## Future Considerations

* Look into improving performance