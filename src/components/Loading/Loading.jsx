// @flow
import React from 'react';
import styles from './loading.css';

const Loading = () => (
  <div id="loadingPH">
    <div>
      <div className={styles.loadingPHWrapper}>
        <div className={styles.loadingPHWrapperInner}>
          <div className={styles.loadingPHWrapperBody}>
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

export default Loading;
