import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, InputGroup, ListGroup, Badge } from 'react-bootstrap';

const PlayWithFriendScreen = () => {
  const [gameCode, setGameCode] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  
  const friends = [
    { id: 1, name: 'JohnDoe123', status: 'online', rank: 'Platinum' },
    { id: 2, name: 'GamerGirl42', status: 'online', rank: 'Diamond' },
    { id: 3, name: 'ChessMaster99', status: 'away', rank: 'Gold' },
    { id: 4, name: 'StrategistPro', status: 'offline', rank: 'Silver' },
    { id: 5, name: 'KingSlayer007', status: 'offline', rank: 'Master' }
  ];
  
  return (
    <>
      <h1>Play With Friend</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Create a Private Game</Card.Title>
              <Card.Text className="mt-3">
                Create a private match and share the code with your friend to join.
              </Card.Text>
              
              <Row className="mt-4">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Game Type</Form.Label>
                    <Form.Select defaultValue="standard">
                      <option value="standard">Standard Match</option>
                      <option value="timed">Timed Match (5 min)</option>
                      <option value="blitz">Blitz (2 min)</option>
                      <option value="custom">Custom Rules</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="d-grid mt-4">
                <Button variant="primary" size="lg">
                  Create Private Game
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Join a Private Game</Card.Title>
              <Card.Text className="mt-3">
                Enter the game code shared by your friend to join their game.
              </Card.Text>
              
              <InputGroup className="mt-4 mb-4">
                <Form.Control
                  placeholder="Enter game code"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value)}
                />
                <Button variant="outline-primary">
                  Join Game
                </Button>
              </InputGroup>
              
              {gameCode && (
                <div className="alert alert-info">
                  Connecting to game...
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Friends List</Card.Title>
              <Card.Text className="small text-muted mb-3">
                Select a friend to invite them directly to a game.
              </Card.Text>
              
              <ListGroup>
                {friends.map(friend => (
                  <ListGroup.Item 
                    key={friend.id}
                    action
                    active={selectedFriend === friend.id}
                    onClick={() => setSelectedFriend(friend.id)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span className="me-2">
                        <span className={`status-dot ${friend.status}`}></span>
                      </span>
                      {friend.name}
                    </div>
                    <div>
                      <Badge bg={
                        friend.rank === 'Diamond' || friend.rank === 'Master' ? 'primary' :
                        friend.rank === 'Platinum' ? 'info' :
                        friend.rank === 'Gold' ? 'warning' : 'secondary'
                      }>
                        {friend.rank}
                      </Badge>
                      {' '}
                      <Button 
                        size="sm" 
                        variant="outline-success"
                        disabled={friend.status === 'offline'}
                      >
                        Invite
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <style jsx="true">{`
        .status-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .status-dot.online {
          background-color: #28a745;
        }
        .status-dot.away {
          background-color: #ffc107;
        }
        .status-dot.offline {
          background-color: #dc3545;
        }
      `}</style>
    </>
  );
};

export default PlayWithFriendScreen;