import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameHistory } from '../slices/gameHistorySlice';

const GameHistory = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.gameHistory);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      console.log('Fetching game history for user:', userInfo._id);
      dispatch(fetchGameHistory())
        .unwrap()
        .then(data => console.log('Fetched history:', data))
        .catch(err => console.error('Fetch error:', err));
    }
  }, [dispatch, userInfo]);

  // Sort history by playedAt in descending order (newest first)
  const sortedHistory = [...history].sort((a, b) => {
    return new Date(b.playedAt) - new Date(a.playedAt);
  });

  console.log('Current history state:', { history, sortedHistory, loading, error });

  return (
    <div className="container mt-4" style={{ color: "white" }}>
      <h2>Your Game History</h2>

      {loading && <div className="alert alert-info">Loading game history...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && !error && history.length === 0 && (
        <div className="alert alert-warning">No game history available.</div>
      )}

      {!loading && !error && history.length > 0 && (
        <div className="table-responsive" style={{ color: "white" }}>
          <table className="table table-striped" style={{ color: "white" }}>
            <thead className="thead-dark" >
              <tr>
                <th>#</th>
                <th>Opponent</th>
                <th>Your Result</th>
                <th>Date Played</th>
              </tr>
            </thead>
            <tbody style={{ color: "white" }}>
              {sortedHistory.map((item, index) => (
                <tr key={item._id || index} style={{ color: "white" }}>
                  <td style={{ color: "white" }}>{index + 1}</td>
                  <td style={{ color: "white" }}>{item.opponent || 'Unknown'}</td>
                  <td>
                    <span className={`badge ${
                      item.result === 'Win' ? 'bg-success' : 
                      item.result === 'Loss' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                      {item.result || 'N/A'}
                    </span>
                  </td>
                  <td style={{ color: "white" }}>
                    {item.playedAt ? 
                      new Date(item.playedAt).toLocaleString() : 
                      'Date not available'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameHistory;