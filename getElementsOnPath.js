(function( window, document, undefined ) {

  /**
   * Retrieve all the elements on the line that passes through (x1, y1) and (x2, y2) starting from (x1, y1), headed
   * in the direction of (x2, y2). I know it's sort of a no-no to augment a native object but, I'm doing it anyways.
   *
   * @param {number} x1 The x coordinate of the starting point.
   * @param {number} y1 The y coordinate of the starting point.
   * @param {number} x2 The x coordinate of the ending point.
   * @param {number} y2 The y coordinate of the ending point.
   * @return {array} A list of elements that fall on the line defined by (x1, y1) and (x2, y2).
   **/
  document.getElementsOnPath = function( x1, y1, x2, y2 ) {
    var documentRect = document.documentElement.getBoundingClientRect(),
      minX = documentRect.left,
      minY = documentRect.top,
      maxX = documentRect.right,
      maxY = documentRect.bottom,
      results = [],
      exists = {},
      tx = 1/(x2 - x1),         // Determine the t increment
      ty = 1/(y2 - y1),         // that will keep us
      ti = Math.min( tx, ty ),  // advancing pixel by pixel
      t = ti,
      currX = getCoordinate( x1, x2, t ),
      currY = getCoordinate( y1, y2, t ),
      currElement,
      lastElement,
      hash;

    while( currX > minX && currX < maxX && currY > minY && currY < maxY ){
      currElement = document.elementFromPoint( currX, currY );

      if( lastElement !== currElement ) {
        hash = hashCode( currElement );

        if( !exists[ hash ] ) {
            results.push( currElement );
            exists[ hash ] = currElement;
        }
      }

      t += ti;
      currX = getCoordinate( x1, x2, t );
      currY = getCoordinate( y1, y2, t );
      lastElement = currElement;
    }

    return results;
  };

  /**
   * Generate a hash code for an element based on its nodeName and position.  This is definitely fudging it
   * a little bit with the hope of being more performant; it would probably be more expensive to generate an
   * unique xpath or selector string.
   *
   * @param {HTMLElement} element The element for which to generate the hash code.
   * @return {string} The hash code for the given element.
   **/
  var hashCode = function( element ) {
    var elementRect = element.getBoundingClientRect();

    return element.nodeName + elementRect.top + elementRect.right + elementRect.bottom + elementRect.left;
  };

  /**
   * Retrieve a coordinate for the parameterized linear quation at t given starting coordinate c1
   * and ending coordinate c2.
   *
   * @param {number} c1 The x coordinate of the starting point.
   * @param {number} c2 The y coordinate of the starting point.
   * @param {number} t The parameter defining the point to return.
   * @return {number} The coordinate value at t.
   **/
  var getCoordinate = function( c1, c2, t ) {
    return Math.ceil( (1 - t) * c1 + t * c2 );
  };

})( window, document );