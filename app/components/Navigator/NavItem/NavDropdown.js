/**
*
* NavDropdown
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { dataChecking } from 'globalUtils';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import './NavDropdown.scss';
import NavItem from './../NavItem/index';

const DropdownContainer = styled(DropdownContent)`
    position: absolute;
    background: ${(props) => props.theme.secondary_bg};
    width: 500px;
    height: 300px;
    right: 16px;
`;

function NavLi(params) {
    return (
        <li className="dropdown__link">
            <NavLink to={dataChecking(params, 'data', 'url')} className="dropdown__link__anchor" title={dataChecking(params, 'data', 'text')}>
                {dataChecking(params, 'data', 'text')}
            </NavLink>
        </li>
    );
}

function Section(params) {
    if (params.data.type === 'list') {
        const list = params.data.items.map((item) => (
            <NavLi data={item} key={item.code} className={params.itemClassName}></NavLi>
        ));
        return (
            <ul className={`dropdown__quick-links dropdown__segment text-left unstyled ${params.itemClassName}`}>
                {list}
            </ul>
        );
    } else if (params.data.type === 'title') {
        return (
            <h5 className={params.itemClassName}>{params.data.text}</h5>
        );
    } else if (params.data.type === 'search') {
        return (
            <span>TODO: search_component</span>
        );
    } else if (params.data.type === 'cart') {
        return (
            <span>TODO: cart_component</span>
        );
    }

    return <NavItem data={params.data} itemClassName={params.dropdownClass} clickHandler={params.clickHandler}></NavItem>;
}

function NavDropdown(props) {
    const sections = props.item.items.map((item) => (
        <Section
            data={item}
            key={item.code}
            itemClassName={props.itemClassName}
            dropdownClass={(props.data && props.data.dropdownClass) || ''}
            clickHandler={props.clickHandler}
        ></Section>
    ));

    if (props.vertical) {
        return (
            <div className="vertical-dropdown-section">
                <div className={`section-title ${props.itemClassName}`}>
                    <span className={`${(props.data.iconClass ? props.data.iconClass : 'dropdown__name')} pt-1 color-transparent`} title={props.data.title}></span>
                    <span>{ props.vertical ? props.data.verticalText : props.data.text}</span>
                </div>
                <div className="section-content pl-2" style={{ backgroundColor: 'RGBA(105, 0, 51, 0.1)' }}>
                    {sections}
                </div>
            </div>
        );
    }

    return (
        <Dropdown className="NavDropdown-component nav-link text-capitalize dropdown">
            <DropdownTrigger>
                {props.children}
            </DropdownTrigger>
            <DropdownContainer>
                {sections}
            </DropdownContainer>
        </Dropdown>
    );
}

NavDropdown.propTypes = {
    item: PropTypes.object,
    children: PropTypes.object,
};

export default NavDropdown;
