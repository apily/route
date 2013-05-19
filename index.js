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

  var result = path_to_regexp(path);

  this.path = path;
  this.keys = result.keys;
  this.regexp = result.regexp;
}

function path_to_regexp (path, keys) {
  keys = keys || [];

  path = path
    .replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, function (match) {
      return '\\$&';
    })
    .replace(/\((.*?)\)/g, function (match, key) {
      keys.push(key);
      return '([^\/]+)?';
    })
    .replace(/:(\w+)/g, function (match, key) {
      keys.push(key);
      return '([^\/]+)';
    })
    .replace(/\*\w+/g, function (match, key) {
      keys.push(key);
      return '(.*?)';
    };
  
  var regexp = new RegExp('^' + path + '$');

  return { regexp: regexp, keys: keys };
}