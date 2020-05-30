import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { push } from "connected-react-router";
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = (credentials, history) => dispatch => {
    dispatch({ type: LOGIN_START });
    
    axiosWithAuth()
    .post('/auth/login', credentials)
            .then(res => {
                setTimeout(() => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', res.data.data.username)
                    dispatch({ type: LOGIN_SUCCESS, payload: localStorage.getItem('username')});
                    history.push('/dashboard');
                    console.log('Data: ', res);
                }, 1000)
            })
            .catch(err => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                dispatch({ type: LOGIN_ERROR })
                console.log('Problem Logging in: ', err)
            });
}

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SAVED_TRACKS = "SAVED_TRACKS"

export const signUp = (credentials, history) => dispatch => {
    dispatch({ type: SIGNUP_START });
    
    axiosWithAuth()
    .post('/auth/register', credentials)
    .then(res => {
        console.log('Successful Register: ', res);
        dispatch({ type: SIGNUP_SUCCESS });
        history.push('/login');
    })
    .catch(err => {
        dispatch({ type: SIGNUP_ERROR });
        console.log('Error Registering User: ', err);
    })
}

export const FETCH_RECS = 'FETCH_RECS';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const userRecs = () => dispatch => {
    dispatch({ type: FETCH_RECS });
    const user_id = localStorage.getItem('user_id')
    axiosWithAuth()
        .get(`https://spotify-api-prod.herokuapp.com/api/recommendations/${user_id}/recs`)
        .then(res => {
            console.log('Recommendations Successfuly Loaded: ', res.data)
            setTimeout(() => {
                dispatch({ type: FETCH_SUCCESS, payload: res.data });
            }, 1000)
        })
        .catch(err => {
            console.log('Error fetching Recs: ', err);
            dispatch({ type: FETCH_ERROR });
        })
}

export const TRACK_RECS = 'TRACK_RECS';
export const TRACK_SUCCESS = 'TRACK_SUCCESS';
export const TRACK_ERROR = 'TRACK_ERROR';

export const trackRecs = (data) => dispatch => {
    dispatch({ type: TRACK_RECS })
    const user_id = localStorage.getItem('user_id')
    axiosWithAuth()
        // .get(`http://spotify-api-prod.herokuapp.com/request/?search=${data}`)
        .post(`https://spotify-api-prod.herokuapp.com/api/playlists/${user_id}`, data)
        .then(res => {
            console.log('IT WORKED', res);
            setTimeout(() => {
                dispatch({ type: TRACK_SUCCESS, payload: res.data.data})
            }, 1000)
        })
        .catch(err => console.log('Cannot get recs bro', err))
}

export const CLEAR_START = 'CLEAR_START';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const clearRecs = (playlist_id) => dispatch => {
    axiosWithAuth()
        .delete(`https://spotify-api-prod.herokuapp.com/api/playlists/${playlist_id}`)
        .then(res => {
            console.log('DELETE RES: ', res)
            dispatch({ type: CLEAR_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log('Problem deleting: ', err)
        })
}

const ID = localStorage.getItem("userID");

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const updateUser = (user, props) => dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });
axios()
  .put(`/user/${ID}/user_settings`, user)
    .then(response => {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      dispatch(push('/'));
    })
    .catch(error => {
      dispatch({
        type: UPDATE_USER_FAILURE,
        errorMessage: error.response.data.message
      });
    });
};