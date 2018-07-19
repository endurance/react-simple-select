import * as React from 'react';
import { pure, compose, setDisplayName, withState, lifecycle } from 'recompose';
import { SimpleSelect } from './select/SimpleSelect';
import axios from 'axios';
const injectSheet = require('react-jss').default;

const AppStyles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        height: 200,
        margin: 'auto',
        width: '50%'
    }
};

const app = (props: any) => {
  const {classes, pokemon} = props;

  return (
    <div className={classes.container}>
      <SimpleSelect 
        options={pokemon} 
        onSelect={console.log}
      />
    </div>
  );
};
export const App = compose(
  setDisplayName('App'),
  withState('pokemon', 'setPokemon', []),
  lifecycle({
    async componentDidMount() {
      const value: any = (await axios.get('http://pokeapi.salestock.net/api/v2/pokemon')).data;
      const pokemon = value.results.map((p: any, i: number) => {return {label: p.name, value: i}})
      this.setState({pokemon: pokemon});
    }
  }),
  injectSheet(AppStyles), 
  pure)(app);