A simple select field written as SFCs and and functionality composed through recompose and HOCs. Styled by CSS in JS.

Example invocation:
```javascript 

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
```

Technologies
* React
* React-Jss (Css in JS)
* Typescript
* Recompose
