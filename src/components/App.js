import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all',
      },
    }
  }

  changeType = event => {
    this.setState({
      filters: { ...this.state.filters, type: event.target.value },
    })
  }
  setPetsState = pets => {
    console.log('setPetsState')
    this.setState({
      pets: pets,
    })
  }
  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      if (pet.id === petId) {
        return { ...pet, isAdopted: true }
      } else {
        return pet
      }
    })
    this.setState({ pets })
  }
  findPets = event => {
    let petsUrl = '/api/pets'
    if (this.state.filters.type !== 'all') {
      petsUrl = `${petsUrl}?type=${this.state.filters.type}`
    }
    fetch(`${petsUrl}`)
      .then(response => response.json())
      .then(pets => this.setPetsState(pets))
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
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
                typeValue={this.state.filters.type}
              />
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
