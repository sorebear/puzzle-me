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
            <form>
                <label>Username</label>
                <input type="text" placeholder="username or email"/>
                <label>Password</label>
                <input type="text" placeholder="password"/>
            </form>
        );
    }
}
export default Login;