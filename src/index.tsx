import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import 'fontsource-roboto'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import store from "./redux/store";
import App from './App'

import Amplify from "aws-amplify"
import awsExports from "./aws-exports"
Amplify.configure(awsExports)

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

const renderApp = () =>
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <App />
            </ThemeProvider>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp)
}

renderApp()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
