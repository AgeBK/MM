import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // enzyme rendering
import Home from './Home';

// render in Home.jsx expects props.location.state (mock object)
const props = {
  location: {
    state: {}
  }
};

describe('Home Component', () => {
  const wrapper = shallow(<Home {...props} />);
  const divs = wrapper.find('div');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 2 divs', () => {
    expect(divs.length).toEqual(2);
  });
});
