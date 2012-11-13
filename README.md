# getElementsOnPath
Retrieve all the elements that fall on a line defined by two coordinate pairs, starting at the first pair and moving in the direction of the second.

[Check it out on JSFiddle](http://jsfiddle.net/discomfort/2B7nt)

## Usage
**document.getElementsOnPath( x1, y1, x2, y2 )**

Pretty straightforward I think!

### Example

	// get all the elements on a diagonal through the page and turn them red
	var documentRect = document.documentElement.getBoundingClientRect(),
		elements = document.getElementsOnPath( 0, 0, documentRect.right, documentRect.bottom ),
		i = elements.length;

	while( i-- ) {
		elements[ i ].style.backgroundColor = 'red';
	}

## Caveats
If an element is totally obscured by another one, it will not appear in the results (&lt;html&gt; by &lt;body&gt;, for example).

## Future Considerations

* Options for excluding elements, finding the first element of type, etc.
* Support n number of points by using some sort of interpolant (barycentric langrangian?)
* Look into improving performance