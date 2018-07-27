// @flow
import * as React from 'react'; // You need to use import * as React from 'react' here instead of import React from 'react' to get access to the React.Node type.
import Config from '../config.json';

type Props = {
  children?: React.Node // children should be declared as a nullable type.
};

const MainOuter = (props: Props) => {
  return (
    <div className="results home">
      <div className="row">
        <a className="homeLink" href="/">
          <div className="col-12 intro bgMain">
            <h1>{Config.siteTitle}</h1>
            <p>{Config.siteIntro}</p>
          </div>
        </a>
        <hr />
        {props.children}
      </div>
    </div>
  );
};

export default MainOuter;
