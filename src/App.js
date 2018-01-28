import React, { Component, button, input } from 'react';
import SketchCanvas from './Componets/SketchCanvas';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
		
    //Set the state for SearchBar to an empty string
    this.state = {
      term: ''
    };
  }
  _onInputChange(term) {
		this.setState({term});
    console.log(this.state.term)
  }

  _onSubmitClicked() {
    // this.timer = setTimeout(() => {
    console.log(this.state.term)
    // }, 1500);
  }

  render() {
    return (
      <div className="App">
       
        

        <div>
          <p>Type:</p>
          <input className="Search-bar-input"
            value={this.state.term}
            onChange={e => this._onInputChange(e.target.value)}
            placeholder="Add an item..."
          />
          <button onClick={ () => {this._onSubmitClicked()}}> Submit </button>
        </div>
        
        <p> or Draw :)</p>
        {/* Canvas Feature */}
        <div className="Canvas"> 
          <SketchCanvas/>
        </div>
      


      </div>
    );
  }
}

export default App;
