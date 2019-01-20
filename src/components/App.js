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

adoptPet = petToChange => {
  const pets = [...this.state.pets]
  const foundPet = pets.find(pet => pet.id === petToChange.id)
  const foundPetCopy = JSON.parse(JSON.stringify(foundPet))
  foundPetCopy.isAdopted = true
  const index = pets.indexOf(petToChange)
  pets[index] = foundPetCopy
  this.setState({ pets })
}

updateFilter = (newFilter) => {
  this.setState({
    filters: {type: newFilter}
  })
}

getPets = () => {
  const { type } = this.state.filters
  const url = type === 'all'
  ? '/api/pets' :
  `/api/pets?type=${type}`

  fetch(url)
  .then(res => res.json())
  .then(pets => this.setState({ pets }))
  //the above last one is the same as pets: pets
}



// onChangeType = ({ target: { value } }) => {
//     this.setState({filters: {...this.state.filters, type: value}})
// }

// fetchPets = (event) => {
//   let baseURL = '/api/pets'
//   let filter = this.state.filters.type !== 'all' ? `?type=${this.state.filters.type}` : ""

//   fetch(baseURL+filter)
//   .then(res => res.json())
//   .then(filteredPets => this.setState({ pets: filteredPets}))
// }

  render() {
    const { updateFilter, getPets, adoptPet } = this
    const { pets } = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters updateFilter={updateFilter} getPets={getPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={pets} adoptPet={adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
