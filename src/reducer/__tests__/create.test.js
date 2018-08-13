import create from '../create'

jest.mock('../../apiReducer', () => ({
  apiSuffix: suffix => suffix,
}))

const options = {}

describe('without action', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    expect(create(options)(state)).toEqual(state)
  })
})

describe('with unknown action type', () => {
  it('returns state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'FOO' }

    expect(create(options)(state, action)).toEqual(state)
  })
})

describe('with REQUEST action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'REQUEST' }
    expect(create(options)(state, action)).toEqual({
      foo: 'bar',
      creating: true,
      createError: null,
    })
  })
})

describe('with FAILURE action', () => {
  it('returns the correct state', () => {
    const state = { foo: 'bar' }
    const action = { type: 'FAILURE', error: { message: 'foo-error' } }
    expect(create(options)(state, action)).toEqual({
      foo: 'bar',
      creating: false,
      createError: 'foo-error',
    })
  })
})

describe('with SUCCESS action', () => {
  describe('without list', () => {
    it('returns the correct state', () => {
      const state = { foo: 'bar' }
      const created = { id: 1234 }
      const action = { type: 'SUCCESS', created }
      expect(create(options)(state, action)).toEqual({
        foo: 'bar',
        creating: false,
        created: { id: 1234 },
        info: { id: 1234 },
        list: null,
      })
    })
  })

  describe('with list and no options', () => {
    it('returns correct state', () => {
      const state = {
        foo: 'bar',
        list: [{ id: 456 }, { id: 789 }],
      }
      const created = { id: 1234 }
      const action = { type: 'SUCCESS', created }
      expect(create(options)(state, action)).toEqual({
        foo: 'bar',
        creating: false,
        created: { id: 1234 },
        info: { id: 1234 },
        list: [{ id: 456 }, { id: 789 }, { id: 1234 }],
      })
    })
  })

  describe('with list and addCreatedToTop', () => {
    it('returns correct state', () => {
      const addCreatedToTop = true
      const state = {
        foo: 'bar',
        list: [{ id: 456 }, { id: 789 }],
      }
      const created = { id: 1234 }
      const action = { type: 'SUCCESS', created }
      expect(create({ addCreatedToTop })(state, action)).toEqual({
        foo: 'bar',
        creating: false,
        created: { id: 1234 },
        info: { id: 1234 },
        list: [{ id: 1234 }, { id: 456 }, { id: 789 }],
      })
    })
  })
})
