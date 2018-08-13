import fetchInfo from '../fetchInfo'

jest.mock('../../apiReducer', () => ({
  apiSuffix: suffix => suffix,
}))

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(fetchInfo(options)(state)).toEqual(state)
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'FOO' }

    expect(fetchInfo(options)(state, action)).toEqual(state)
  })
})

describe('with REQUEST action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'REQUEST' }
    expect(fetchInfo(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingInfo: true,
      infoError: null,
    })
  })
})

describe('with FAILURE action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'FAILURE', error: { message: 'foo-error' } }
    expect(fetchInfo(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingInfo: false,
      infoError: 'foo-error',
    })
  })
})

describe('with SUCCESS action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const info = { id: 1234 }
    const action = { type: 'SUCCESS', info }
    expect(fetchInfo(options)(state, action)).toEqual({
      foo: 'bar',
      fetchingInfo: false,
      info: { id: 1234 },
    })
  })
})
