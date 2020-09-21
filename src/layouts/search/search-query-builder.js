import React, { Component } from 'react'
import _ from 'lodash'
import join from '../../util/classnames'
import Dropdown from "../../components/dropdown";
import TextInput from "../../components/text-input";

export const SEARCH_FIELDS = [
  {display: 'User Email', value: 'user_email', data_type: 'string'},
  {display: 'Screen Width', value: 'screen_width', data_type: 'number'},
  {display: 'Screen Height', value: 'screen_height', data_type: 'number'},
  {display: 'First Name', value: 'user_first_name', data_type: 'string'},
  {display: 'Last Name', value: 'user_last_name', data_type: 'string'},
  {display: '# of Visits', value: 'visits' , data_type: 'number'},
  {display: 'Page Response time (ms)', value: 'page_response', data_type: 'number'},
  {display: 'Domain', value: 'domain', data_type: 'string'},
  {display: 'Page Path', value: 'path', data_type: 'string'}
]

const STRING_DENOMINATORS = [
  {display: 'equals', value: '='},
  {display: 'contains', value: 'contains'},
  {display: 'starts with', value: 'starts_with'},
  {display: 'in list', value: 'IN'}
]

const INTEGER_DENOMINATORS = [
  {display: 'equals', value: '='},
  {display: 'between', value: 'BETWEEN'},
  {display: 'greater than', value: '>'},
  {display: 'less than', value: '<'},
  {display: 'in list', value: 'IN'}
]


export default class SearchQueryBuilder extends Component {

  render() {
    const {
      selected_search_field,
      selected_search_denominator,
      search_input_one,
      search_input_two
    } = this.props

    const selected_search_field_type = _.get(_.find(SEARCH_FIELDS, {'value': selected_search_field}), 'data_type')
    // const input_error_error = search_input_one && typeof search_input_one !== selected_search_field_type
    const is_between = selected_search_denominator == 'BETWEEN'

    return (
      <div className={'search-query-builder-container'}>
        <div className={'query-builder-clear'} onClick={this.handleClick_clearBuilder.bind(this)}>X</div>
        <Dropdown
          className={'query-builder-input'}
          value={selected_search_field}
          values={SEARCH_FIELDS}
          onChange={this.update_queries.bind(this, 'selected_search_field')}
        />
        {is_between ? <div className={'query-builder-input-read-only'}>is</div>: null }
        <Dropdown
          className={'query-builder-input'}
          disabled={!selected_search_field}
          value={selected_search_denominator}
          values={selected_search_field_type == 'string' ? STRING_DENOMINATORS : INTEGER_DENOMINATORS}
          onChange={this.update_queries.bind(this, 'selected_search_denominator')}
        />
        <TextInput
          className={join('query-builder-input', {"small": is_between})}
          // error={input_error_error}
          disabled={!selected_search_field && !selected_search_denominator}
          type={selected_search_field_type}
          value={search_input_one}
          onChange={this.update_queries.bind(this, 'search_input_one')}
        />

        {is_between ? <div className={'query-builder-input-read-only'}>and</div>: null }

        {is_between ?
          <TextInput
            className={'query-builder-input small no-margin'}
            // error={input_error_error}
            disabled={!selected_search_field && selected_search_denominator}
            type={selected_search_field_type}
            value={search_input_two}
            onChange={this.update_queries.bind(this, 'search_input_two')}
          />
        : null }

      </div>
    )
  }

  handleClick_clearBuilder() {
    const {dispatch, index, search_queries} = this.props

    if (search_queries.length > 1) {
      let updated_queries = _.clone(search_queries)
      updated_queries.splice(index, 1)
      dispatch({type: 'UPDATE_QUERIES', updated_queries})
    } else {
      dispatch({type: 'RESET_QUERIES'})
    }
  }

  update_queries(field, evt) {
    const {dispatch, query, index, search_queries} = this.props
    let updated_query = _.clone(query)
    updated_query[field] = _.get(evt,'target.value')
    let updated_queries = _.clone(search_queries)
    updated_queries[index] = updated_query
    dispatch({type: 'UPDATE_QUERIES', updated_queries})
  }
}
