import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './ProtectedRoute';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './LoaderStyles.css';

class LoadRoute extends React.Component {
  componentWillMount() {
    nProgress.start();
  }

  componentDidMount() {
    nProgress.done();
  }

  render() {
    return <Route {...this.props} />;
  }
}

class ProtectedLoad extends React.Component {
  componentWillMount() {
    nProgress.start();
  }

  componentDidMount() {
    nProgress.done();
  }

  render() {
    return <ProtectedRoute {...this.props} />;
  }
}

export default function Router() {
  return (
    <Switch>
      <LoadRoute exact path='/login' component={LoginPage} />
      <LoadRoute exact path='/register' component={RegisterPage} />
      <ProtectedLoad exact path='/' component={HomePage} />
      <ProtectedLoad exact path='/user' component={UserPage} />
    </Switch>
  );
}
