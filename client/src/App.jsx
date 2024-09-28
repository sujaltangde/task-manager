import { lazy, Suspense, useCallback, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ScrollToTop } from './components/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { verify } from "./actions/userActions";
// import SuspenseLoader from "./components/SuspenseLoader";


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const App = () => {

  const dispatch = useDispatch()

  const verifyAuth = useCallback(() => {
    dispatch(verify());
  }, [dispatch]);


  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);


  return (
    <>


      <ScrollToTop />

      <Navbar />



      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/login" element={

            <Login />

          } />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="font-semibold"
      />


    </>




  );
}

export default App;