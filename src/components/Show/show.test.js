import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Show from './Show';
import showData from './showData.json';

// render in Info.jsx expects props.location.state (mock object)
// console.log(Config.showData);
const props = {
  location: {
    state: {
      mediaType: 'movie'
    }
  }
};

// describe what we are testing
describe('Show Component', () => {
  // Shallow render tests are useful to keep yourself constrained to testing the
  // component as a unit and avoid indirectly testing the behavior of child components.
  const wrapper = shallow(<Show {...props} />);
  wrapper.setState({ data: showData });
  const test = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render required elements without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // it('should render 10 divs', () => {
  //   expect(wrapper.find('div').length).toEqual(10);
  // });
});
