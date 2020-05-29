import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecommendationCard from './RecommendationCard';
import { trackRecs } from '../actions';


const TracksList = props => {
    const [recs, setRecs] = useState([]);
    const [query, setQuery] = useState("");
    // console.log("props", props);

    return (
        <div className="rec-list">
           <h3>Here's your recommendations:</h3>
           {props.tracks.map(obj => {
               return <RecommendationCard obj={obj.track.name} key={obj.track.id} />;
           })}
        </div>
    );
}

export default TracksList;