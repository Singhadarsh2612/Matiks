import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className='py-5 hero-bg'
      style={{
      
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container className='d-flex justify-content-center'>
        <Card
          className='p-5 d-flex flex-column align-items-center hero-card w-75'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // Faded background only inside the card
            border: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          <h1 className='text-center mb-4' style={{ fontWeight: '600' }}>HectoClash</h1>
          <p className='text-justified mb-4' style={{ lineHeight: '1.8' }}>
            <strong>Hectoc</strong> is a Mental Calculation game, developed by Yusnier Viera in the 2010s.
            Each question is a sequence of 6 digits, each 1–9.
            <br /><br />
            <strong>Example:</strong> 249384<br /><br />
            The goal is to use these numbers in order to find the number <strong>100</strong>. Here are two solutions:
            <br />
            2 × (49 + 3 – 8/4) = 100<br />
            (2 × 4 – 9 + 3)<sup>(8/4)</sup> = 100
            <br /><br />
            <strong>Allowed:</strong> joining adjacent digits, + − × ÷, powers (^), negatives, brackets.
            <br />
            <strong>Not allowed:</strong> reordering, square roots, or skipping digits.
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
                {/* Buttons for logged-in users can go here */}
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
