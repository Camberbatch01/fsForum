import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const auth = (ComponentPassed) => {
    return class extends React.Component {
        constructor(){
            super();
            this.state = {
                loading: true,
                redirect: false
            }
        }
        componentDidMount = () => {
            axios.get('http://localhost:3001/user/checkAuth', {withCredentials: true}).then(res => {
                if (res.status === 200){
                    this.setState({loading: false});
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
                console.error(err);
                this.setState({loading: false, redirect: true});
            });
        }
        render(){
            const {loading, redirect} = this.state;
            if (loading){
                return null;
            }
            if (redirect){
                return <Redirect to="/" />
            }
            return (
                <React.Fragment>
                    <ComponentPassed {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default auth;