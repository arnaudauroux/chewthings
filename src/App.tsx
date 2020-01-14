import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import ShootingsList from './components/shootings-list/shootings-list.component';
import 'antd/dist/antd.css';
import './app.css';
import Shooting from './components/shooting/shooting.component';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className='layout-root'>
          <div className='header'>
            <Header />
          </div>
          <div className='content'>
            <Switch>
              <Route exact path='/' component={ShootingsList} />
              <Route path='/:shootingName' component={Shooting} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
