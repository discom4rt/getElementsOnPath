(function( window, document, undefined ) {

var elProto = window.Element.prototype,
  matcher = elProto.matchesSelector || elProto.mozMatchesSelector ||
          elProto.webkitMatchesSelector || elProto.oMatchesSelector ||
          elProto.msMatchesSelector || isSelectedBy;

  /**
   * Retrieve all the elements on the line that passes through (x1, y1) and (x2, y2) starting from (x1, y1), headed
   * in the direction of (x2, y2). I know it's sort of a no-no to augment a native object but, I'm doing it anyways.
   *
   * @param {Number} x1 The x coordinate of the starting point.
   * @param {Number} y1 The y coordinate of the starting point.
   * @param {Number} x2 The x coordinate of the ending point.
   * @param {Number} y2 The y coordinate of the ending point.
   * @param {String} selector A string with which to test element matching.
   * @param {Boolean} first If the first found element should be returned.
   * @return {Array} A list of elements that fall on the line defined by (x1, y1) and (x2, y2).
   **/
  document.getElementsOnPath = function( x1, y1, x2, y2, selector, first ) {
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

        if( !exists[ hash ] && ( !selector || matcher.call( currElement, selector ) ) ) {
            results.push( currElement );
            exists[ hash ] = currElement;
        }
      }

      // if we got something good, give it to em
      if( first && results.length ) {
        return results[ 0 ];
      }

      t += ti;
      currX = getCoordinate( x1, x2, t );
      currY = getCoordinate( y1, y2, t );
      lastElement = currElement;
    }

    return first ? results[ 0 ] : results;
  };

  /**
   * Retrieve the first element on the line that passes through (x1, y1) and (x2, y2) starting from (x1, y1), headed
   * in the direction of (x2, y2). This is a convenience method that proxies to getElementsOnPath.
   *
   * @param {Number} x1 The x coordinate of the starting point.
   * @param {Number} y1 The y coordinate of the starting point.
   * @param {Number} x2 The x coordinate of the ending point.
   * @param {Number} y2 The y coordinate of the ending point.
   * @param {String} selector A string with which to test element matching.
   * @return {Array} A list of elements that fall on the line defined by (x1, y1) and (x2, y2).
   **/
  document.getFirstElementOnPath = function( x1, y1, x2, y2, selector ) {
    return document.getElementsOnPath( x1, y1, x2, y2, selector, true );
  };

  /**
   * Retrieve a coordinate for the parameterized linear quation at t given starting coordinate c1
   * and ending coordinate c2.
   *
   * @param {Number} c1 The x coordinate of the starting point.
   * @param {Number} c2 The y coordinate of the starting point.
   * @param {Number} t The parameter defining the point to return.
   * @return {Number} The coordinate value at t.
   **/
  function getCoordinate( c1, c2, t ) {
    return Math.ceil( (1 - t) * c1 + t * c2 );
  }

  /**
   * Generate a hash code for an element based on its nodeName and position.  This is definitely fudging it
   * a little bit with the hope of being more performant; it would probably be more expensive to generate an
   * unique xpath or selector string.
   *
   * @param {HTMLElement} element The element for which to generate the hash code.
   * @return {String} The hash code for the given element.
   **/
  function hashCode( element ) {
    var elementRect = element.getBoundingClientRect();

    return element.nodeName + elementRect.top + elementRect.right + elementRect.bottom + elementRect.left;
  }

  /**
   * Determines whether this element matches the given selector in a very primitive way by
   * checking if the nodename, id, or className matches the selector.  This is supposed to
   * provide some layer of compatibility with older browsers, but it's pretty crappy.
   *
   * @param {String} selector The selector representing the matching criteria.
   * @return {Boolean} True if the selector matches or is missing, false otherwise.
   **/
  function isSelectedBy( selector ) {
    // ooh, lord this is some cray hacky de-selectorizing
    // also, this should probably be cached...
    if( typeof selector === 'string' ) {
      selector = selector.replace( /([^#\. :]+)[#\.:]/g, '$1 ' ).replace( /[#\.]/g, '' );
    }

    return this.nodename === selector || this.id === selector || this.className === selector;
  }

})( window, document );