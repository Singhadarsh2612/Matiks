import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import SideNavbar from './components/SideNavbar';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 992) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header />
      <SideNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ToastContainer />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Container className='my-4'>
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default App;