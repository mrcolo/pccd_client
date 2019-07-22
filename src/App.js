import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'

import './App.css';
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Main from './Main.js'
import { Menu, Container, Header, Button } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { NewMap } from './NewMap';
import Link from 'react-router-dom/Link';

const supportsHistory = 'pushState' in window.history;

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }
  
  render(){
    return(
      <BrowserRouter forceRefresh={!supportsHistory}>
        <div className="back" >
        <Menu color="red" inverted fixed='top'>
          <Container>
          <Link 
          to={{
            pathname: '/',
            state: { prev: true },
          }} >
            <Menu.Item as='a' header>
              <Header style={{fontSize: 30}} inverted>PCCd</Header>
            </Menu.Item>
            </Link>
            <Menu.Item as='a' header>
            <Link 
              to={{
              pathname: '/newmap',
              state: { prev: true },
            }}>
              <Button size="medium"  inverted fluid>New Map</Button>
            </Link>
            </Menu.Item>
          </Container>
        </Menu>
        <Switch>
        <Route
          render={({ location }) => {
          const { pathname } = location;
          return (
            <TransitionGroup>
              <CSSTransition 
                key={pathname}
                classNames="page"
                timeout={{
                  enter: 1000,
                  exit: 1000,
                }}
              >
                <Route
                  location={location}
                  render={() => (
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={Main}
                      />
                      <Route
                        path="/newmap"
                        component={NewMap}
                      />
                    </Switch>
                  )}
                />
              </CSSTransition>
            </TransitionGroup>
             );
            }}
          />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
