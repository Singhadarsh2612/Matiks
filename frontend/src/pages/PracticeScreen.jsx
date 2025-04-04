import React, { useState } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';

const PracticeScreen = () => {
  const [difficulty, setDifficulty] = useState('medium');
  
  return (
    <>
      <h1>Practice Mode</h1>
      <Row className="mb-4">
        <Col>
          <p className="lead">
            Improve your skills by playing against AI opponents with varying difficulty levels.
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Practice Settings</Card.Title>
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Select 
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="expert">Expert</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Game Mode</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Standard"
                      name="gameMode"
                      id="standard"
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      label="Speed Mode"
                      name="gameMode"
                      id="speed"
                    />
                    <Form.Check
                      type="radio"
                      label="Practice Specific Skills"
                      name="gameMode"
                      id="skills"
                    />
                  </div>
                </Form.Group>
              </Form>
              <div className="d-grid">
                <Button variant="primary" size="lg">
                  Start Practice Session
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>AI Opponent Levels</Card.Title>
              <Card.Text>
                <Row className="mt-3">
                  <Col sm={3} className="text-center mb-3">
                    <div className="border rounded p-3 h-100">
                      <h5>Easy</h5>
                      <div className="text-success fs-1">👶</div>
                      <p className="small">Perfect for beginners learning the basics</p>
                    </div>
                  </Col>
                  <Col sm={3} className="text-center mb-3">
                    <div className="border rounded p-3 h-100">
                      <h5>Medium</h5>
                      <div className="text-primary fs-1">🧑</div>
                      <p className="small">Casual players will find a good challenge</p>
                    </div>
                  </Col>
                  <Col sm={3} className="text-center mb-3">
                    <div className="border rounded p-3 h-100">
                      <h5>Hard</h5>
                      <div className="text-warning fs-1">🧠</div>
                      <p className="small">Advanced techniques and strategies</p>
                    </div>
                  </Col>
                  <Col sm={3} className="text-center mb-3">
                    <div className="border rounded p-3 h-100">
                      <h5>Expert</h5>
                      <div className="text-danger fs-1">🤖</div>
                      <p className="small">Comparable to top-ranked human players</p>
                    </div>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Practice Stats</Card.Title>
              <div className="d-flex justify-content-between mt-3">
                <div className="text-center">
                  <h3>18</h3>
                  <p className="text-muted">Total Practice Games</p>
                </div>
                <div className="text-center">
                  <h3>75%</h3>
                  <p className="text-muted">Win Rate vs AI</p>
                </div>
                <div className="text-center">
                  <h3>5.2</h3>
                  <p className="text-muted">Avg. Score</p>
                </div>
                <div className="text-center">
                  <h3>12:45</h3>
                  <p className="text-muted">Avg. Game Duration</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PracticeScreen;