import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
      <ProtectedRoute exact path='/' component={HomePage} />
      <ProtectedRoute exact path='/user' component={UserPage} />
    </Switch>
  );
}
