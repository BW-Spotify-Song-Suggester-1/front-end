import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RecommendationCard from './RecommendationCard';


const RecommendationList = props => {
    const [recs, setRecs] = useState([]);
    const [query, setQuery] = useState("");
    // console.log("props", props);

    useEffect(() => {
            axios
            .get('https://rickandmortyapi.com/api/character/')
            .then(response => {
                console.log("response", response);
                const recs = response.data.results.filter(obj =>
                    obj.name.toLowerCase().includes(query.toLowerCase())
                );
                setRecs(recs);
            })
            .catch(error => {
                console.error('Server Error', error);
            });
        }, [query]);

    return (
        <div className="rec-list">
           <h3>Here's your recommendations:</h3>
           {recs.map(obj => {
               return <RecommendationCard obj={obj} key={obj.id} />;
           })}
        </div>
    );
}

export default RecommendationList;