import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/header.component';
import ShootingsList from './components/shootings-list/shootings-list.component';
import 'antd/dist/antd.css';
import './app.css';

class App extends React.Component {

  render() {
    return (
      <div className='layout-root'>
        <div className='header'>
          <Header />
        </div>
        <Router>
          <div className='content'>
            <ShootingsList />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
