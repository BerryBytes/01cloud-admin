// import React from 'react';
// import { Login } from './Login'
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import CompanyBanner from '../../components/companybanner/CompanyBanner'
// import { CssBaseline } from '@material-ui/core';
// import { Formik } from 'formik';

// configure({adapter: new Adapter()});

// describe('Login', () => {
//     let wrapper;
//     const mockLoginfn = jest.fn();
 
//     beforeEach(() => {
//         wrapper = shallow(<Login loginAction={(mockLoginfn)} resendVerification={(mockLoginfn)} classes={{}} t={() => ''}/>);
//     })

//     it('company banner render', () => {
//         expect(wrapper.find(CompanyBanner)).toHaveLength(1);
//     })
    
//     it('css base line render', () => {
//         expect(wrapper.find(CssBaseline)).toHaveLength(1);
//     })

//     it('login top message', () => {
//         expect(wrapper.find("#loginTopMsg")).toHaveLength(1);
//     })

//     it('logo img render', () => {
//         expect(wrapper.find("#imgLogo")).toHaveLength(1);
//     })

//     it('logo src', () => {
//         expect(wrapper.find(".authlogo").props()).toHaveProperty('src');
//     })  

//     it('logo src with valid value', () => {
//         expect(wrapper.find(".authlogo").props()).toHaveProperty('src', '/images/logos/logo-blue.svg');
//     })  

//     it('form render', () => {
//         expect(wrapper.find(Formik)).toHaveLength(1);
//     })
// })