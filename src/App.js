import React, { Component } from 'react';
import Search from './components/Search';
import ListResults from './components/ListResults';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <ListResults />
      </div>
    );
  }
}

export default App;
