import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import '../App.css';

//Redux Imports
import { connect } from 'react-redux';
import { login } from '../actions';

const LoginForm = ({ values, touched, errors}) => {
    const [user, setUser] = useState({
                username: '',
                password: ''
            })
            
    return (
        <LoginDiv>
            <StyledHeader>Login to your account</StyledHeader>
            <StyledP>Enter your info:</StyledP>
            <Form className="loginForm">
                
                    {touched.username && errors.username && (<p className="error">{errors.username}</p>)}
                    {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                

                <Field type="text" name="username" placeholder="enter username" />
                <Field type="password" name="password" id="password" />

                <StyledButton type="submit">Login</StyledButton>
            </Form>
            <br></br><br></br>
            <StyledP>Don't have an account? <a className="loginLink" href="/signup"> Click here to register</a>!</StyledP>
        </LoginDiv>
    );
  };

//styling for page
const LoginDiv = styled.div`
  margin: 0 auto;
`

const StyledHeader = styled.h2`
  color: green;
`
const StyledP = styled.p`
  color: green;
`
const StyledButton = styled.button`
    background-color: green;
    color: white;
    border: none;
    font-size: 1.1rem;
    margin: 2% auto;
    width: 40%;
    padding: 2%;
    border-radius: 10px;
    cursor: pointer;

    :hover {
        background-color: black;
    }
`

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, password }){
        return {
            username: username || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required('Username field is required.'),

        password: Yup.string()
            .required('Password field is required.')

    }),

    handleSubmit(values, {resetForm, props, ...rest}){
        props.login(values, props.props.history)
    }
  })(LoginForm);

const mapStateToProps = state => ({
    loggingIn: state.loggingIn
})

const Connect = connect(mapStateToProps, { login })(FormikLoginForm);

export default Connect