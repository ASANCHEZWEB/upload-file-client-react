import React, { Component } from 'react';
import './App.css';

//importamos el componente
import AddThing from './components/AddThing'; 

class App extends Component {
  render() {
    return (
      <div className="App">
       <AddThing />
      </div>
    );
  }
}

export default App;