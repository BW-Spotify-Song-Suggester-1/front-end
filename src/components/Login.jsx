import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Button, TextField, Container  } from "@material-ui/core";
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
      width: 400
    }
}));

const initialState = {
  username: "",
  password: ""
};

const Login = props => {
  const classes = useStyles();

  const [credential, setCredential] = useState(initialState);
  const schema = object().shape({
    username: string().required("Username is required"),
    password: string().required("Password is required")
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const HandleChange = e => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = () => {
    props.loginData(credential);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='Wrapper'>
          <div className='wrapper'>
            <TextField
              style={{ margin: 10 }}
              color='secondary'
              className={classes.width}
              variant="outlined"
              name="username"
              error={!!errors.username}
              label="Username"
              helperText={errors.username ? errors.username.message : ""}
              type="email"
              inputRef={register}
              onChange={HandleChange}
            />
          </div>
          <div classNAme='password'>
            <TextField
              style={{ margin: 10 }}
              color='secondary'
              className={classes.width}
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
          <div className='btn`'>
            <ColorButton
              style={{ margin: 10 }}
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.width}
            >
            Submit
            </ColorButton>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Login
