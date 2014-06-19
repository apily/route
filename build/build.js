/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("route", function (exports, module) {
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
  var match;
  var n;
  var i;
  var key;
  var val;

  path = path.split('?')[0];

  match = regexp.exec(path);

  if (!match) {
    return false;
  }

  match = match.splice(1);
  n = match.length;
  for (i = 0; i < n; i += 1) {
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
    .replace(/[\-{}\[\]+?.,\\\^$|#\s]/g, '\\$&')
    .replace(/\((.*?)\)/g, function (match, key) {
      keys.push(key);
      return '([^\/]+)?';
    })
    .replace(/:(\w+)/g, function (match, key) {
      keys.push(key);
      return '([^\/]+)';
    })
    .replace(/\*(\w*)/g, function (match, key) {
      keys.push(key);
      return '(.*?)';
    });
  
  var regexp = new RegExp('^' + path + '$');

  return { regexp: regexp, keys: keys };
};

});

require("route")
