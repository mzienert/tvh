import React from 'react';
import { LoginCard } from './Login';
import { NewPassword } from "./NewPassword";
import { connect } from "react-redux";
import './login.css';
import {
    setLoading as _setLoading,
    showSnackbar as _showSnackbar, userHasAuthenticated
} from "../../redux/actions";


interface LoginProps {
    setLoading: Function,
    displayToast: Function,
    updateAuth: Function,
}

interface LoginState {
    cognitoUser: any;
}

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            cognitoUser: null,
        };

        this.updateCogntioUser = this.updateCogntioUser.bind(this);
    }

    updateCogntioUser(cogntioUser: any) {
        this.setState({
            ...this.state,
            cognitoUser: cogntioUser
        });
    }

    render() {
        return (
            <div>
                { this.state.cognitoUser === null
                    ? <LoginCard {...this.props} onCognitoUser={this.updateCogntioUser}/>
                    : <NewPassword {...this.props} cognitoUser={this.state.cognitoUser}/> }
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch: any) => ({
    setLoading: () => dispatch(_setLoading()),
    displayToast: (message: string, type: string) => dispatch(_showSnackbar(message, type)),
    updateAuth: () => dispatch(userHasAuthenticated(true)),
});

export default connect(
    null,
    mapDispatchToProps
)(Login);


