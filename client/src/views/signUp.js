import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJediOrder } from '@fortawesome/free-brands-svg-icons';

library.add(faJediOrder);

class CreateUser extends React.Component {
    render(){
        return (
            <div className="App">
                <FontAwesomeIcon className="authTitle" icon={faJediOrder} />
                <form className='signIn' action="http://localhost:3001/auth/create" method="POST">
                    <p id="info">To register, fill in all fields and hit create!</p>
                    <div className="loginContainer">
                        <input type="text" name="displayName" className="local display" placeholder="Display Name" required/>
                        <input type="text" name="username" className="local username" placeholder="Username" required/>
                        <input type="password" name="password" className="local password" placeholder="Password" required/>
                        <button id="btnSubmit" type="submit">Register</button>
                        <a id="createNew" href="/">Already have an account?</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateUser;