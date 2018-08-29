import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Item from './Item';

// describe what we are testing
describe('Item Component', () => {
  // Shallow render tests are useful to keep yourself constrained to testing the
  // component as a unit and avoid indirectly testing the behavior of child components
  const wrapper = shallow(
    <Item
      key="keys[i]"
      cname="cName"
      id="id"
      img="imgLink"
      character="character"
      link="link"
      media="mediaType"
      overview="overview"
      score="voteAvg"
      title="name"
    />
  );
  const Header = wrapper.find('h3');
  const Img = wrapper.find('img');

  it('should render required elements without throwing an error', () => {
    expect(Header.exists()).toBe(true);
    expect(Img.exists()).toBe(true);
  });

  it('image should render src, alt title', () => {
    expect(Img.prop('src')).toEqual('imgLink');
  });

  // it('should render the Item Component', () => {
  //   expect(wrapper.containsMatchingElement(<Item />)).toEqual(true);
  // });

  it('should render 5 divs', () => {
    expect(wrapper.find('div').length).toEqual(5);
  });
});
