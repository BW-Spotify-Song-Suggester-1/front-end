import React, { useState } from "react";
import { Button, TextField, Container  } from "@material-ui/core";
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
      margin: {
        margin: theme.spacing(1)
      },
      width: {
        width: 200
      },
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
              id="outlined-name"
              style={{ margin: 15 }}
              color='secondary'
              className={classes.textField}
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
          <div className='password'>
            <TextField
              id="outlined-password"
              style={{ margin: 15 }}
              color='secondary'
              className={classes.textField}
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
  );
};

export default Login
