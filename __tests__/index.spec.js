// @flow
import purescript from '../index'

test('purescript()', () => {
  const block = purescript({template: 'assets/index.html'})
  const context = {fileType: () => /\.purs$/}
  const helpers = {
    merge: configSnippet => prevConfig => configSnippet,
  }

  block.pre(context, helpers)
  const result = block(context, helpers)({})

  expect(result).toMatchSnapshot()
})
