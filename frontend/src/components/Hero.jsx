import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Orbitron:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className='py-5 hero-bg'
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <div className="animated-bg" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%232e5cb8\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        animation: 'animatedBackground 50s linear infinite',
      }}></div>

      <Container className='d-flex justify-content-center' style={{ position: 'relative', zIndex: 2 }}>
        <Card
          className='p-5 d-flex flex-column align-items-center hero-card w-75'
          style={{
            backgroundColor: 'rgba(13, 17, 38, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(66, 99, 235, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(10, 10, 120, 0.3), 0 0 0 2px rgba(66, 99, 235, 0.1), inset 0 0 32px rgba(66, 99, 235, 0.05)',
            color: '#fff',
            maxWidth: '800px',
            transition: 'all 0.3s ease',
          }}
        >
          <div className="logo-container mb-4" style={{
            position: 'relative',
            display: 'inline-block',
          }}>
            <h1 
              className='text-center' 
              style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                fontWeight: '700',
                fontSize: '3.5rem',
                background: 'linear-gradient(45deg, #4263eb, #00dffc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 15px rgba(66, 99, 235, 0.5)',
                letterSpacing: '2px',
                position: 'relative',
                padding: '0 20px',
              }}
            >
              HectoClash
            </h1>
            <div className="subtitle" style={{
              fontSize: '1rem',
              textAlign: 'center',
              color: '#8da9ff',
              marginTop: '-5px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}>
              MENTAL MATH CHALLENGE
            </div>
          </div>
          
          <div className="game-info p-4 mb-4" style={{
            background: 'rgba(25, 32, 62, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(66, 99, 235, 0.2)',
            width: '100%',
          }}>
            <p className='mb-4' style={{ lineHeight: '1.8', color: '#e0e6ff' }}>
              <strong style={{ color: '#00dffc' }}>Hectoc</strong> is a Mental Calculation game, developed by Yusnier Viera in the 2010s.
              Each question is a sequence of 6 digits, each 1–9.
            </p>
            
            <div className="example-box p-3 mb-4" style={{
              background: 'rgba(66, 99, 235, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid #4263eb',
            }}>
              <h3 style={{ fontSize: '1.2rem', color: '#00dffc' }}>Example:</h3>
              <div className="digits-display my-2" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              }}>
                {[2,4,9,3,8,4].map((digit, index) => (
                  <div key={index} style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #293462 0%, #1e2c54 100%)',
                    borderRadius: '8px',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}>
                    {digit}
                  </div>
                ))}
              </div>
              
              <p className="mt-3" style={{ color: '#e0e6ff' }}>
                The goal is to use these numbers in order to find <span style={{ color: '#00dffc', fontWeight: 'bold' }}>100</span>. Here are two solutions:
              </p>
              <div className="solutions p-2" style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#fff' }}>
                2 × (49 + 3 – 8/4) = 100<br />
                (2 × 4 – 9 + 3)<sup>(8/4)</sup> = 100
              </div>
            </div>
            
            <div className="rules-container" style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <div className="rules-box p-3" style={{
                flex: '1',
                minWidth: '200px',
                background: 'rgba(0, 223, 252, 0.1)',
                borderRadius: '8px',
                borderLeft: '4px solid #00dffc',
              }}>
                <h3 style={{ fontSize: '1.1rem', color: '#00dffc' }}>Allowed:</h3>
                <ul style={{ listStyleType: 'none', padding: '0', color: '#e0e6ff' }}>
                  <li>✓ Joining adjacent digits</li>
                  <li>✓ Operations: + − × ÷</li>
                  <li>✓ Powers (^)</li>
                  <li>✓ Negative numbers</li>
                  <li>✓ Brackets</li>
                </ul>
              </div>
              
              <div className="rules-box p-3" style={{
                flex: '1',
                minWidth: '200px',
                background: 'rgba(255, 74, 85, 0.1)',
                borderRadius: '8px',
                borderLeft: '4px solid #ff4a55',
              }}>
                <h3 style={{ fontSize: '1.1rem', color: '#ff4a55' }}>Not allowed:</h3>
                <ul style={{ listStyleType: 'none', padding: '0', color: '#e0e6ff' }}>
                  <li>✗ Reordering digits</li>
                  <li>✗ Square roots</li>
                  <li>✗ Skipping digits</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className='d-flex mt-2'>
            {!userInfo ? (
              <>
                <Button 
                  variant='primary' 
                  href='/login' 
                  className='me-3'
                  style={{
                    background: 'linear-gradient(45deg, #4263eb, #3b56d9)',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '30px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    boxShadow: '0 4px 15px rgba(66, 99, 235, 0.4)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant='secondary' 
                  href='/register'
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    padding: '12px 28px',
                    borderRadius: '30px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                  }}
                >
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
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes animatedBackground {
          from { background-position: 0 0; }
          to { background-position: 100% 100%; }
        }
        
        .hero-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(10, 10, 120, 0.4), 0 0 0 3px rgba(66, 99, 235, 0.15), inset 0 0 32px rgba(66, 99, 235, 0.08);
        }
        
        button:hover {
          transform: translateY(-2px);
          filter: brightness(110%);
        }
      `}</style>
    </div>
  );
};

export default Hero;