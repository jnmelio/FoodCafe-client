import React from 'react'
import GoogleLogin from 'react-google-login';

function GoogleButton(props) {
    const {onSuccess, onFailure} = props
   
    return (
        <div>
            <GoogleLogin
                clientId="539941157350-la09qnjcelcmisvdjra8kf98q2mqdec9.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleButton