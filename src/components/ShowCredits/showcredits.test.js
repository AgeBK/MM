import React from 'react';
// Need to include Router or get this error: Invariant Violation: You should not use <Link> outside a <Router>
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme'; // enzyme rendering
import ShowCredits from './ShowCredits';

// pass proper data in to pass data.length check or component won't mount
const props = {
  cast: [
    {
      character: 'Michonne',
      credit_id: '5256cb3b19c2956ff605e2c4',
      gender: 1,
      id: 82104,
      name: 'Danai Gurira',
      order: 3,
      profile_path: '/xgo39kFf6rAynb1i9J1BeLfSXxg.jpg'
    }
  ]
};

describe('ShowCredits Component', () => {
  const wrapper = mount(
    <Router>
      <ShowCredits {...props} />
    </Router>
  );

  it('should render required elements without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 6 divs', () => {
    expect(wrapper.find('div').length).toEqual(6);
  });
});
