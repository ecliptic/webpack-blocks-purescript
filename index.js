/**
 * Webpack block for PureScript using the purs-loader
 *
 * @see https://github.com/ethul/purs-loader
 */
const defaultOpts = {
  psc: 'psa',
  warnings: false,
}

export default function purescript (options) {
  const opts = {...defaultOpts, ...options}

  const setter = (context) => ({
    resolve: {
      extensions: ['.purs'],
    },
    module: {
      loaders: [{
        test: context.fileType('application/x-purescript'),
        loader: 'purs-loader',
        exclude: opts.exclude || /node_modules/,
        query: opts,
      }],
    },
  })

  return Object.assign(setter, {pre})
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-purescript' in registeredTypes)) {
    context.fileType.add('application/x-purescript', /\.purs$/)
  }
}
