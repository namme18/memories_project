import React, { useState, useEffect } from 'react';
import  { 
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container
} from '@material-ui/core';
import useStyles from './style';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Input from './Input';
import GoodleLogin from 'react-google-login';
import Icon from './icon';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from '../../redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';
import { signupUser } from '../../redux/reducers/actions/authActions/signupUser';
import { login } from '../../redux/reducers/actions/authActions/login';

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { isAuthenticated } = useSelector(state => state.authReducer)
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        isSignup: false,
        showPassword: false
    });

    const onSubmit = e=> {
        e.preventDefault();

        if(data.isSignup){
            const newUser = {
                name: `${data.firstname} ${data.lastname}`,
                email: data.email,
                password: data.password
            }
            dispatch(signupUser(newUser));
        }else{
            const user = {
                email: data.email,
                password: data.password
            }
            dispatch(login(user));
        }
    }

    const switchMode = () => {
        setData({
            ...data,
            isSignup: !data.isSignup,
            showPassword: false
        })
    }

    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const showPassword = () => {
        setData({
            ...data,
            showPassword: !data.showPassword
        })
    }

    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        dispatch(loadUser({result,token}));
    }

    const googleFailure = () => {
        console.log('Goodle Sign In was unsuccessful. Try Again Later')
    }

    useEffect(() => {
        if(isAuthenticated) return history.push('/');
    },[history, isAuthenticated]);

    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography cariant='h5'>
                    {data.isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form noValidate autoComplete='off' onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        {
                            data.isSignup && (
                                <>
                                <Input 
                                    name='firstname'
                                    label='First Name'
                                    placeholder='Enter First Name'
                                    onChange={onChange}
                                    autoFocus
                                    half
                                />

                                <Input 
                                    name='lastname'
                                    label='Last Name'
                                    placeholder='Enter First Name'
                                    onChange={onChange}
                                    half
                                />

                                </>
                            )}
                                <Input 
                                name='email' 
                                label='Enter 
                                Email Address' 
                                onChange={onChange}
                                type='email'
                                /> 

                                <Input 
                                name='password'
                                label='Enter Password'
                                onChange={onChange}
                                type={data.showPassword ? 'text' : 'password'}
                                showPassword={showPassword}
                                />

                                {data.isSignup && 
                                <Input  
                                    name='confirmPassword'
                                    label='Repeat Password'
                                    onChange={onChange}
                                    type='password'
                                />}
                    </Grid>
                                <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                                className={classes.submit}
                                >
                                    {data.isSignup ? 'Sign Up' : 'Sign In'}
                                </Button>

                                <GoodleLogin 
                                    clientId='451619886553-qr937d4o3sg56dtu1doq6prdnk1tou5e.apps.googleusercontent.com'
                                    render={props => (
                                        <Button 
                                            className={classes.googleButton}
                                            color='primary'
                                            fullWidth
                                            onClick={props.onClick}
                                            disabled={props.disabled}
                                            startIcon={<Icon />}
                                            variant='contained'
                                        >
                                            Google Sign In
                                        </Button>
                                    )}
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    cookiePolicy='single_host_origin'
                                />

                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <Button onClick={switchMode}>
                                            {data.isSignup ? 'Already have an account? Sign In' : "Don't have an account Sign Up"}
                                        </Button>
                                    </Grid>
                                </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;