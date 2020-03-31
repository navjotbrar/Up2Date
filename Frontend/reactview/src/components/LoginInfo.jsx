import * as React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './signup.css'

class LoginInfo extends React.Component {
  submit = e => {
    e.preventDefault();
    this.props.submit();
  };
  return = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <div className = "fields">
        <div className="field"> 
        <TextField
          placeholder="Enter a Username"
          label="username"
          onChange={handleChange("username")}
          defaultValue={values.username}
        />
        </div>
        <br />
        <div className="field"> 
        <TextField
          placeholder="Enter a Password"
          label="password"
          onChange={handleChange("password")}
          defaultValue={values.password}
        />
        </div>
        <br/>
        <Button color="primary" variant="contained" onClick={this.return}>
          return
        </Button>{" "}
        <Button color="primary" variant="contained" onClick={this.submit}>
          Continue
        </Button>
      </div>
    );
  }
}

export default LoginInfo;
