import React from 'react'

function Login (props){
    const {onLogIn, onError} = props
return (
<form onSubmit={onLogIn}>
            <div className="form-group">
                <label htmlFor="InputEmail">Email address</label>
                <input type="email" className="form-control" id="InputEmail" name="email" />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password" className="form-control" id="InputPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {
                onError && (<p>{onError.error}</p>)
            }
        </form>
)
}

export default Login