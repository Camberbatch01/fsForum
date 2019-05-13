import React from 'react';

class CreateUser extends React.Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            username: '',
            password: ''
        }
    }
    render(){
        return (
            <div>
                <form className='signIn'>
                    <h1>Enter your details</h1>
                    <div className="loginContainer">
                        <input type="text" className="local display" placeholder="display name..."/>
                        <input type="text" className="local username" placeholder="username..."/>
                        <input type="password" className="local password" placeholder="password..."/>
                        <button id="btnSubmit">Create</button>
                        <a id="createNew" href="/">Already have an account?</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateUser;