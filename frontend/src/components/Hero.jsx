import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../pages/DashboardScreen';
const Hero = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth); // Get logged-in user

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>HectoClash</h1>
          <p className='text-justified mb-4'>
          Hectoc is a Mental Calculation game, developed by Yusnier Viera in the 2010s. Each question is a sequence of 6 digits, each 1–9.

For example: 249384

In hectoc, the aim is to use these numbers in order to find the number 100. Here are two solutions to this example:

2 × (49 + 3 – 8/4) = 100
(2 × 4 – 9 + 3)^(8/4) = 100
The operations allowed when solving hectocs are:

putting adjacent numbers together, like 4 and 9 to make 49
addition, subtraction, multiplication and division
adding negative symbols
powers (like the ‘^’ in the second example above)
brackets to manage the correct order of operations
It is not allowed to rearrange numbers or use other symbols like square roots. You must use all the numbers.
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
                {/* <Button
                  variant='success'
                  className='me-3'
                  onClick={() => navigate('/game-lobby')}
                >
                  Go to Game Lobby
                </Button> */}
                
                {/* <Button
                  variant='info'
                  onClick={() => navigate('/game-history')} // Navigate to history page
                >
                  View Game History
                </Button> */}
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
