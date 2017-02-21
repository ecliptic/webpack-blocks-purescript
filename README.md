# webpack-blocks-purescript

A [webpack-block](https://github.com/andywer/webpack-blocks) for [PureScript](http://www.purescript.org/) using [purs-loader](https://github.com/ethul/purs-loader).

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/webpack-blocks-purescript.svg)](https://www.npmjs.com/package/webpack-blocks-purescript)

## Installation

```sh
yarn add --dev webpack-blocks-purescript
```

or

```sh
npm install --save-dev webpack-blocks-purescript
```

## Usage

```js
import {createConfig, entryPoint, setOutput} from '@webpack-blocks/webpack2'
import babel from '@webpack-blocks/babel6'
import purescript from 'webpack-block-purescript'

export default createConfig([
  entryPoint(['babel-polyfill', './src/Main.js']),
  setOutput('./build/bundle.js'),
  babel(),
  purescript(),
])
```

## Options

See the options list [here](https://github.com/ethul/purs-loader#options).

Defaults:

* *psc:* `'psa'`
* *src:* `['bower_components/purescript-*/src/**/*.purs', 'src/**/*.purs']`
* *warnings:* `false`

## License

This project is licensed under [MIT](https://github.com/ecliptic/webpack-blocks-purescript/blob/master/LICENSE).
