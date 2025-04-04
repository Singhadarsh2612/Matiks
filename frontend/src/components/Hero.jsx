import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth); // Get logged-in user

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library.
          </p>
          <div className='d-flex'>
            {!userInfo ? (
              <>
                <Button variant='primary' href='/login' className='me-3'>
                  Sign In
                </Button>
                <Button variant='secondary' href='/register'>
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant='success'
                  className='me-3'
                  onClick={() => navigate('/game-lobby')}
                >
                  Go to Game Lobby
                </Button>
                <Button
                  variant='info'
                  onClick={() => navigate('/game-history')} // Navigate to history page
                >
                  View Game History
                </Button>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
