import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Item from '../Item';
// import ShowList from './ShowList/ShowList';
import {
  showListURL,
  fetchSingle,
  strConcat,
  showCatURL
} from '../../utils.js';
import Config from '../../config.json';

class ShowList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.location.state.searchTerm
      ? this.loadData(true, this.props.location.state.searchTerm)
      : this.loadData(false, this.props.location.state.catSearch);
  }

  loadData(isSearchTerm, val) {
    console.log('loadData');
    if (navigator.onLine) {
      if (isSearchTerm) {
        fetchSingle.call(this, showListURL(val)); // utils
      } else {
        fetchSingle.call(this, showCatURL(val)); // utils
      }
    } else {
      console.log('else');

      var hostJS = location.origin + Config.jsFolder; // offline
      fetchSingle.call(this, hostJS + Config.showList);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
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

  render() {
    return this.state.data.results ? (
      <ShowListItem {...this.state} title={this.props.location.state} />
    ) : null;
  }
}

const ShowListItem = props => {
  const { title } = props;

  console.log(props);
  var titles = props.data.results.map((title, i) => {
    const media = title.media_type === 'tv' ? 'tv' : 'movie';
    const name = title.name ? title.name : title.title;
    const id = title.id;
    const imgLink = navigator.onLine
      ? Config.imgResizeURL + title.poster_path
      : Config.pulpFictCover;
    const voteAvg = title.vote_average;
    const reRemSpacSpec = new RegExp(Config.reRemoveSpacesSpecials, 'g');
    const link = '/showlist/' + name.replace(reRemSpacSpec, '');
    const cName = (i + 1) % 2 === 0 ? 'even' : 'odd';
    const overview = strConcat(title.overview, 200);

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
    <section className="results showlist">
      <div className="row">
        <h1>
          {Config.showListHdr} "{title.searchTerm || title.catSearch}"
        </h1>
        {titles}
      </div>
    </section>
  );
};

export default ShowList;
