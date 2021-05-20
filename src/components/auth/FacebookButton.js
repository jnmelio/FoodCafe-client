import React from 'react'
import FacebookLogin from 'react-facebook-login';


function FacebookButton(props) {

    const {facebook} = props

    return (
        <div>
           <FacebookLogin
                appId="377377326935192"
                autoLoad={false}
                fields="name,email,picture"
                callback={facebook} 
            />
        </div>
    )
}

export default FacebookButton