import React from 'react';
import {Pet} from "../components";
import {getPets} from "../constants";
import {stringContains} from "../helpers";

class PetList extends React.Component{
    breed;
    constructor(props){
        super(props);
        this.state = {
            _pets: [],
            pets: [],
            yukleniyor: true        
        }
    }

    componentDidMount() {
        getPets().then(data=> {
            this.setState({
                _pets: data,
                pets: data,
                yukleniyor: false
            })
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeFilter !== this.props.activeFilter){
            this.filterPets();
        }
        if(prevProps.searchValue !== this.props.searchValue){
            this.filterPets();
        }
    }

    filterPets = () => {
        if(!this.props.activeFilter){
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return stringContains(pet.name, this.props.searchValue)
                })
            });
        }else{
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return pet.breed === this.props.activeFilter;
                }).filter((filteredPet) => {
                    return stringContains(filteredPet.name, this.props.searchValue)
                })
            });
        }
    }


    handleScroll = e => {
        let element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            return(
               <div></div>
            )
        }
      }

    render(){
        const Yukleniyor = <div>Yukleniyor</div>;
        const EmptyPets = <div>Bulunamadı</div>;
        const Pets =  [<h3>Gösterilen Pet Sayısı: {this.state.pets.length}</h3>,
        
             <div className="row h-100" onscroll={this.handleScroll}>
            {
                this.state.pets.slice(0,4).map((pet) => {
                    return <Pet style={{height:"100px"}} key={Math.random()} {...pet} />
                })
                
            }
            </div>]
           
          if(this.state.yukleniyor){
            return Yukleniyor;
          }else if(this.state.pets.length === 0){
            return EmptyPets
        }else{
            return Pets;
        }
    }
}



export default PetList;
