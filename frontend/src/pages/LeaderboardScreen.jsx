import React, { useState } from 'react';
import { Card, Table, Form, Row, Col, Badge, Button } from 'react-bootstrap';

const LeaderboardScreen = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [region, setRegion] = useState('global');
  
  const leaderboardData = [
    { rank: 1, name: 'ChessMaster5000', score: 2845, winRate: 92, region: 'EU', trend: 'up' },
    { rank: 2, name: 'StrategicMind', score: 2788, winRate: 88, region: 'NA', trend: 'same' },
    { rank: 3, name: 'GrandTactician', score: 2756, winRate: 85, region: 'ASIA', trend: 'up' },
    { rank: 4, name: 'KingSlayer007', score: 2701, winRate: 83, region: 'EU', trend: 'down' },
    { rank: 5, name: 'QueensGambit', score: 2698, winRate: 84, region: 'NA', trend: 'up' },
    { rank: 6, name: 'TacticalGenius', score: 2655, winRate: 79, region: 'NA', trend: 'down' },
    { rank: 7, name: 'MindMaster', score: 2621, winRate: 77, region: 'ASIA', trend: 'same' },
    { rank: 8, name: 'GameWizard', score: 2598, winRate: 75, region: 'EU', trend: 'up' },
    { rank: 9, name: 'StrategistPro', score: 2587, winRate: 73, region: 'NA', trend: 'down' },
    { rank: 10, name: 'ThoughtLeader', score: 2554, winRate: 71, region: 'ASIA', trend: 'same' },
  ];
  
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <span className="text-success">↑</span>;
      case 'down': return <span className="text-danger">↓</span>;
      default: return <span className="text-secondary">→</span>;
    }
  };
  
  return (
    <>
      <h1>Leaderboard</h1>
      
      <Row className="mb-4">
        <Col md={6} lg={4}>
          <Form.Group>
            <Form.Label>Time Frame</Form.Label>
            <Form.Select 
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="allTime">All Time</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={6} lg={4}>
          <Form.Group>
            <Form.Label>Region</Form.Label>
            <Form.Select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="global">Global</option>
              <option value="eu">Europe</option>
              <option value="na">North America</option>
              <option value="asia">Asia</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Card.Title>Top Players</Card.Title>
            <div>
              <Badge bg="info" className="me-2">Your Rank: #42</Badge>
              <Button variant="outline-primary" size="sm">View Your Stats</Button>
            </div>
          </div>
          
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Win Rate</th>
                <th>Region</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player) => (
                <tr key={player.rank}>
                  <td>
                    {player.rank <= 3 ? (
                      <span className="fw-bold">
                        {player.rank === 1 ? '🥇 ' : player.rank === 2 ? '🥈 ' : '🥉 '}
                        {player.rank}
                      </span>
                    ) : player.rank}
                  </td>
                  <td>{player.name}</td>
                  <td className="fw-bold">{player.score}</td>
                  <td>{player.winRate}%</td>
                  <td>
                    <Badge bg={
                      player.region === 'EU' ? 'primary' :
                      player.region === 'NA' ? 'success' : 'warning'
                    }>
                      {player.region}
                    </Badge>
                  </td>
                  <td>{getTrendIcon(player.trend)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className="d-flex justify-content-center mt-3">
            <Button variant="outline-secondary" size="sm" className="me-2">&laquo; Previous</Button>
            <Button variant="outline-primary" size="sm">Next &raquo;</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default LeaderboardScreen;