import axios from 'axios'
import { useHistory } from 'react-router-dom'
import React, { useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const ColorButton = withStyles(theme => ({
  root: {
    color: "#fff",
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "secondary"
    },
    borderColor: '#242424',
    width: 540,
    height: 40,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}))(Button);

const useStyles = makeStyles(theme => ({  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    notchedOutline: {
      border: '1px solid #fff',
    },
    borderRadius: 2     
  },
}));

const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  password: ""
};

const SignUp = props => {
  const history = useHistory()
  const classes = useStyles()

  const [newUser, setNewUser] = useState(initialState);

  const schema = object().shape({
    first_name: string().required("First Name is required"),
    last_name: string().required("Last Name is required"),
    username: string().required("Username is required"),
    password: string().required("Password is required")
  });

  const registerUser = newUser => {
    axios.post('https://reqres.in/api/user', newUser)
      .then(res => {
        setNewUser([res.data])
        console.log(res.data)
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setNewUser(initialState)
      })
}

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });
  const HandleChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  }; 

  const onSubmit = () => {
    console.log(newUser);
    registerUser(newUser);
  };

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='wrapper'>
          <div className='first-name'>
            <TextField 
              style={{ margin: 15 }}
              className={classes.textField}
              color='secondary'
              id='outlined-name'
              variant="outlined"
              name="first_name"
              error={!!errors.first_name}
              label="First Name"
              helperText={errors.first_name ? errors.first_name.message : ""}
              type="text"
              inputRef={register}
              onChange={HandleChange}
            />
          </div>
          <div className='last-name'>
            <TextField
              className={classes.textField}
              style={{ margin: 15 }}
              color='secondary'
              id='outlined-name'
              variant="outlined"
              name="last_name"
              error={!!errors.last_name}
              label="Last Name"
              helperText={errors.last_name ? errors.last_name.message : ""}
              type="text"
              inputRef={register}
              onChange={HandleChange}
            />
          </div>
          <div className='username'>
            <TextField
              className={classes.textField}
              style={{ margin: 15 }}
              color='secondary'
              id='outlined-name'
              variant="outlined"
              name="Email"
              error={!!errors.username}
              label="Username"
              helperText={errors.username ? errors.username.message : ""}
              type="email"
              inputRef={register}
              onChange={HandleChange}
            />
          </div>
          <div className='password'>
            <TextField
              className={classes.textField}
              style={{ margin: 15 }}
              color='secondary'
              id='outlined-password'
              variant="outlined"
              name="password"
              error={!!errors.password}
              label="Password"
              inputRef={register}
              helperText={errors.password ? errors.password.message : ""}
              type="password"
              onChange={HandleChange}
            />
          </div>
          <div className='btn'>
            <ColorButton
              style={{ margin: 7.5 }}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </ColorButton>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default SignUp