import React, {Component} from 'react';
import PageTitle from './page_title';
import './login_style.css';
import Axios from 'axios';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            error: false
        };
        this.facebookLogin = this.facebookLogin.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.HOME_ADDRESS = "/home";
    }
    handleInput(event) {
        this.setState({
            username : event.target.value,
            error: false
        })
    }
    facebookLogin(event){
        const user_name = this.state.username
        event.preventDefault();
        if (this.state.username.length === 0) {
            this.setState({
                error: true 
            })
            return
        }
        // FB.getLoginStatus(function(response) {
        //     statusChangeCallback(response);
        // });
        var auth = false;
        FB.login(function(response){
            console.log('We got a response from FB.login and it is: ', response);
            if(response.status === 'connected'){
                console.log("We are connected");
                console.log(this);
                response.username = user_name;
                console.log(response);
                Axios.post('/login', {
                    response: response,
                }).then(function(response){
                    // console.log("The Complete Response", JSON.parse(response.config) );
                    const receivedData = JSON.parse(response.config.data)
                    console.log("Received Data: ", receivedData);
                    const token = receivedData.response.authResponse.accessToken;
                    console.log("User Access Token: ", token)
                    
                    // window.location = this.HOME_ADDRESS;
                });
            }
            else{
                console.log("Failed to log in via Facebook");
            }
        }, {scope: 'user_friends,public_profile,email'});
    }
    render(){
        const { error } = this.state
        return (
            <div>
                <PageTitle backgroundImg="forestvalley" color="white" text="LOGIN" subText="enter your credentials below"/>
                <div className="container mt-5 text-center">
                    <form onSubmit={(e) => this.facebookLogin(e)} className={`form-group ${error ? 'has-danger' : ''}`}>
                        <h3 className="my-3">Enter A Username</h3>
                        <input onChange={(e) => this.handleInput(e)} className={`form-control ${error ? 'form-control-danger' : ''}`} type="text" value={this.state.username} placeholder="Username..."/>
                        <small className={`form-control-feedback text-left ${error ? '' : 'd-none'}`}>Please enter a username</small>
                        <h3 className="my-3">Then</h3>
                        <button className="loginBtn loginBtn--facebook" onClick={(e) => this.facebookLogin(e)}>Login with Facebook</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;