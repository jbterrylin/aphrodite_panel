import React from 'react';
import { shallow } from 'enzyme';

import { navItems } from 'containers/Topbar';
import NavItem from '../index';

describe('<NavItem />', () => {
    const wrapper = shallow(<NavItem data={navItems[0]} handleLinkClick={jest.fn} />);

    it('should render NavItem Correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
