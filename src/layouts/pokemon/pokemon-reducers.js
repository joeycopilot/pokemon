import _ from 'lodash'

function getInitialState() {
  return {
    isFetching: false,
    data: [],
    random_poke: null,
    failed_ids: [],
    failed_fetch: false,
  }
}
export default function(state = getInitialState(), action) {
  switch (action.type) {

    case 'RECEIVE_POKEMON':
      state = _.cloneDeep(state)
      _.set(state, 'data', action.data)
      return state
    case 'REQUEST_RANDOM_POKEMON':
      state = _.cloneDeep(state)
      _.set(state, 'isFetching', true)
      _.set(state, 'random_poke', null)
      return state
    case 'RECEIVE_RANDOM_POKEMON':
      state = _.cloneDeep(state)
      _.set(state, 'isFetching', false)
      _.set(state, 'random_poke', action.data)
      _.set(state, 'failed_fetch', false)
      return state
    case 'ERROR_REQUEST_POKEMON':
      state = _.cloneDeep(state)
      state.failed_ids.push(action.id)
      _.set(state, 'failed_ids', _.uniq(state.failed_ids))
      _.set(state, 'isFetching', false)
      _.set(state, 'failed_fetch', true)
      return state

    case 'RESET_STATE':
      state = getInitialState()
      return state
    default:
      return state;
  }
}