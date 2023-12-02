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
import ProdukKategori from './routes/ProdukKategori.jsx';
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
        element: <ProdukKategori title="Papan Bunga" path='papan-bunga'/>
      },
      {
        path: "/bouquet",
        element: <ProdukKategori title="Bouquet" path='bouquet'/>
      },
      {
        path: "/money-cake",
        element: <ProdukKategori title="Money Cake" path='money-cake'/>
      },
      {
        path: "/snack-tower",
        element: <ProdukKategori title="Snack Tower" path='snack-tower'/>
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
