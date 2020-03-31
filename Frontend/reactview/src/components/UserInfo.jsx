import * as React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './signup.css'
class UserInfo extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
        <div className = "fields">
        <MuiThemeProvider>
            <React.Fragment>
            <div className="field"> 
            <TextField
                placeholder="Enter Your First Name"
                label="First Name"
                onChange={handleChange("first_name")}
                defaultValue={values.first_name}
            />
            </div>
            <br />
            <div className="field"> 
            <TextField
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange("last_name")}
                defaultValue={values.last_name}
            />
            </div>
            <br />
            <div className="field"> 
            <TextField
                placeholder="Email address"
                label="Email address"
                onChange={handleChange("email")}
                defaultValue={values.email}
            />
            </div>
            <br />
            <Button color="primary" variant="contained" onClick={this.continue}>
                Continue
            </Button>
            </React.Fragment>
        </MuiThemeProvider>
        </div>
    );
  }
}

export default UserInfo;
