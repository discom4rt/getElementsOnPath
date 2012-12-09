# getElementsOnPath
Retrieve all the elements that fall on a line defined by two coordinate pairs, starting at the first pair and moving in the direction of the second.  Optionally filter the elements returned by a selector and/or just retrieve the first element.

[Check it out on JSFiddle](http://jsfiddle.net/discomfort/2B7nt)

## Usage
**document.getElementsOnPath( x1, y1, x2, y2, [selector, returnFirstElement])**
**document.geFirstElementOnPath( x1, y1, x2, y2, [selector])**

### Example

	/**
	 * Get all the elements on a diagonal through the page and turn them red,
	 * then get the first div on the same diagonal and turn it green.
	 **/
	window.onload = function() {
	    var documentRect = document.documentElement.getBoundingClientRect(),
	      elementsOnPath = document.getElementsOnPath( 0, 0, documentRect.right, documentRect.bottom ),
	      firstDivOnPath = document.getFirstElementOnPath( 0, 0, documentRect.right, documentRect.bottom, 'div', true ),
	      i = elements.length;

	    while( i-- ) {
	      elementsOnPath[ i ].style.backgroundColor = 'red';
	    }

	    firstDivOnPath.style.backgroundColor = 'green';
	};

## Caveats
If an element is totally obscured by another one, it will not appear in the results (&lt;html&gt; by &lt;body&gt;, for example).

## Future Considerations

* Support n number of points by using some sort of interpolant (barycentric langrangian?)
* Look into improving performance