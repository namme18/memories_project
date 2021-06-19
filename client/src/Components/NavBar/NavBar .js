import React from 'react';
import {
    AppBar,
    Typography,
    Toolbar,
    Button,
    Avatar
  } from '@material-ui/core';
import memories from '../../images/memories.png';
import useStyles from './style';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/authReducer';

const NavBar = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { user } = useSelector(state => state.authReducer);
    const logout = () => {
      dispatch(logoutUser());
    }
    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
      <Typography 
      className={classes.heading} 
      variant="h2" 
      align="center"
      component={Link}
      to='/'
      >
        Memories
      </Typography>

      <img
        className={classes.image}
        src={memories}
        alt="memories"
        height="60"
      />
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar 
              className={classes.purple}
              alt={user.name}
              src={user.imageUrl}
            >
              {user.name[0]}
            </Avatar>

            <Typography
              className={classes.userName}
              variant='h6'
            >
              {user.name}
            </Typography>

            <Button 
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>

          </div>
        ): (
          <Button 
          component={Link} 
          to='/auth' 
          variant='contained'
          color='primary'
          >
            SignIn
          </Button>
        )}
      </Toolbar>

    </AppBar>
  );
};

export default NavBar;
