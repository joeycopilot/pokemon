import React, { Component } from 'react'
import _ from 'lodash'
import { get_multi_pokemon, get_random_pokemon, get_random_id } from './pokemon-actions'
import DisplayCard from '../../components/display-card'
import Button from "../../components/button";
import Header from "../../components/header"

export default class Pokemon extends Component {

  componentDidMount() {
    this.props.dispatch(get_multi_pokemon([7,4,1]))
  }

  render() {
    const {pokemon: {data, isFetching, random_poke, failed_fetch}} = this.props

    return (
      <div className={'pokemon-container'}>
        <Header>My Pokemon Cards</Header>

        <Button disabled={isFetching} onClick={this.handleClick_randomPokemon.bind(this)}>{isFetching ? 'Getting you a New Pokemon' : 'Get a New Pokemon'}</Button>

        <div className={'pokemon-card-container'}>
          {_.map(data, (poke, i) => {
            return (
              <DisplayCard
                className={'pokemon-card'}
                key={_.get(poke, 'id')}
                img={_.get(poke, 'sprites.front_default', _.get(poke, 'sprites.back_default'))}
              >
                <div className={'pokemon-card-content'}>
                  {_.get(poke, 'name') ? <div className={'pokemon-card-text name'}>{_.get(poke, 'name')}</div> : null}
                  {_.get(poke, 'height') ? <div className={'pokemon-card-text'}>Height: {_.get(poke, 'height')}</div> : null}
                  {_.get(poke, 'weight') ? <div className={'pokemon-card-text'}>Weight: {_.get(poke, 'weight')}</div> : null}
                  {_.get(poke, 'base_experience') ? <div className={'pokemon-card-text'}>Base Experience: {_.get(poke, 'base_experience')}</div> : null}
                </div>

              </DisplayCard>
            )
          })}

          {failed_fetch ? <div>Oh no! That didn't work, maybe try again?</div> : null }

          {random_poke ?
            <DisplayCard
              className={'pokemon-card'}
              key={_.get(random_poke, 'id')}
              img={_.get(random_poke, 'sprites.front_default', _.get(random_poke, 'sprites.back_default'))}
            >
              <div className={'pokemon-card-content'}>
                {_.get(random_poke, 'name') ? <div className={'pokemon-card-text name'}>{_.get(random_poke, 'name')}</div> : null}
                {_.get(random_poke, 'height') ? <div className={'pokemon-card-text'}>Height: {_.get(random_poke, 'height')}</div> : null}
                {_.get(random_poke, 'weight') ? <div className={'pokemon-card-text'}>Weight: {_.get(random_poke, 'weight')}</div> : null}
                {_.get(random_poke, 'base_experience') ? <div className={'pokemon-card-text'}>Base Experience: {_.get(random_poke, 'base_experience')}</div> : null}
              </div>
            </DisplayCard>
            : null }
        </div>

      </div>
    )
  }

  handleClick_randomPokemon() {
      const {dispatch, pokemon: {failed_ids}} = this.props
      const random_id = get_random_id(failed_ids)
      dispatch(get_random_pokemon(random_id))
  }
}
