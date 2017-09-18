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
        );
    }
}
export default Login;