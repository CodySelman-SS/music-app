import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '8px',
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

const AlbumCard = props => {
  const { classes, theme } = props;

  return(
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
          <Typography variant="subtitle1" color="textSecondary">
            { props.releaseYear }
          </Typography>
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="Previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="Next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div> */}
      </div>
    </Card>
  );
}

AlbumCard.propTypes = {
  albumName: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(AlbumCard);