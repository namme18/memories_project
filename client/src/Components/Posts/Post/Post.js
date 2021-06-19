import React from 'react';
import useStyles from './style';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../redux/reducers/actions/postsActions/deletePost';
import { likePost } from '../../../redux/reducers/actions/postsActions/likePost';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user } = useSelector(state => state.authReducer);

  const Likes = () => {
    if(post.likes.length > 0){
      return post.likes.find(id => id === (user?.id || user?.googleId)) ? (
        <>  <ThumbUpAltIcon fontSize='small' />&nbsp; {post.likes?.length > 2 ? `You and ${post.likes?.length - 1} Others`: `${post.likes?.length} Like${post.likes?.length > 1 ? 's' : ''}`} </>
      ) : (
        <>  <ThumbUpAltOutlined fontSize='small' /> &nbsp; {post.likes?.length} {post.likes?.length === 1 ? 'Like' : 'Likes'} </>
      )
    }
    return  <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like </>;
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />

      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>

        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

        {post?.creator === (user?.id || user?.googleId) && (
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>)}
      

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map(tag => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" componen='p' gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography color="textSecondary" variant="body2" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" disabled={!user} color="primary" onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
          {post?.creator === (user?.id || user?.googleId) && (
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
        &nbsp; Delete
          <DeleteIcon fontSize="small" />
        </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Post;
