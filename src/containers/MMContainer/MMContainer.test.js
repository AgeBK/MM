import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import MMContainer from './MMContainer';

// describe what we are testing
describe('MMContainer Component', () => {
  // Shallow render tests are useful to keep yourself constrained to testing the
  // component as a unit and avoid indirectly testing the behavior of child components
  const wrapper = shallow(<MMContainer />);
  const Header = wrapper.find('h1');
  const Intro = wrapper.find('p');

  it('should render required elements without throwing an error', () => {
    expect(Header.exists()).toBe(true);
    expect(Intro.exists()).toBe(true);
  });

  // it('should render the MMContainer Component', () => {
  //   expect(wrapper.containsMatchingElement(<MMContainer />)).toEqual(true);
  // });

  it('should render 3 divs', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });
});
