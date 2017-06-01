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

const defaultOpts = {
  psc: 'psa',
  warnings: false,
}

export default function purescript (options: ?Options) {
  const opts = {...defaultOpts, ...options}
  return Object.assign(
    (context, {merge}) =>
      merge({
        resolve: {
          extensions: ['.purs'],
        },
        module: {
          rules: [
            {
              test: context.fileType('application/x-purescript'),
              exclude: opts.exclude || /node_modules/,
              loader: 'purs-loader',
              options: opts,
            },
          ],
        },
      }),
    {pre: preConfig}
  )
}

function preConfig (context: Object, {merge}: Helpers): Config => Config {
  return config => {
    const registeredTypes = context.fileType.all()

    if (!('application/x-purescript' in registeredTypes)) {
      context.fileType.add('application/x-purescript', /\.purs$/)
    }

    return config
  }
}
