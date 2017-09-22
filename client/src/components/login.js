import React, {Component} from 'react';
import './login_style.css';
import Axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.facebookLogin = this.facebookLogin.bind(this);
    }
    facebookLogin(){
        console.log("Facebooklogin called");
        var auth = false;
        FB.login(function(response){
            console.log('We got a response from FB.login and it is: ', response);
            if(response.status === 'connected'){
                console.log("We are connected");
                axios.post(SERVER_BASE_ADDRESS + '/login', {response}).then(function(response){
                    window.location = SERVER_BASE_ADDRESS;
                });

            }
            else{
                console.log("Failed to log in via Facebook");
            }
        }, {scope: 'user_friends,public_profile,email'});
    }
    render(){
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <button type="button" className="btn btn-default">Login</button>
                </form>
                <h1>Login with Facebook</h1>
                <button className="loginBtn loginBtn--facebook" onClick={this.facebookLogin}>Login with Facebook</button>
            </div>
        );
    }
}
export default Login;