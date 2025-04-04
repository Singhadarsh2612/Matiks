import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';

const FindMatchScreen = () => {
  const [matchType, setMatchType] = useState('casual');
  const [searching, setSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  
  const handleSearch = () => {
    setSearching(!searching);
    if (!searching) {
      setSearchTime(0);
      const timer = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  };

  return (
    <>
      <h1>Find a Match</h1>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="mb-4">Match Settings</Card.Title>
              
              <Form.Group className="mb-4">
                <Form.Label>Match Type</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Casual"
                    name="matchType"
                    id="casual"
                    checked={matchType === 'casual'}
                    onChange={() => setMatchType('casual')}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Ranked"
                    name="matchType"
                    id="ranked"
                    checked={matchType === 'ranked'}
                    onChange={() => setMatchType('ranked')}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Tournament"
                    name="matchType"
                    id="tournament"
                    checked={matchType === 'tournament'}
                    onChange={() => setMatchType('tournament')}
                  />
                </div>
              </Form.Group>
              
              {matchType === 'ranked' && (
                <div className="alert alert-info">
                  Your current rank: <Badge bg="warning">Gold III</Badge>
                  <br />
                  You'll be matched with players of similar skill.
                </div>
              )}
              
              {matchType === 'tournament' && (
                <div className="alert alert-warning">
                  Next tournament starts in: 2 hours 15 minutes
                  <br />
                  8 players already registered.
                </div>
              )}
              
              <div className="text-center mt-4">
                <Button 
                  variant={searching ? "danger" : "success"} 
                  size="lg" 
                  onClick={handleSearch}
                >
                  {searching ? `Cancel Search (${searchTime}s)` : "Find Match"}
                </Button>
                
                {searching && (
                  <div className="mt-3">
                    <div className="spinner-border text-primary mx-auto"></div>
                    <p className="mt-2">Searching for opponents...</p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FindMatchScreen;