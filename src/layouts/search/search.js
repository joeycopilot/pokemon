import React, { Component } from 'react'
import _ from 'lodash'
import Button from "../../components/button"
import SearchQueryBuilder from "./search-query-builder"
import {getEmptyQuery} from "./search-reducers"

export default class Search extends Component {

  componentDidMount() {
  }

  render() {
    const {dispatch, search: {search_queries, show_sql_text_area}} = this.props
    const num_queries = _.size(search_queries)

    return (
      <div className={'search-container'}>
        <div className={'search-title'}>Search for Sessions</div>

        <div className={'search-queries'}>
          {_.map(search_queries, (query, i) => {
            //------------------------------------
            return (
              <SearchQueryBuilder
                {...{dispatch, query, search_queries}}
                index={i}
                key={i + "_query_builder"}
                selected_search_field={query.selected_search_field}
                selected_search_denominator={query.selected_search_denominator}
                search_input_one={query.search_input_one}
                search_input_two={query.search_input_two}

              />
            )
            //------------------------------------
          })}
          <Button className={'primary add-query'} onClick={this.handleClick_add.bind(this)}>And</Button>

        </div>


        <div className={'search-action-container'}>
          <Button className={'primary'} onClick={this.handleClick_search.bind(this)}>Search</Button>
          <Button className={'secondary'} onClick={this.handleClick_reset.bind(this)}>Reset</Button>
        </div>


        {show_sql_text_area ?
          <div className={'sql_output_container'}>
            SELECT * FROM session

            {_.map(search_queries, (query, i) => {
              var invalid_query = !query.selected_search_field && !query.selected_search_denominator
                && (query.selected_search_denominator == 'BETWEEN' ? !query.search_input_one && !query.search_input_two : !query.search_input_one)

              //------------------------------------
              return (
                <div className={"query_line"} key={i+'_query_line'}>
                  <div>{structureQuery(query)} {invalid_query ? <span className={'query_line_error'}>Invalid Input</span>: null}</div>
                  {i < num_queries ? <div>AND</div> : null }
                </div>
              )
              //------------------------------------
            })}
          </div>
        : null }


      </div>
    )
  }

  handleClick_search() {
    this.props.dispatch({type: 'SHOW_SQL_OUTPUT_CONTAINER'})
  }

  handleClick_reset() {
    this.props.dispatch({type: 'RESET_STATE'})
  }

  handleClick_add() {
    const {dispatch, search: {search_queries}} = this.props
    let updated_queries = _.clone(search_queries)
    updated_queries.push(getEmptyQuery())
    dispatch({type: 'UPDATE_QUERIES', updated_queries})
  }
}


function structureQuery(query) {
  switch(query.selected_search_denominator) {
    case 'starts_with':
      return 'WHERE ' + query.selected_search_field + ' LIKE ' +  query.search_input_one + '%';
    case 'contains':
      return 'WHERE ' + query.selected_search_field + ' LIKE ' + '%' + query.search_input_one;
    case 'BETWEEN':
      return 'WHERE ' + query.selected_search_field + ' BETWEEN ' +  query.search_input_one + ' AND ' +  query.search_input_two;
    default:
      return 'WHERE ' + query.selected_search_field + ' ' + query.selected_search_denominator + ' ' +  query.search_input_one;
  }
}
