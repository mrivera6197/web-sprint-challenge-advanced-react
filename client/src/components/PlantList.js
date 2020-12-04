import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor () {
    super()
    this.state = {
      plants: []
    }
  }

  toggleMode = e => {
    e.preventDefault()
    this.props.setDarkMode(!this.props.darkMode)
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  componentDidMount() {
    fetch('http://localhost:3333/plants')
    .then(res => res.json())
    .then(data => {
      this.setState({
        plants: data.plantsData
      })
    })
    .catch(err => console.log('error', err))
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <div>
        <div className='toggle-container'>
          <div
            onClick={this.toggleMode}
            className={this.props.darkMode ? 'toggle' : 'toggle toggled'}
          >
          </div>
        </div>
        <main className="plant-list">
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" data-testid="plant-card" key={plant.id}>
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
