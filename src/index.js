import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureAxios from './services/configureAxios'
import createStore from './redux/createStore'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Auth0Provider } from '@auth0/auth0-react';

const { store, persistor } = createStore()

configureAxios()

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
            <I18nextProvider i18n={ i18n }>
            <Auth0Provider
                    domain={window?.config?.REACT_APP_AUTH0_DOMAIN||""}
                    clientId={window?.config?.REACT_APP_AUTH0_CLIENT_ID||""}
                    authorizationParams={{
                        redirect_uri: window.location.origin,
                        audience:`${window?.config?.REACT_APP_AUTH0_AUDIENCE||""}`
                    }}
            >
                    <App />
            </Auth0Provider>
            </I18nextProvider>
        </PersistGate> 
    </Provider>,
  document.getElementById('root')
)
serviceWorker.register()
