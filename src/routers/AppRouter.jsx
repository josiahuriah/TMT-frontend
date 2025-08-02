import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer.jsx';
import NotFoundPage from '../components/NotFoundPage';
import App from '../App.jsx';
import ErrorBoundary from '../components/ErrorBoundary';
import { 
  AdminPage, 
  Contact, 
  AboutUs, 
  RentalPage,
  LazyWrapper 
} from '../components/LazyComponents';

const AppRouter = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Header />
      <div id='body'>
        <Routes>
          <Route path='/' element={<App />} />
          <Route 
            path='/rental' 
            element={
              <LazyWrapper>
                <RentalPage />
              </LazyWrapper>
            } 
          />
          <Route 
            path='/about-us' 
            element={
              <LazyWrapper>
                <AboutUs />
              </LazyWrapper>
            } 
          />
          <Route 
            path='/contact' 
            element={
              <LazyWrapper>
                <Contact />
              </LazyWrapper>
            } 
          />
          <Route 
            path='/admin/*' 
            element={
              <LazyWrapper>
                <AdminPage />
              </LazyWrapper>
            } 
          />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </ErrorBoundary>
  </BrowserRouter>
);

export default AppRouter;