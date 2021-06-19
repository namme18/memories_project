import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './redux/reducers/actions/postsActions/getAllPosts';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar ';
import Auth from './Components/Auth/Auth';
import AuthRoute from './Components/ProtectedRoute/AuthRoute';
import decode from 'jwt-decode';
import { logoutUser } from './redux/reducers/authReducer';

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  useEffect(() => {
    if(user?.token){
      const decodedToken = decode(user?.token);
      if(decodedToken.exp * 1000 < new Date().getTime())
      dispatch(logoutUser());
    }
    dispatch(getAllPosts());
  },[dispatch]);

  return(
    <Router>
      <Container maxWidth='lg'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/auth' component={Auth} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App;