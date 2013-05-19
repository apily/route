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

  var result = this.create_regexp(path);

  this.path = path;
  this.keys = result.keys;
  this.regexp = result.regexp;
}

/**
 * @method match
 * @description test if `path` matches this route 
 * @param {String} path path to test 
 * @return {Boolean} true if `path` matches this route
 *   false otherwise
 * @api public
 */

Route.prototype.match = function (path) {
  var params = [];
  var keys = this.keys;
  var regexp = this.regexp;
  var qs_index;
  var match;
  var n;
  var i;
  var key;
  var val;

  qs_index = path.indexOf('?')
  if (qs_index !== -1) {
    path = path.slice(0, qs_index);
  }

  match = regexp.exec(path);
  if (!match) {
    return false;
  }

  match = match.splice(1);
  n = match.length;
  for (i = 0, i < n; i += 1) {
    key = keys[i];
    val = decodeURIComponent(match[i]);
    
    if (key) {
      params[key] = val;
    } else {
      params.push(val);
    }
  }

  return params;
};

/**
 * @method create_regexp
 * @description Create the regexp 
 * @param {String} path 
 * @api private
 */

Route.prototype.create_regexp = function (path, keys) {
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
};
