import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import RecommendationList from './RecommendationList';
import { connect } from 'react-redux';
import { userRecs, trackRecs, clearRecs, SAVED_TRACKS } from '../actions';
import TracksList from './TracksList'


const Dashboard = props => {
    const [spotify_playlist, setTrack_Id] = useState();
    // const [show, setShow] = useState(3)

    const [saved_tracks, setSavedTracks] = useState([]);



    const handleChanges = e => {
        setTrack_Id({
            spotify_playlist: e.target.value
        })
    }
    useEffect(() => {
        props.userRecs();
    }, [])

    // const handleShowMore = e => {
    //     e.preventDefault();
    //     setShow({
    //         ...show, show: show >= props.similarRecs.length ? show : show + 3
    //     })
    // }

    // const items = props.similarRecs.slice(0, show).map((item) => {
    //     return (
    //         <div key={item.track_id} className='musicBox'>
    //                                     <h3>{item.track}</h3>
    //                                     <p>{item.artist}</p>
    //                                     <div className='trackButtons'>
    //                                         <button onClick={()=> window.open(`https://open.spotify.com/track/${item.track_id}`, "_blank")}>Play</button>
    //                                     </div>
    //                                 </div>
    //     )
    // })
    const link = e => {
        props.trackRecs(spotify_playlist);
        setTrack_Id()
    }

    const handleClear = e => {
        e.preventDefault()
        props.clearRecs()
    }

    const spotifyconnect = e => {
        axiosWithAuth()
            .get('/api/spotify/connect')
            .then(res => {
                console.log('Success: ', res.data)
                localStorage.setItem('token', res.data.token);
                axiosWithAuth()
                    .get('/api/spotify/saved')
                    .then(res => {
                        setSavedTracks(res.data.items)
                        // dispatch({ type: SAVED_TRACKS, payload: res.data.items });
                    })                
            })
    }


    console.log('Track', spotify_playlist)
    console.log('Halp?', props.recs)
    console.log('user id: ', localStorage.getItem('user_id'))
    return (
        <div className='dashboard-container'>
            <h1>Welcome to your Dashboard</h1>
            <button onClick={spotifyconnect}>test</button>
            
            {/* <RecommendationList /> */}
            <section className='user-recs'>
                <h2>Your Recommendations</h2>
                <TracksList tracks={saved_tracks}/>
                <button onClick={handleClear}>Clear Recommendations</button>
            </section>
        </div>
    )
}

const mapStateToProps = state => ({
    user_id: state.user_id,
    recs: state.recs,
    similarRecs: state.similarRecs,
})

export default connect(mapStateToProps, { userRecs, trackRecs, clearRecs })(Dashboard);