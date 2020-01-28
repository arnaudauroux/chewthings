import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import ShootingsList from './components/shootings-list/shootings-list.component';
import 'antd/dist/antd.css';
import './app.css';
import Shooting from './components/shooting/shooting.component';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

class App extends React.Component {
  state = {
    shooting: null
  };

  store: Store<unknown, any>;

  constructor(props: any) {
    super(props);

    this.store = createStore((s, a: any) => {
      switch (a.type) {
        case 'SHOOTING_SELECTED':
          return {
            shootingName: a.value
          };

        default: return {};
      }
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <div className='layout-root'>
            <div className='header'>
              <Header />
            </div>
            <div className='content'>
              <Switch>
                <Route exact path='/'>
                  <ShootingsList />
                </Route>
                <Route path='/:shootingName' component={Shooting} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
