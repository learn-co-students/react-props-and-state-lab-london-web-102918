import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return <div className="ui cards">{this.props.pets.map(pet => <Pet pet={pet} key={pet.id} id={pet.id} onAdoptPet={this.props.onAdoptPet} age={pet.age} gender={pet.gender} isAdopted={pet.isAdopted} name={pet.name} weight={pet.weight} type={pet.type}/>)}</div>
  }
}

export default PetBrowser
