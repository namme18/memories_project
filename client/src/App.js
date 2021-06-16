import React, { useEffect, useState } from 'react';
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid
} from '@material-ui/core';
import memories from './images/memories.png';
import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './redux/reducers/actions/postsActions/getAllPosts';


const App = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts());
  },[dispatch, posts]);

  return(
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId ={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;