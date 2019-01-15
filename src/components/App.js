import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let url = '/api/pets'

    this.state.filters.type === 'all'
      ? url
      : url = (url + `?type=${this.state.filters.type}`)

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({
        pets: [...data]
      }))
  }

  onAdoptPet = (id) => {
    let savedPets = this.state.pets.map(
      pet => {
        return pet.id === id
        ? {...pet, isAdopted: true }
        : pet
    })
    this.setState({
      pets: savedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
