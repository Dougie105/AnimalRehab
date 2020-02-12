import React from "react";
import { Link } from 'react-router-dom';

class Animals extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeHandler(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitForm(event){
    event.preventDefault();
    this.props.onSubmit(this.state.name);
  }

  render(){
    return(
    <>
    <h1>Animals currently in care: {this.props.animals.length}</h1>
    <form onSubmit={this.submitForm}>
        <fieldset>
            <input name="name" type="text" placeholder="animal" value={this.state.name} onChange={this.changeHandler}/>
            <input type="submit" placeholder="submit"/>            
        </fieldset>            
    </form>  
           
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Entry date</th>
          <th>Exit date</th>
        </tr>
      </thead>
      <tbody>
        {this.props.animals.map(animal => (
          <tr key={animal.id}>
            <td>{animal.id}</td>
            <td>
              <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
            </td>
            <td>{animal.entryAt}</td>
            <td>{animal.exitAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)
 }
  }
export default Animals