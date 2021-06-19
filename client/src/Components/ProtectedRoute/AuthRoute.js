import { Route, Redirect} from "react-router-dom";


const AuthRoute = ({component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render = {props => 
            localStorage.getItem('token') ? (
                <Redirect to='/' />
            ) : (
                <Component {...props} />
            )
        }
        />
    )
}

export default AuthRoute;