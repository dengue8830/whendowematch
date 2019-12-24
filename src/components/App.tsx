import React from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { companyStyles } from '../styles/theme';
import 'moment/locale/es';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Matcher } from './Matcher';
import { Login } from './login/Login';
import { sstorage } from '../utils/storage';

companyStyles.setStyles({ theme: 'white', primaryColor: '#e91e63', contrastPrimaryColor: 'white' });

function renderWithLogin() {
  if (sstorage.getUser()) {
    return <Matcher />
  }
  return <Redirect to='/login' />;
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={companyStyles.styles}>
        <Container>
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/' render={renderWithLogin} />
            <Route path='*' render={() => <Redirect to='/' />} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh;
  width: 100vw; */
  background-color: ${props => props.theme.screenColor};
`