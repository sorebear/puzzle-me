import React, {Component} from 'react';
import PageTitle from './page_title';

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
                <PageTitle backgroundImg="forestvalley" color="white" text="LOGIN" subText="enter your credentials below"/>
                <div className="container">
                    <form className="m-5">
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
                </div>
            </div>
        );
    }
}
export default Login;