import _ from "lodash";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon"
var fetch = require('node-fetch');

export function get_multi_pokemon(ids) {
  return dispatch => {
    const promises = _.map(ids, (id) => dispatch(__get_pokemon(id, true)))
    Promise.all(promises).then((data) => {
      dispatch({type: 'RECEIVE_POKEMON', data})
    })
  }
}

export function get_random_pokemon(id) {
  return dispatch => {
    dispatch({type: 'REQUEST_RANDOM_POKEMON'})
    dispatch(__get_pokemon(id))
      .then((data) => {
        dispatch({type: 'RECEIVE_RANDOM_POKEMON', data})
      })
  }
}

function __get_pokemon(id) {
  return dispatch => {
    return fetch(`${POKEMON_API}/${id}`)
      .then(response => {
        if (response.status == 200)
          return response.json()
        else
          throw response
      })
      .then(json => {
        return json
      })
      .catch((error) => {
        console.log(error)
        dispatch({type: 'ERROR_REQUEST_POKEMON', id})
      })
  }
}

export function get_random_id(failed_ids) {

  return Math.floor(Math.random() * 965)
}