import React, { Component , Fragment } from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Navbar from '../src/Components/Layouts/Navbar';
import Index from '../src/Components/Layouts/Index';
import {Lyrics} from '../src/Components/Tracks/lyrics';

import {Provider} from "./context";

class App extends Component {
  render() {
    return (
        <Provider>
        <Router>
          <Fragment>
            <Navbar/>
            <div className="container">
              <Switch>
                  <Route exact path={'/'} component={Index}/>
                  <Route  path={'/lyrics/track/:id'} component={Lyrics}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
        </Provider>
    );
  }
}

export default App;
