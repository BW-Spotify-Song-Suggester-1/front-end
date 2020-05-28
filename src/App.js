import React, { useState } from 'react';
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Link } from 'react-router-dom'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, AppBar, Paper, Container } from "@material-ui/core"
import headphones from './img/headphones.jpg'

function App() {

  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='container'>
      <div className='container-left' styles={{ backgroundImage:`url(${headphones})` }}>
        {/* <img src={headphones} alt='headphones' /> */}
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
