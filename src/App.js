import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Link } from 'react-router-dom'
import { Tab, Tabs, AppBar, Paper, Container } from "@material-ui/core"
import headphones from './img/headphones.jpg'

function App() {

  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get('https://reqres.in/api/user')
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  },[])
  

  return (
    <div className='container'>
      <div className='container-left' styles={{ backgroundImage:`url(${headphones})` }}>
      </div>
      <div className='container-right'>
        <Container maxWidth='sm'>
        <Paper square>
          <AppBar position='static' color='danger'>
          <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="secondary"
              variant='fullWidth'
              onChange={handleChange}
              aria-label="Sign In and Sign Up"
            >
              <Tab label="Sign In" component={ Link } to='/' />
              <Tab label="Sign Up" component={ Link } to='/signup' />
          </Tabs>
        </AppBar>
        </Paper>
        </Container>
  
            
        <Route exact path='/'>
          <Login />
        </Route>

        <Route exact path='/signup'>
          <SignUp />
        </Route>

      </div>
    </div>
  );
}

export default App;
