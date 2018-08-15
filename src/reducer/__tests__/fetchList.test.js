import fetchList from '../fetchList'

jest.mock('../../apiReducer', () => ({
  apiSuffix: suffix => suffix,
}))

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(fetchList(options)(state)).toEqual(state)
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'FOO' }

    expect(fetchList(options)(state, action)).toEqual(state)
  })
})

describe('with REQUEST action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const path = '/foo/path'
    const action = { type: 'REQUEST', path }
    expect(fetchList(options)(state, action)).toEqual({
      foo: 'bar',
      listPath: '/foo/path',
      fetchingList: true,
      listError: null,
    })
  })
})

describe('with FAILURE action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'FAILURE', error: { message: 'foo-error' } }
    expect(fetchList(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingList: false,
      listError: 'foo-error',
    })
  })
})

describe('with SUCCESS action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const list = [{ id: 123 }, { id: 456 }]
    const action = { type: 'SUCCESS', list }
    expect(fetchList(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingList: false,
      list: [{ id: 123 }, { id: 456 }],
    })
  })
})
