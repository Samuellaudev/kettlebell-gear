import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main
        className='flex min-h-screen flex-col 
        bg-white text-black'
      >
        <div className="mt-5 md:mt-0 container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
