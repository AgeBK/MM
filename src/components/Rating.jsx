//@flow

import React from 'react';

type Props = {
  score: number
};

const Rating = (props: Props) => {
  const { score } = props;
  var avgScore = Math.round(score * 10);
  var avgScoreColour =
    avgScore > 70 ? 'green' : avgScore > 49 ? 'yellow' : 'red';
  var dashArr = avgScore + ', 100';

  return (
    <div className="single-chart">
      <svg viewBox="0 0 36 36" className={avgScoreColour}>
        {' '}
        `
        <path
          className="circle-bg"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={dashArr}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage">
          {avgScore}%
        </text>
      </svg>
      <div className="rate">User Rating</div>
    </div>
  );
};

export default Rating;
