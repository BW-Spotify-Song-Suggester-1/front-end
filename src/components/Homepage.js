import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h2`
    color: white
`

const StyledP = styled.p`
    color: white
`

const Homepage = () => {
    const handleRedirect = e => {
        e.preventDefault();
    }
    return (
        <div className="homeContainer">
            <section className="imageHeader"></section>
            <section className="content">
                <div className="contentInfo">
                <StyledHeader>New music, just for you.</StyledHeader>
                <StyledP>Millions of songs, waiting to be discovered.</StyledP>
                </div>
            </section>
            <section className="actionCall">
                <button onClick={handleRedirect}>Sign up Now</button>
            </section>
        </div>
    )
}

export default Homepage;