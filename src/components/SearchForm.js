import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  grid: {
    justify: 'center',
  },
  root: {
    margin: '12px 0',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    maxWidth: '90%',
    backgroundColor: '#e5dcdb',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23aca192' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

const SearchForm = props => {
  const { classes } = props;

  return(
    <Grid
      container
      justify='center'
      alignItems='center'
    >
      <Paper className={classes.root} elevation={1}>
        <InputBase
          className={classes.input}
          placeholder="Search Artist Name"
          onChange = { e => props.onChange(e) }
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick = { e => props.onClick(e) }
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchForm);
