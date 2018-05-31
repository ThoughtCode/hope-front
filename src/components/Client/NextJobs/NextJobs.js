import React from 'react';

// Components
import {
  Grid,
  Typography,
} from 'material-ui';
import Job from '../Jobs/Job/Job';

// Css
import cls from './NextJobs.css'

const nextJobs = props => {
  const jobs = props.jobs.map(job => (
    <Job
      key={job.id}
      id={job.id}
      date={job.attributes.started_at}
      total={job.attributes.total}
      job_details={job.attributes.job_details}
      property={job.attributes.property}/>
  ));
  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={cls.Title} variant="headline">
              Proximos Trabajos
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          {jobs}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default nextJobs;