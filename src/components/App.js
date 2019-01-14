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


  onChangeType = (typeOfFilter) => {
    this.setState({
      filters: {
        type: typeOfFilter
      }
    })
  }

  onFindPetsClick = () => {

    let API = '/api/pets'
    this.state.filters.type === 'all'
    ? API
    : API = '/api/pets'+`?type=${this.state.filters.type}`



    fetch(API)
    .then(r => r.json())
    .then(data => this.setState({
      pets: data
    }))
  }


  onAdoptPet =(individualPet) => {
    // individualPet.isAdopted = true
    let selected = this.state.pets.find(p => p=== individualPet)
    selected.isAdopted = true
    this.setState({
      pets: 
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
