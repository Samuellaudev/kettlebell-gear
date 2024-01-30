import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <main
        className='flex min-h-screen flex-col 
        bg-white text-black'
      >
        <div className="mt-5 md:mt-0 container mx-auto">
          Kettlebell
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;