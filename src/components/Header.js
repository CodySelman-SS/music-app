import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    maxWidth: '90%',
    backgroundColor: '#e5dcdb',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aca192' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  },
});

const Header = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
      {props.artistName || 'Search for an Artist to see their Albums'}
      </Typography>
      <Typography component="p">
        {props.artistName ? 'Discography' : ''}
      </Typography>
    </Paper>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default withStyles(styles)(Header);