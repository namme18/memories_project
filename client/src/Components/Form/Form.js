import React, { useState, useEffect } from 'react';
import useStyles from './style';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../redux/reducers/actions/postsActions/createNewPost';
import { updatePost } from '../../redux/reducers/actions/postsActions/updatePost';

const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.postsReducer);
  const { user } = useSelector(state => state.authReducer);
  const post = currentId ? posts.find(p => p._id === currentId): null;

  const [data, setData] = useState({
    name: user?.name,
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if(post) return setData(post);
  }, [post])

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    const newData = data;

    if(currentId){
      dispatch(updatePost({currentId, newData}))
    }else{
      dispatch(createNewPost(newData));
    }

    clear();
    
  };

  const clear = () => {
      setCurrentId(null);
      setData({
        title: '',
        message: '',
        tags: '',
        selectedFile: null,
      });
  }

  if(!user){
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like other's memories!
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        className={`${classes.form} ${classes.root}`}
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } a Memory</Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={data.title}
          onChange={onChange}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={data.message}
          onChange={onChange}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={data.tags}
          onChange={e => setData({...data, tags: e.target.value.split(',')})}
        />

        <div className={classes.fileInput}>
            <FileBase 
                type='file'
                multiple={false}
                onDone = {(res) => setData({
                    ...data,
                    selectedFile: res.base64
                })}
            />
        </div>

        <Button 
        className={classes.buttonSubmit}
        type='submit'
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        >
            Submit
        </Button>

        <Button
        variant='contained'
        color='secondary'
        size='small'
        onClick={clear}
        fullWidth
        >
            Clear
        </Button>

      </form>
    </Paper>
  );
};

export default Form;
