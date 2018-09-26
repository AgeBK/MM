// @flow
import React from 'react';
import ChangeCase from 'change-case';
import Config from '../../config.json';
import { uniqueId } from '../../utils.js';
import styles from './showfacts.css';

type State = {
  data: Array<any>
};

type Props = {
  cast: Array<any>,
  crew: Array<any>,
  mediaType: string,
  id: number,
  location: {
    state: {
      mediaType: string,
      id: number
    }
  }
};

const ShowFacts = props => {
  const arrProps = Object.keys(props);
  const ids = uniqueId(arrProps.length);
  const reURL = new RegExp(Config.reUrl, 'g');
  console.log(reURL);

  return arrProps.map((val, i) => {
    const isURL = reURL.test(props[val]);
    return (
      <div key={ids[i]}>
        {val && (
          <div>
            <span className="label">{ChangeCase.sentenceCase(val)}:</span>
            {isURL ? (
              <a
                className={styles.info}
                href={props[val]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props[val]}
              </a>
            ) : (
              <span className={styles.info}>{props[val]}</span>
            )}
          </div>
        )}
      </div>
    );
  });
};

export default ShowFacts;
