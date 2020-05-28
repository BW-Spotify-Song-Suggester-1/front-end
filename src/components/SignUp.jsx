
import React, { useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const ColorButton = withStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: "#FF1644",
    "&:hover": {
      backgroundColor: "#FF1644"
    }
  }
}))(Button);

const useStyles = makeStyles(theme => ({  
  margin: {
    margin: theme.spacing(1)
  },
  width: {
    width: 500
  }
}));

const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  password: ""
};
const SignUp = props => {
  const classes = useStyles();

  const [newUser, setNewUser] = useState(initialState);
  const schema = object().shape({
    first_name: string().required("First Name is required"),
    last_name: string().required("Last Name is required"),
    username: string().required("Username is required"),
    password: string().required("Password is required")
  });

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
    props.registerUser(newUser);
  };

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div classNAme='wrapper'>
          <div className='first-name'>
            <TextField 
              style={{ margin: 10 }}
              className={classes.width}
              color='secondary'
              variant="outlined"
              required
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
              className={classes.width}
              style={{ margin: 10 }}
              color='secondary'
              variant="outlined"
              required
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
              className={classes.width}
              style={{ margin: 10 }}
              color='secondary'
              variant="outlined"
              required
              name="username"
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
              className={ classes.width }
              style={{ margin: 10 }}
              color='secondary'
              variant="outlined"
              required
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
              style={{ margin: 10, width: 520 }}
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