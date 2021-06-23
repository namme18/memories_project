import React, { useState, useEffect } from 'react';
import {
    Container,
    Grow,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button
  } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './style';
import Paginate from '../Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../../redux/reducers/actions/postsActions/searchPosts';
import{ getAllPosts } from '../../redux/reducers/actions/postsActions/getAllPosts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
      if(!search.trim().length && !tags.length){
        dispatch(getAllPosts(page));
        history.push('/posts');
      }
    },[search,tags]);
    const searchPost = () => {
      if(search.trim().length > 0 || tags.length > 0){
        dispatch(searchPosts({search, Tags: tags.join(',')}));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
      }else{
        history.push('/');
      }
    }

    const onKeyDown = e => {
      if(e.keyCode === 13) {
        searchPost();
      }
    }

    const onDelete = (tagToDelete) => {
      setTags([...tags.filter(tag => tag !== tagToDelete)]);
    }

    const onAdd = (tag) => {
      setTags([...tags, tag]);
    }

    return(
        <Grow in>
        <Container maxWidth='xl'>
          <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'
              >
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search Memories'
                  onKeyDown={onKeyDown}
                  fullWidth
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{margin: '10px 0'}} 
                  name='searchtag'
                  value={tags}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  label='Search Tags'
                  variant='outlined'
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color='primary'
                  variant='contained'
                >Search</Button>
              </AppBar>
              <Form currentId ={currentId} setCurrentId={setCurrentId} />
              {
                (!searchQuery && !tags.length) && (
                <Paper elevation={6} className={classes.pagination}>
                  <Paginate page={page} />
                </Paper>
                )
              }
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;