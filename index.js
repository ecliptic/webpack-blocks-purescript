// @flow
/**
 * Webpack block for PureScript using the purs-loader
 *
 * @see https://github.com/ethul/purs-loader
 */
export type Config = Object

export type Helpers = {merge: Config => Config}

export type Block = {
  (context: Object, helpers: Helpers): Config => Config,
  post: (context: Object, helpers: Helpers) => Config => Config
}

export type Options = {
  psc?: string,
  pscArgs?: Object,
  pscBundle?: string,
  pscBundleArgs?: Object,
  pscIde?: Boolean,
  pscIdeClient?: string,
  pscIdeClientArgs?: Object,
  pscIdeServer?: string,
  pscIdeServerArgs?: Object,
  pscIdeColors?: Boolean,
  pscPackage?: Boolean,
  bundleOutput?: string,
  bundleNamespace?: string,
  bundle?: Boolean,
  warnings?: Boolean,
  watch?: Boolean,
  output?: string,
  src?: Array<string>
}

const productionDefaultConfig = {
  options: {
    psc: 'psa',
    warnings: false,
  },
}

const developmentDefaultConfig = {
  options: {
    psc: 'psa',
    warnings: true,
    watch: true,
  },
}

export default function purescript (
  options: Options = {},
  isProduction: ?boolean
) {
  isProduction = typeof isProduction === 'boolean'
    ? isProduction
    : process.env.NODE_ENV === 'production'

  const main = context => prevConfig => {
    context.purescript = Object.assign(
      {},
      context.purescript,
      isProduction ? productionDefaultConfig : developmentDefaultConfig
    )
    context.purescript.options = Object.assign(
      context.purescript.options,
      options
    )

    // Return unchanged config (configuration will be created by the post hook)
    return prevConfig
  }

  return Object.assign(main, {post: postConfig})
}

function postConfig (context, util) {
  const {options} = context.purescript

  const loaderConfig = Object.assign(
    {
      test: /\.purs$/,
      exclude: options.exclude || /node_modules/,
      use: [{loader: 'purs-loader', options}],
    },
    context.match
  )

  return util.merge({
    resolve: {
      extensions: ['.purs'],
    },
    module: {
      rules: [loaderConfig],
    },
  })
}
