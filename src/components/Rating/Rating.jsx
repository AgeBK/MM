// @flow
import React from 'react';
import styles from './rating.css';

type Props = {
  score: number,
  oddOrEven?: boolean,
  homePage?: boolean
};

const Rating = (props: Props) => {
  const { score, oddOrEven, homePage } = props;
  const isOddOrEven = oddOrEven ? styles.even : styles.odd;
  const avgScore = Math.round(score * 10);
  const avgScoreColour =
    avgScore > 70 ? styles.green : avgScore > 49 ? styles.yellow : styles.red;
  const dashArr = `${avgScore}, 100`;
  const isHomePage = homePage ? styles.homePage : '';

  return (
    <div
      className={`${styles.singleChart} ${isOddOrEven} ${
        oddOrEven ? 'even' : 'odd'
      }`}
    >
      <svg viewBox="0 0 36 36" className={avgScoreColour}>
        <path
          className={styles.circleBg}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={styles.circle}
          strokeDasharray={dashArr}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text
          x="18"
          y="20.35"
          className={`${styles.percentage} ${isOddOrEven} ${isHomePage}`}
        >
          {avgScore}%
        </text>
      </svg>
      <div className={`${styles.rate} rating`}>User Rating</div>
    </div>
  );
};

export default Rating;
