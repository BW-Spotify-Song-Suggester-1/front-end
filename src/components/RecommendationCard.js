import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    padding: 2%;
    margin: 5%;
    background: green;
    `

export default function RecommendationCard(rec) {
    return (
        <StyledCardDiv>
            <h2>{rec.obj.name}</h2>
            <div>
                <img src={rec.obj.image} alt={rec.obj.name} />
            </div>
        </StyledCardDiv>
    )
}