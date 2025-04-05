import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameHistory } from '../slices/gameHistorySlice';
import { Card, Table, Badge, Button } from 'react-bootstrap';

const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.gameHistory);
  const { userInfo } = useSelector((state) => state.auth);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      dispatch(fetchGameHistory());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!loading && history.length > 0 && userInfo) {
      const userStats = {};

      history.forEach((game) => {
        const opponent = game.opponent || 'Unknown';
        const result = game.result;

        // Opponent stats
        if (!userStats[opponent]) {
          userStats[opponent] = { name: opponent, played: 0, wins: 0, losses: 0 };
        }
        userStats[opponent].played++;
        if (result === 'Loss') userStats[opponent].wins++;
        else if (result === 'Win') userStats[opponent].losses++;

        // Current user stats
        const currentUser = userInfo.name || 'You';
        if (!userStats[currentUser]) {
          userStats[currentUser] = { name: currentUser, played: 0, wins: 0, losses: 0 };
        }
        userStats[currentUser].played++;
        if (result === 'Win') userStats[currentUser].wins++;
        else if (result === 'Loss') userStats[currentUser].losses++;
      });

      const sorted = Object.values(userStats)
        .map((player) => {
          const rating = 0 + (player.wins * 30) - (player.losses * 10) + (player.played * 2);
          const winRate = player.played === 0 ? 0 : Math.round((player.wins / player.played) * 100);
          return { ...player, rating, winRate };
        })
        .sort((a, b) => b.rating - a.rating);

      setLeaderboard(sorted);
    }
  }, [history, loading, userInfo]);

  return (
    <>
      <h1>Leaderboard</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Card.Title>Top Players</Card.Title>
            <div>
              {leaderboard.map((p, i) => p.name === userInfo.name && (
                <Badge key={p.name} bg="info" className="me-2">
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
                  <tr key={player.name}>
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
