import React, {Component} from 'react';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    render(){
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <label>Username</label>
                    <input type="text" placeholder="username or email"/>
                    <label>Password</label>
                    <input type="text" placeholder="password"/>
                    <button type="button">Login</button>
                </form>
            </div>
        );
    }
}
export default Login;