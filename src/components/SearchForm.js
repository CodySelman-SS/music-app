import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = props => {
  return(
    <form>
      <input
          onChange = { e => props.onChange(e) }
        />
        <button
          type = "submit"
          onClick = { e => props.onClick(e) }
        >
          Submit
        </button>
    </form>
  );
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SearchForm;
