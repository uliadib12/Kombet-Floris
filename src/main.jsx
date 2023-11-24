import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import ErrorPage from "./error-page";
import store from './store.jsx'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import './firebase-init.jsx';

import Home from './routes/Home';
import Auth from './routes/Auth';
import Kategori from './routes/Kategori';
import { App } from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home title="Home"/>,
      },
      {
        path: "/papan-bunga",
        element: <Kategori title="Papan Bunga"/>
      },
      {
        path: "/bouquet",
        element: <Kategori title="Bouquet"/>
      },
      {
        path: "/money-cake",
        element: <Kategori title="Money Cake"/>
      },
      {
        path: "/snack-tower",
        element: <Kategori title="Snack Tower"/>
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth/>,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </React.StrictMode>,
)
