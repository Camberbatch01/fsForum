import React from 'react';
import axios from 'axios';

class CreateUser extends React.Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            username: '',
            password: ''
        }
        this.changeDetails = this.changeDetails.bind(this);
    }
    changeDetails = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState({[key]: value});
    }
    createNew = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/create', {
            displayName: this.state.displayName,
            username: this.state.username,
            password: this.state.password
        }).then(res => console.log(res.data));
    }
    render(){
        return (
            <div>
                <form className='signIn'>
                    <h1>Enter your details</h1>
                    <div className="loginContainer">
                        <input type="text" name="displayName" className="local display" placeholder="display name..." onChange={this.changeDetails}/>
                        <input type="text" name="username" className="local username" placeholder="username..." onChange={this.changeDetails}/>
                        <input type="password" name="password" className="local password" placeholder="password..." onChange={this.changeDetails}/>
                        <button id="btnSubmit" onClick={this.createNew}>Create</button>
                        <a id="createNew" href="/">Already have an account?</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateUser;