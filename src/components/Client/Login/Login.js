import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import FacebookLogin from 'react-facebook-login';
import Button from 'material-ui/Button';
import Auth from '../Auth/Auth';
import cls from './Login.css';
import Logo from '../../../assets/Logo.svg'

import * as actions from '../../../store/actions';

class Login extends Component {
  state = {
    accessToken: null,
  }

  onLoginWithFacebook = () => {
    this.props.onLogin(this.state.accessToken);
  }

  responseFacebook = (response) => {
    const { accessToken } = response.accessToken;
    this.setState({
        accessToken,
      },
      this.onLoginWithFacebook,
    );
  }
  render() {
    return (
      <div>
        <div className={cls.Login}>
          <Grid container className={cls.ButtonClose}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={0}>
                <Button component={Link} to="/">
                  <i className="material-icons">clear</i>
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Grid container justify="center" className={cls.LoginContainer}>
            <Grid item xs={12} sm={12}>
              <Paper elevation={0}>
                 <Button component={Link} to="/" >
                  <img src={Logo} className={cls.Applogo} alt="logo" />
                 </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper elevation={0}>
                <Typography variant="headline" gutterBottom className={cls.Typogra}>CLIENTE</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0}>
                <Auth />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={cls.ButtonFacebook} elevation={0}>
                <FacebookLogin
                  appId="2057031764572769"
                  autoLoad={false}
                  fields="name,email"
                  callback={this.responseFacebook} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0}>
                <Button component={Link} to="/agente/login" >Entra como agente</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper elevation={0}>
                <Button component={Link} to="/registro" >¿NO TIENES UNA CUENTA?</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper elevation={0}>
                <Button component={Link} to="/reset" >¿OLVIDÓ SU CONTRASEÑA?</Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: accessToken => dispatch(actions
    .facebookLogin(accessToken)),
});

export default connect(null, mapDispatchToProps)(Login);
