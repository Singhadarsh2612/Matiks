import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import axios from 'axios';

const LeaderboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/users/leaderboard');
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <h1>Leaderboard</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Card.Title>Top Players</Card.Title>
            <div>
              {leaderboard.map((p, i) => p.name === userInfo?.name && (
                <Badge key={p._id} bg="info" className="me-2">
                  Your Rank: #{i + 1}
                </Badge>
              ))}
            </div>
          </div>

          {loading ? (
            <div>Loading leaderboard...</div>
          ) : error ? (
            <div className="text-danger">Error: {error}</div>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Wins</th>
                  <th>Win Rate</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr key={player._id}>
                    <td>
                      {index + 1 <= 3 ? (
                        <span className="fw-bold">
                          {index + 1 === 1 ? '🥇 ' : index + 1 === 2 ? '🥈 ' : '🥉 '}
                          {index + 1}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td>{player.name}</td>
                    <td>{player.wins}</td>
                    <td>{player.winRate}%</td>
                    <td>{player.rating}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

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
