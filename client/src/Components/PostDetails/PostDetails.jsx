import React, { useEffect } from 'react';
import useStyles from './style';
import {
    Paper,
    Typography,
    CircularProgress,
    Divider,
    Grid
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { searchPosts } from '../../redux/reducers/actions/postsActions/searchPosts';
import { getOnePost } from '../../redux/reducers/actions/postsActions/getOnePost';

const PostDetails = () => { 
    const classes = useStyles();
    const { post, posts, isLoading } = useSelector(state => state.postsReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const recommendedPosts = posts?.filter(p => p._id !== id);
    useEffect(() => {
        if(posts){
            dispatch(getOnePost(id));
        }
    },[id]);

    useEffect(() => {
        if(post){
            dispatch(searchPosts({search:'none', Tags: post.tags.join(',')}));
        }
    },[post]);

    if(!post || isLoading){
        return (
            <CircularProgress  className={classes.loadingPaper} size='7em' />
        )
    }

    const openPost = (id) => history.push(`/posts/${id}`);

    return (
        <Paper style={{padding:'20px', borderRadius: '15px'}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography 
                    variant='h3' 
                    component='h2'
                    >{post.title}</Typography>

                    <Typography
                        gutterBottom
                        variant='h6'
                        colot='textSecondary'
                        component='h2'
                    >{post.tags.map(tag => `#${tag}`)}</Typography>

                    <Typography
                        gutterBottom
                        variant='body1'
                        component='p'
                    >{post.message}</Typography>

                    <Typography
                        variant='h6'
                    >Created by: {post.name}</Typography>

                    <Typography
                        variant='body1'
                    >{moment(post.createdAt).fromNow()}</Typography>

                    <Divider style={{margin:'20px 0'}}/>

                    <Typography
                        variant='body1'
                    ><strong>Realtime chat - coming soon!</strong></Typography>

                    <Divider style={{margin:'20px 0'}}/>

                    <Typography 
                        variant='body1'
                    ><strong>Comments - coming soon!</strong></Typography>

                    <Divider style={{margin:'20px 0'}}/>
                </div>
                   <div className={classes.imageSection}>
                       <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                   </div>
            </div>
            {recommendedPosts && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You might also like:</Typography>
                    <Divider/>
                    <Grid container spacing={3}>
                    {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                        <Grid item style={{margin: '20px 0', cursor: 'pointer'}} key={_id} onClick={() => openPost(_id)} xs={12} sm={12} md={4} lg={3} alignItems='center'>
                            <Typography gutterbottom variant='h6'>{title}</Typography>
                            <Typography gutterbottom variant='subtitle2'>{name}</Typography>
                            <Typography gutterbottom variant='subtitle2'>{message}</Typography>
                            <Typography gutterbottom variant='subtitle1'>Likes: {likes.length}</Typography>
                            <img src={selectedFile} alt={name} />
                        </Grid>
                    ))}
                    </Grid>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails;