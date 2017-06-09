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
  return Object.assign(function (context, _ref) {
    var merge = _ref.merge;
    return merge({
      resolve: {
        extensions: ['.purs']
      },
      module: {
        rules: [{
          test: context.fileType('application/x-purescript'),
          exclude: opts.exclude || /node_modules/,
          loader: 'purs-loader',
          options: opts
        }]
      }
    });
  }, { pre: preConfig });
}

function preConfig(context) {
  return function (config) {
    var registeredTypes = context.fileType.all();

    if (!('application/x-purescript' in registeredTypes)) {
      context.fileType.add('application/x-purescript', /\.purs$/);
    }

    return config;
  };
}