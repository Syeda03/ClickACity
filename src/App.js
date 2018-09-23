//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import city from "./city.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    city,
    clickedCity: [],
    score: 0
  };

//when you click on a card ... the fish is taken out of the array
  imageClick = event => {
    const currentCity = event.target.alt;
    const cityAlreadyClicked =
      this.state.clickedCity.indexOf(currentCity) > -1;

//if you click on a fish that has already been selected, the game is reset and cards reordered
    if (cityAlreadyClicked) {
      this.setState({
        fish: this.state.city.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedCity: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available fish, your score is increased and cards reordered
    } else {
      this.setState(
        {
          fish: this.state.city.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedCity: this.state.clickedCity.concat(
            currentCity
          ),
          score: this.state.score + 1
        },
//if you get all 12 fish corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              fish: this.state.city.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedCity: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.city.map(city => (
            <FriendCard
              imageClick={this.imageClick}
              id={city.id}
              key={city.id}
              image={city.image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;