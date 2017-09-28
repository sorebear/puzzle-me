import React, {Component} from 'react';
import PageTitle from './page_title';
import './login_style.css';
import axios from 'axios';

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
        // FB.getLoginStatus(function(response) {
        //     statusChangeCallback(response);
        // });
        var auth = false;
        FB.login(function(response){
            console.log('We got a response from FB.login and it is: ', response);
            if(response.status === 'connected'){
                console.log("We are connected");
                axios.post('/login', {response}).then(function(response){
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
                <PageTitle backgroundImg="forestvalley" color="white" text="LOGIN" subText="enter your credentials below"/>
                <div className="container mt-5 text-center">
                    <h1>Login with Facebook</h1>
                    <button className="loginBtn loginBtn--facebook" onClick={this.facebookLogin}>Login with Facebook</button>
                </div>
            </div>
        );
    }
}
export default Login;