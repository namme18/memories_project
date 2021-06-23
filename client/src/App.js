import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './redux/reducers/actions/postsActions/getAllPosts';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar ';
import Auth from './Components/Auth/Auth';
import AuthRoute from './Components/ProtectedRoute/AuthRoute';
import PostDetails from './Components/PostDetails/PostDetails';
import decode from 'jwt-decode';
import { logoutUser } from './redux/reducers/authReducer';

const App = () => {// not working!
  const dispatch = useDispatch(); 
  const { user } = useSelector(state => state.authReducer);
  useEffect(() => {
    if(user?.token){
      const decodedToken = decode(user?.token);
      if(decodedToken.exp * 1000 < new Date().getTime())
      dispatch(logoutUser());
    }
  },[dispatch]);

  return(
    <Router>
      <Container maxWidth='xl'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={()=> <Redirect to='/posts' />} />
          |<Route exact path='/posts' component={Home} />
          <Route exact path='/posts/search' component={Home} />
          <Route path='/posts/:id' component={PostDetails} /> 
          <AuthRoute exact path='/auth' component={Auth} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App;