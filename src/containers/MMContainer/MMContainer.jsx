// @flow
import * as React from 'react'; // You need to use import * as React from 'react' here instead of import React from 'react' to get access to the React.Node type.
import Config from '../../config.json';
import styles from './MMContainer.css';

type Props = {
  children?: React.Node // children should be declared as a nullable type
};

const MMContainer = (props: Props) => (
  <div className="results mainOuter">
    <div className="row">
      <a className={styles.homeLink} href="/">
        <div className={`${[styles.intro, styles.bgMain].join(' ')} col-12`}>
          <h1>{Config.siteTitle}</h1>
          <p>{Config.siteIntro}</p>
        </div>
      </a>
      <hr />
      {props.children}
    </div>
  </div>
);

export default MMContainer;
