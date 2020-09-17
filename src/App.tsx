import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Container } from "./components/Container";
import Login from "./components/Login";
import { getCurrentAuthUser } from "./services/auth";
import { userHasAuthenticated } from "./redux/actions";
import SuccessSnackbar from './components/Snackbar/SuccessSnackbar';
import LinearProgress from "@material-ui/core/LinearProgress";
import { BrowserRouter as Router } from "react-router-dom";

interface AppProps {
    isAuthenticated: boolean,
    updateAuth: Function,
    isLoading: boolean,
}

interface AppState { }

const checkUserAuth = (props: AppProps) => {
    getCurrentAuthUser().then(user => {
        if (user !== 'not authenticated') {
            props.updateAuth();
        }
    });
}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
      super(props);
      checkUserAuth(this.props);
  }

  render () {
    const {
        isAuthenticated,
        isLoading,
    } = this.props;

    return (
        <div>
            { isLoading ? <LinearProgress className="progress"/> : null }
            { !isAuthenticated && <Login/> }
            { isAuthenticated && <div className="container"><Router><Container /></Router></div> }
            <SuccessSnackbar />
        </div>
    )
  }
}


const mapStateToProps = (state: any) => {
    return ({
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.ui.isLoading,
    });
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateAuth: () => dispatch(userHasAuthenticated(true))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);


