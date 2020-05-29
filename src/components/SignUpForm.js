import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import styled from 'styled-components';

const SignupText = styled.h3`
    color: green;
`
const StyledButton = styled.button`
    background-color: green;
    color: white;
    border: none;
    font-size: 1.1rem;
    margin: 1% auto;
    width: 40%;
    padding: .5%;
    border-radius: 10px;
    cursor: pointer;

    :hover {
        background-color: black;
    }
`

const SignUpForm = props => {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    })

    const handleChange = e => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.signUp(newUser, props.history)
    }

    return (
        <div className='signupContainer'>
            <SignupText>Create an Account</SignupText>
            <form className='signupForm' onSubmit={handleSubmit}>
                <input
                required 
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={handleChange}
                value={newUser.firstName}
                />
                <input
                required 
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={handleChange}
                value={newUser.lastName}
                />
                <input 
                required
                type='text'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                value={newUser.username}
                />
                <input 
                required
                type='text'
                name='email'
                placeholder='Email'
                onChange={handleChange}
                value={newUser.email}
                />
                <input 
                required
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                value={newUser.password}
                />
                <StyledButton>Sign Up</StyledButton>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, {signUp})(SignUpForm);