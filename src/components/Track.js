import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '540px',
    maxWidth: '90%',
    backgroundColor: '#e5dbe4',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%23ac92aa' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  details: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
    maxWidth: '360px',
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

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    }
  }

  handlePlayClick(audioRef) {
    this.props.onPlayClick(audioRef);
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  render() {
    const { classes } = this.props;
    const lengthInS = this.props.lengthInMs / 1000;
    const minutes = Math.floor(lengthInS / 60);
    const seconds = Math.floor(lengthInS % 60);
    const secondsFormatted = seconds >= 10 ? seconds : `0${seconds}`;
    const lengthFormatted = `${minutes}: ${secondsFormatted}`;
    const audioRef = React.createRef();

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {`${this.props.trackNumber}. ${this.props.name}`}
            </Typography>
          </CardContent>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {lengthFormatted}
            </Typography>
          </CardContent>
        </div>
          <div className={classes.controls}>
            <IconButton aria-label="Play/pause" onClick={() => {this.handlePlayClick(audioRef)}}>
              { this.state.isPlaying ?
                  <PauseIcon className={classes.playIcon} />
                  :
                  <PlayArrowIcon className={classes.playIcon} />
              }
            </IconButton>
            <audio src={this.props.preview} ref={audioRef}/>
          </div>
      </Card>
    );
  }
}

Track.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  albumIndex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  lengthInMs: PropTypes.number.isRequired,
  trackNumber: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Track);