import React from 'react';
import { Link } from 'react-router-dom';

// Components
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Button,
} from 'material-ui';

// Css
import cls from './CardAgentShow.css'
import Image from '../../../../assets/avatar-default-300x300.jpg';

const info = props => {
  let profile = null;
  if (props.user.attributes) {
    profile = (
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={3}>
                <Paper elevation={0}>
                  <Grid container className={cls.CardInfo} align="center">
                    <Grid item xs={12}>
                      <Paper elevation={0}>
                        <Avatar
                          className={cls.Avatar}
                          src={props.user.attributes.avatar.url || Image}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Paper elevation={0}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Paper elevation={0}>
                        <Typography variant="headline" gutterBottom>
                          {props.user.attributes.first_name} {props.user.attributes.last_name}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0}>
                        <Link to="#">
                          <Typography variant="subheading" gutterBottom>
                            <Grid container>
                              <Grid item xs={4}>
                                <Paper elevation={0}>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star_half</i>
                                  <i class="material-icons">star_border</i>
                                </Paper>
                              </Grid>
                              <Grid item xs={4}>
                                <Paper className={cls.CantReviews} elevation={0}>
                                  20 Opiniones
                                </Paper>
                              </Grid>
                            </Grid>
                          </Typography>
                        </Link>
                      </Paper>  
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0}>
                        <Typography variant="subheading" gutterBottom>
                          <i className="fas fa-envelope"></i>
                          <span>{props.user.attributes.email}</span>
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0}>
                        <Typography variant="subheading" gutterBottom>
                          <i className="fas fa-id-card"></i>
                          <span>{props.user.attributes.national_id}</span>
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid xs={12} sm={4}>
                <Paper elevation={0}>
                  <Grid container justify="center">
                    <Grid xs={12} sm={4}>
                      <Paper elevation={0}>
                        <Button className={cls.ButtonContratar}>CONTRATAR</Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  return (
    <div>
      {profile}  
    </div>
  );
}

export default info;