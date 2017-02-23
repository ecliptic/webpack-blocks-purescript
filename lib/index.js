'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = purescript;
/**
 * Webpack block for PureScript using the purs-loader
 *
 * @see https://github.com/ethul/purs-loader
 */
var defaultOpts = {
  psc: 'psa',
  warnings: false
};

function purescript(options) {
  var opts = _extends({}, defaultOpts, options);

  var setter = function setter(context) {
    return {
      resolve: {
        extensions: ['.purs']
      },
      module: {
        loaders: [{
          test: context.fileType('application/x-purescript'),
          loader: 'purs-loader',
          exclude: opts.exclude || /node_modules/,
          query: opts
        }]
      }
    };
  };

  return Object.assign(setter, { pre: pre });
}

function pre(context) {
  var registeredTypes = context.fileType.all();
  if (!('application/x-purescript' in registeredTypes)) {
    context.fileType.add('application/x-purescript', /\.purs$/);
  }
}
module.exports = exports['default'];