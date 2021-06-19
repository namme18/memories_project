export const tokenConfig = getState => {

    //headers
    const { token } = getState().authReducer;
    
    //config
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    //id token add to headers
    if(token){
    config.headers['authorization'] = `Bearer ${token}`;
    }

    return config;

}