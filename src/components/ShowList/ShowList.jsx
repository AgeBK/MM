import React, { Component } from 'react';
import Item from '../Item/Item';
import {
  showListURL,
  fetchSingle,
  concatStr,
  showCatURL
} from '../../utils.js';
import Config from '../../config.json';
import styles from './showList.css';

class ShowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    if (this.props.location.state.searchTerm) {
      this.loadData(true, this.props.location.state.searchTerm);
    } else {
      this.loadData(false, this.props.location.state.catSearch);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.state.searchTerm &&
      nextProps.location.state.searchTerm !==
        this.props.location.state.searchTerm
    ) {
      this.loadData(true, nextProps.location.state.searchTerm);
    } else if (
      nextProps.location.state.catSearch &&
      nextProps.location.state.catSearch !== this.props.location.state.catSearch
    ) {
      this.loadData(false, nextProps.location.state.catSearch);
    }
  }

  loadData(isSearchTerm, val) {
    if (navigator.onLine) {
      if (isSearchTerm) {
        fetchSingle.call(this, showListURL(val)); // utils
      } else {
        fetchSingle.call(this, showCatURL(val)); // utils
      }
    } else {
      const hostJS = `${(window.location.origin, Config.jsFolder)}`; // offline
      fetchSingle.call(this, hostJS + Config.showList);
    }
  }

  render() {
    return this.state.data.results ? (
      <ShowListItem {...this.state} catTitle={this.props.location.state} />
    ) : null;
  }
}

const ShowListItem = props => {
  const { catTitle } = props;
  const titles = props.data.results.map((title, i) => {
    const media = title.media_type === 'tv' ? 'tv' : 'movie';
    const name = title.name ? title.name : title.title;
    const id = title.id;
    const imgLink = navigator.onLine
      ? Config.imgResizeURL + title.poster_path
      : Config.pulpFictCover;
    const voteAvg = title.vote_average;
    const reRemSpacSpec = new RegExp(Config.reRemoveSpacesSpecials, 'g');
    const link = `/showlist/${name.replace(reRemSpacSpec, '')}`;
    const cName = (i + 1) % 2 === 0 ? 'even' : 'odd';
    const overview = concatStr(title.overview, 200);

    return (
      <Item
        key={id}
        cname={cName}
        id={id}
        img={imgLink}
        link={link}
        media={media}
        overview={overview}
        score={voteAvg}
        title={name}
      />
    );
  });

  return (
    <section className="results">
      <div className="row">
        <h1 className={styles.showListHdr}>
          {Config.showListHdr} {'"'}
          {catTitle.searchTerm || catTitle.catSearch}
          {'"'}
        </h1>
        <div className="row">{titles}</div>
      </div>
    </section>
  );
};

export default ShowList;
