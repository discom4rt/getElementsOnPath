(function( window, document, undefined ) {

  /**
   * Retrieve all the elements on the line that passes through (x1, y1) and (x2, y2) starting from (x1, y1), headed
   * in the direction of (x2, y2).
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
      t = 2,
      currentPoint = getPoint( x1, y1, x2, y2, t ),
      currentElement,
      lastElement,
      hash;

    while( currentPoint.x > minX && currentPoint.x < maxX && currentPoint.y > minY && currentPoint.y < maxY ){
      currentElement = document.elementFromPoint( currentPoint.x, currentPoint.y );

      if( lastElement !== currentElement ) {
        hash = hashCode( currentElement );

        if( !exists[ hash ] ) {
            results.push( currentElement );
            exists[ hash ] = currentElement;
        }
      }

      lastElement = currentElement;
      t += 1;
      currentPoint = getPoint( x1, y1, x2, y2, t );
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
   * Retrieve the coordinate pair for the parametric equation of the line passing through (x1, y1) and (x2, y2) at t.
   *
   * @param {number} x1 The x coordinate of the starting point.
   * @param {number} y1 The y coordinate of the starting point.
   * @param {number} x2 The x coordinate of the ending point.
   * @param {number} y2 The y coordinate of the ending point.
   * @param {number} t The parameter defining the point to return.
   * @return {object} The x and y coordinates of the point on the line passing through (x1, y1) and (x2, y2) at t.
   **/
  var getPoint = function( x1, y1, x2, y2, t ) {
    return {
        x: Math.ceil( (1 - t) * x1 + t * x2 ),
        y: Math.ceil( (1 - t) * y1 + t * y2 )
    };
  };

})( window, document );