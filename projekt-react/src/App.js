import React, { Component} from 'react';
import './styles/App.css';
import RoutingComponent from './components/RoutingComponent';
import Test from './components/Test';

export default class App extends Component {
  static displayName = App.name;

    render() {  
  
    return (
      <>
      <RoutingComponent/>
      {/* <Test/> */}
      </>
    );
  }
}
