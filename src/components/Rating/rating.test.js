import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Rating from './rating';

// describe what we are testing
describe('Rating Component', () => {
  // make our assertion and what we expect to happen
  const wrapper = shallow(<Rating score={7.2} />);
  const rating = wrapper.find('text');
  const title = wrapper.find('.rating');
  const svg = wrapper.find('svg');

  it('should render without throwing an error', () => {
    expect(rating.exists()).toBe(true);
    expect(svg.exists()).toBe(true);
    expect(title.exists()).toBe(true);
  });

  it('renders correct data', () => {
    expect(rating.text()).toEqual('72%');
  });
});
