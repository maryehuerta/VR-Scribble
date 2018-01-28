import React,
  { Component,
    button,
    input } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link } from 'react-router-dom'
import SketchCanvas from './Componets/SketchCanvas';
import SocketIOClient from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
		
    //Set the state for SearchBar to an empty string
    this.state = {
      term: '',

    };
    this.socket = SocketIOClient('http://52.203.31.93');
    // this.socket = SocketIOClient('10.209.18.92:3000');
  }
  
  componentDidMount() {
    // Connect to socketio
    this.socket.on('connect', () => {
      console.log('connected!')
    })
    this.socket.on('input_error', (data) => {
      toast.error(data.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      console.error(':( There is an error in input')
    })
    this.socket.on('success', (data) => {
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    })
    this.socket.on('disconnect', () => {
      console.error('bye')
    })

    // window.alert("Welcome to VR Scribble!\nType or draw the object your teamate needs.")
  }
  
  // For the text in input and submit button
  _onInputChange(term) {
		this.setState({term});
  }

  _onSubmitClicked() {
    const {term} = this.state
    this.socket.emit('spawn_text', term)
    this.setState({term: ''})
  }
  _sendImageData = (url) => {
    this.socket.emit('spawn_image', url);
	};

  render() {
    
    return (
      <div className="App">
        <div className="Typed-Input">
          <input className="Input"
            value={this.state.term}
            onChange={e => this._onInputChange(e.target.value)}
            placeholder="Type an item..."
          />
          <button onClick={ () => {this._onSubmitClicked()}}>Send Text</button>
        </div>
        <div className="Canvas"> 
          <SketchCanvas _sendImageData={ this._sendImageData }/>
        </div>
        <ToastContainer autoClose={2500} />
     </div>
    );
  }
}

export default App;
