import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.checkLoginAndRedirect = this.checkLoginAndRedirect.bind(this);
    }
    checkLoginAndRedirect(){
        console.log('checkLoginAndRedirect called');
        this.props.router.push('/create');
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
                <div className="fb-login-button" data-width="200" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
                <div id="facebook_login_status"></div>
                <button type="button" onClick={this.checkLoginAndRedirect} >Create</button>
            </div>
        );
    }
}
export default withRouter(Login);