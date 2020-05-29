import React from 'react';
import LoginForm from './LoginForm';
import styled from 'styled-components';

const Login = props => {
    return(
        <StyledDiv>
        
            <LoginForm props={props} />
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    border-top: 4px solid green;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: .5%;
    margin-top: 4.80%;
`

export default Login;