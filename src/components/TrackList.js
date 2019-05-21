import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    width: '600px',
    maxWidth: '90%',
    backgroundColor: '#e5dcdb',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aca192' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

const TrackList = props => {
  const { classes } = props;
  const tracks = props.trackList.map((track, index) => {
    return <Track key={index}
      lengthInMs={track.lengthInMs}
      name={track.name}
      trackNumber={track.trackNumber}
      preview={track.preview}
    />
  });


  return (
    <Grid container
      justify='center'
      alignItems='center'
      direction='column'
    >
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              Track List
            </Typography>
            {tracks}
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

TrackList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  trackListToggled: PropTypes.bool.isRequired,
  trackList: PropTypes.array.isRequired,
}

export default withStyles(styles, {withTheme: true })(TrackList);