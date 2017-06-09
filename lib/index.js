'use strict';

exports.__esModule = true;
exports.default = purescript;

/**
 * Webpack block for PureScript using the purs-loader
 *
 * @see https://github.com/ethul/purs-loader
 */
var productionDefaultConfig = {
  psc: 'psa',
  warnings: false
};

var developmentDefaultConfig = {
  psc: 'psa',
  warnings: true,
  watch: true
};

function purescript() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isProduction = arguments[1];

  isProduction = typeof isProduction === 'boolean' ? isProduction : process.env.NODE_ENV === 'production';

  return Object.assign(function (context) {
    return function (prevConfig) {
      context.purescript = Object.assign({}, context.purescript, isProduction ? productionDefaultConfig : developmentDefaultConfig);
      context.purescript.options = Object.assign(context.purescript.options, options

      // Return unchanged config (configuration will be created by the post hook)
      );return prevConfig;
    };
  }, { post: postConfig });
}

function postConfig(context, util) {
  var options = context.purescript.options;


  var loaderConfig = Object.assign({
    test: /\.purs$/,
    exclude: options.exclude || /node_modules/,
    use: [{ loader: 'purs-loader', options: options }]
  }, context.match);

  return util.merge({
    resolve: {
      extensions: ['.purs']
    },
    module: {
      rules: [loaderConfig]
    }
  });
}