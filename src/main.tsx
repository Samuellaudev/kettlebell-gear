import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import App from './App'
import HomeScreen from './screens/Shopping/HomeScreen';
import ProductScreen from './screens/Shopping/ProductScreen';
import CartScreen from './screens/Shopping/CartScreen';
import ShopScreen from './screens/Shopping/ShopScreen';

import LoginScreen from './screens/Authentication/LoginScreen';
import RegisterScreen from './screens/Authentication/RegisterScreen';
import ProfileScreen from './screens/Authentication/ProfileScreen';

import ShippingScreen from './screens/Order/ShippingScreen';
import PaymentScreen from './screens/Order/PaymentScreen';
import PlaceOrderScreen from './screens/Order/PlaceOrderScreen';
import OrderScreen from './screens/Order/OrderScreen';

import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import './assets/styles/index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path="/search/:keyword" element={ <HomeScreen /> } />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path='/product/:id' element={ <ProductScreen /> } />
      <Route path='/cart' element={ <CartScreen /> } />
      <Route path='/shop' element={ <ShopScreen /> } />
      <Route path='/shop/page/:pageNumber' element={ <ShopScreen /> } />
      <Route path='/login' element={ <LoginScreen /> } />
      <Route path='/register' element={ <RegisterScreen /> } />;
      {/* Registered users */ }
      <Route path='' element={ <PrivateRoute /> }>
        <Route path='/shipping' element={ <ShippingScreen /> } />
        <Route path='/payment' element={ <PaymentScreen /> } /> 
        <Route path='/placeorder' element={ <PlaceOrderScreen /> } />
        <Route path='/order/:id' element={ <OrderScreen /> } />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>;
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={ <OrderListScreen /> } />
        <Route path='/admin/productlist' element={ <ProductListScreen /> } />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={ <ProductEditScreen /> } />
        <Route path='/admin/userlist' element={ <UserListScreen /> } />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>;
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={ store }>
        <PayPalScriptProvider deferLoading={ true } options={{ clientId: "type-checking" }} >
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
