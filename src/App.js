import React, { Component } from 'react';
// import logo from './logo.svg';
import Card from "./components/Card";
import pokemon from "./pokemon.json";
import './App.css';

class App extends Component {
    state = {
        pokemon,
        score: 0,
        highScore: 0,
        clickedPokemon: [],
        wordsOfWisdom: "Click a Pokemon to begin your journey"
    };

    clickEm = id => {
        const PokemonClicked = this.state.clickedPokemon.indexOf(id);
        if (PokemonClicked === -1) {
            this.setState({ clickedPokemon: this.state.clickedPokemon.concat(id) });
            this.correctClick();
            console.log("good click");
        }
        else {
            this.incorrectClick();
            console.log("bad click");
        }
    };

    addPokemon = () => {
        const newScore = this.state.score + 1;
        this.setState({
            score: newScore,
        });
        console.log(newScore);
        if (newScore >= this.state.highScore) {
            this.setState({ highScore: newScore});
        }
        else if (newScore === 12) {
            this.setState({
                score: 0,
                highScore: this.state.highScore,
                clickedPokemon: [],
                wordsOfWisdom: "Congrats! You are a Pokemon Click Master"
            });
            this.sortPokemon(pokemon);
        }
    };

    sortPokemon = party => {
        party.sort((a, b) => {
            return 0.5 - Math.random();
        })
    };

    correctClick = () => {
        this.addPokemon();
        this.sortPokemon(pokemon);        
    };

    incorrectClick = () => {
        this.setState({
            score: 0,
            highScore: this.state.highScore,
            clickedPokemon: [],
            wordsOfWisdom: "Proceed to the nearest Pokemon Center and try again"
        });
        console.log("Proceed to the nearest Pokemon Center and try again");
        this.sortPokemon(pokemon);
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">

          {this.state.pokemon.map(pokemon => (
          <Card
            clickEm={this.clickEm}
            id={pokemon.id}
            key={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
          />
          ))}
        </header>
      </div>
    );
  }
}

export default App;
