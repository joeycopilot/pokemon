import _ from 'lodash'

function getInitialState() {
  return {
    search_queries: [
      getEmptyQuery()
    ],
    show_sql_text_area: false,
  }
}
export default function(state = getInitialState(), action) {
  switch (action.type) {

    case 'UPDATE_QUERIES':
      state = _.cloneDeep(state)
      _.set(state, 'search_queries', action.updated_queries)
      return state
    case 'SHOW_SQL_OUTPUT_CONTAINER':
      state = _.cloneDeep(state)
      _.set(state, 'show_sql_text_area', true)
      return state

    case 'RESET_STATE':
      state = getInitialState()
      return state
    default:
      return state;
  }
}

export function getEmptyQuery() {
  return {
    selected_search_field: '',
    selected_search_denominator: '',
    search_input_one: '',
    search_input_two: ''
  }
}