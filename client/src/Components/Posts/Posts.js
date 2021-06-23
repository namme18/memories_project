import React from 'react';
import Post from './Post/Post';
import useStyles from './style';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const Posts = ({setCurrentId}) => {

    const { posts, isLoading } = useSelector(state =>state.postsReducer);
    const classes = useStyles();

    if(!isLoading && posts.length === 0){
        return (
            <Typography variant='h2' align='center'>
                No posts found!
            </Typography>
        )
    }
    return(
        isLoading ? <CircularProgress/> : (
            <Grid 
            className={classes.mainContainer} 
            container
            alignItems='stretch'
            spacing={3}
            >
                {posts?.map(post => (
                    <Grid
                    item
                    key={post._id}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={3}
                    >
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}


export default Posts;