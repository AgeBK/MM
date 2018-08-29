import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme'; // enzyme rendering
import Header from './header';
import { Provider } from 'react-redux';
import store from '../../js/store/index';

const mockSearch = jest.fn();

const props = {
  history: {
    push: mockSearch
  }
};

// describe what we are testing
describe('Header Component', () => {
  // make our assertion of what we expect to happen

  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <Header {...props} />
      </Router>
    </Provider>
  );

  const input = wrapper.find('.mr-sm-2');
  const button = wrapper.find('#searchBtn');
  const navDropDown = wrapper.find('#navbarDropdown');
  const ddMenu = wrapper.find('.dropdown-menu');
  const ddMenuLinks = ddMenu.find('a');

  // it and test are the same thing
  it('should render without throwing an error', () => {
    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(navDropDown.exists()).toBe(true);
    expect(ddMenu.exists()).toBe(true);
    expect(ddMenuLinks.length).toEqual(5);
  });

  test('allow user to perform search using button', () => {
    input.simulate('change', { target: { value: 'fight club' } });
    button.simulate('click');
    expect(mockSearch).toHaveBeenCalled();
  });

  test('allow user to perform search using enter key', () => {
    input.simulate('change', { target: { value: 'fight club' } });
    input.simulate('keypress', { key: 'Enter' });
    expect(mockSearch).toHaveBeenCalled();
  });

  // TODO: not working, maybe because of delay in jquery applying class
  // it('check class show is applied to drop menu on click', () => {
  //   navDropDown.simulate('click');
  //   expect(navDropDown.prop('aria-expanded')).toEqual('true');
  // });
});
