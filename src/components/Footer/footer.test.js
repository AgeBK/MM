import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Footer from './Footer';

// describe what we are testing
describe('Footer Component', () => {
  // Shallow render tests are useful to keep yourself constrained to testing the
  // component as a unit and avoid indirectly testing the behavior of child components
  const wrapper = shallow(<Footer />);
  const anchor = wrapper.find('a');
  const img = wrapper.find('img');
  const links = wrapper.find('Link');
  console.log(wrapper.debug());

  it('should render without throwing an error', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render 4 links', () => {
    expect(links.length).toEqual(4);
  });

  it('should render 1 anchor', () => {
    expect(anchor.length).toEqual(1);
  });

  it('should render 1 image', () => {
    expect(img.length).toEqual(1);
  });
});
