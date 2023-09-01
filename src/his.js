import React from 'react';

const History = ({ history, onHistoryClick }) => {
  return (
    <div className="history">
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <button key={index} onClick={() => onHistoryClick(item)}>
            {item}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default History;
