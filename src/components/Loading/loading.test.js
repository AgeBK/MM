import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Loading from './Loading';

// describe what we are testing
describe('Loading Component', () => {
  // Shallow render tests are useful to keep yourself constrained to testing the
  // component as a unit and avoid indirectly testing the behavior of child components
  const wrapper = shallow(<Loading />);

  it('should render required elements without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 10 divs', () => {
    expect(wrapper.find('div').length).toEqual(10);
  });
});
