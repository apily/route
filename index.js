/**
 * @component route
 * @description Route component
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

module.exports = Route;

/**
 * @constructor Router
 * @description Create a router.
 * @api public
 */

function Route (path) {
  if (!(this instanceof Route)) {
    return new Route(path);
  }
  this.path = path;
}
