import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '8px',
    width: '600px',
    maxWidth: '90%',
    backgroundColor: '#e5dcdb',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aca192' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 100,
  },
  textCenter: {
    textAlign: 'center',
  }
});

const AlbumCard = props => {
  const { classes } = props;

  return(
    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={props.imgSrc}
          title={props.albumName}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              { props.albumName }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.textCenter}>
              { props.releaseYear }
            </Typography>
          </CardContent>
        </div>
        <IconButton onClick={() => {props.onClick(props.index)}}>
            <ExpandMoreIcon />
        </IconButton>
      </Card>
      {props.trackListToggled ?
        <TrackList
          trackListToggled = {props.trackListToggled}
          trackList = {props.trackList}
        />
        : ''
      }

    </ React.Fragment>
  );
}

AlbumCard.propTypes = {
  albumName: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  trackList: PropTypes.array.isRequired,
  trackListToggled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(AlbumCard);