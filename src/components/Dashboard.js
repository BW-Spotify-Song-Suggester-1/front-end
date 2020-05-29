import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import RecommendationList from './RecommendationList';
import { connect } from 'react-redux';
import { userRecs, trackRecs, clearRecs } from '../actions';

const Dashboard = props => {
    const [spotify_playlist, setTrack_Id] = useState();
    // const [show, setShow] = useState(3)

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

    console.log('Track', spotify_playlist)
    console.log('Halp?', props.recs)
    console.log('user id: ', localStorage.getItem('user_id'))
    return (
        <div className='dashboard-container'>
            <h1>Welcome to your Dashboard</h1>
            {/* <RecommendationList /> */}
            <section className='user-recs'>
                <h2>Your Recommendations</h2>
                <button onClick={handleClear}>Clear Recommendations</button>
                <div className='playlistRecsContainer'>
                    {props.recs.map((music, index) => {
                        return (
                            <div key={index} className='musicBox'>
                                <h3>{music.song}</h3>
                                <p>{music.artist}</p>
                                <p>{music.album}</p>
                                <div className='trackButtons'>
                                    <button onClick={() => window.open(`https://open.spotify.com/track/${music.track_id}`, "_blank")}>Play</button>
                                    {/* <button onClick={handleClear}>Delete</button> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section>
                <h2>Playlist Recommendations</h2>
                <p>Enter a playlist URL to get started:</p>
                <form className='playlistForm' onSubmit={link}>
                    <input placeholder='Playlist URL' onChange={handleChanges}/>
                    <button>Submit</button>
                </form>
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