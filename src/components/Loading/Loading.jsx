import React from 'react';
import styles from './loading.css';

const Loading = () => {
  return (
    <div id={styles.loadingPH}>
      <div className={styles.loadingPH}>
        <div className={styles.loadPHHolder}>
          <div className={styles.loadPHolderInner}>
            <div className={styles.loadPHolderBody}>
              <div className={styles.loadingPHHdr} />
              <div className={styles.loadingPHLabel} />
              <div className={styles.loadingPHContent1} />
              <div className={styles.loadingPHContent2} />
              <div className={styles.loadingPHContent3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
