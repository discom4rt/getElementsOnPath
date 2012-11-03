# getElementsOnPath
Retrieve all the elements that fall on a line defined by two coordinate pairs, starting at the first pair and moving in the direction of the second.

[Check it out on JSFiddle](http://jsfiddle.net/discomfort/2B7nt)

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

For now, using big differences between points skips over the elements between them (see Future Considerations below).

## Future Considerations

* Scale t parameter granularity to 1 pixel level automatically so that document.getElementsOnPath( 0, 0, 1000, 1000 ) doesn't skip over elements between (0, 0) and (1000, 1000)
* Look into improving performance
* Bullet proof dimensions?
* Support n number of points by using some sort of interpolation (barycentric langrangian?)