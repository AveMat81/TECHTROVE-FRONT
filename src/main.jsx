import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import {Auth0Provider} from '@auth0/auth0-react';

//Descomentar la ruta a la API en la que se desea realizar la peticion y comentar el que no se utilizará
// ----------------------------------------------------

axios.defaults.baseURL = import.meta.env.VITE_URL_PRODUCTION;
// axios.defaults.baseURL = import.meta.env.VITE_URL_LOCAL;

// ----------------------------------------------------

// persistor.purge();

//matias
const domain = "dev-ftdh6r8izgfiol2k.us.auth0.com"
const clientId = "wnZ1dIV37DOWzcdFeSeTOGTm120oghuv"

//flor
// const domain = "dev-epkzfmjzmxk7h61a.us.auth0.com"
// const clientId = "vkjYbZITl7gqlIpj9FCHff7AYoaXdF6i"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      
        <Auth0Provider domain={domain} 
        clientId={clientId} 
        redirectUri={window.location.origin}>
          <BrowserRouter>
            <App /> <Toaster />
         </BrowserRouter>
        </Auth0Provider>
      
    {/* </PersistGate> */}
  </Provider>
);
