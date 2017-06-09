import {createConfig, match} from '@webpack-blocks/core'
import purescript from '../index'

test('PureScript default options work', () => {
  const config = createConfig({}, [purescript()])

  expect(config.module.rules).toEqual([
    {
      test: /\.purs$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'purs-loader',
          options: {
            psc: 'psa',
            warnings: true,
            watch: true,
          },
        },
      ],
    },
  ])
})

test('PureScript default production options work', () => {
  const config = createConfig({}, [purescript({}, true)])

  expect(config.module.rules).toEqual([
    {
      test: /\.purs$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'purs-loader',
          options: {
            psc: 'psa',
            warnings: false,
          },
        },
      ],
    },
  ])
})

test('PureScript options and custom match() work', () => {
  const config = createConfig({}, [
    match('*.pursfile', {exclude: 'foo/'}, [
      purescript({
        pscPackage: true,
      }),
    ]),
  ])

  expect(config.module.rules).toEqual([
    {
      test: /^.*\.pursfile$/,
      exclude: 'foo/',
      use: [
        {
          loader: 'purs-loader',
          options: {
            psc: 'psa',
            warnings: true,
            watch: true,
            pscPackage: true,
          },
        },
      ],
    },
  ])
})
