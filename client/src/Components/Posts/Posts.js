import React from 'react';
import Post from './Post/Post';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({setCurrentId}) => {

    const { posts, isLoading } = useSelector(state =>state.postsReducer);
    const classes = useStyles();

    return(
        isLoading ? <CircularProgress style={{margin:'50% 50%'}} /> : (
            <Grid 
            className={classes.mainContainer} 
            container
            alignItems='stretch'
            spacing={3}
            >
                {posts.map(post => (
                    <Grid
                    item
                    key={post._id}
                    xs={12}
                    sm={6}
                    >
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}


export default Posts;