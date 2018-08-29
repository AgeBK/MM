import React from 'react';
// Need to include Router or get this error: Invariant Violation: You should not use <Link> outside a <Router>
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import ShowSimilar from './ShowSimilar';

const props = {
  mediaType: 'string',
  // pass proper data in to pass data.length check or component won't mount
  results: [
    {
      backdrop_path: '/7OhIhrUqHXzpbyR24bxoKrx5Lwu.jpg',
      first_air_date: '2014-09-12',
      genre_ids: [10759, 18, 10765],
      id: 61345,
      original_language: 'en',
      original_name: 'Z Nation',
      overview: 'overview',
      origin_country: ['US'],
      poster_path: '/geFT40zG22OCJSj7WkkCi71xWES.jpg',
      popularity: 24.367288,
      name: 'Z Nation',
      vote_average: 6.4,
      vote_count: 204
    }
  ]
};

describe('ShowSimilar Component', () => {
  const wrapper = mount(
    <Router>
      <ShowSimilar {...props} />
    </Router>
  );

  console.log(wrapper.debug());

  it('should render required elements without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 8 divs', () => {
    expect(wrapper.find('div').length).toEqual(8);
  });
});
