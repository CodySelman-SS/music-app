import React from 'react';
import PropTypes from 'prop-types';

const AlbumCard = props => {
  return(
    <li>
      <h3>{props.albumName}</h3>
      <h4>{props.releaseYear}</h4>
      <img src={props.imgSrc} alt={props.albumName} />
    </li>
  );
}

AlbumCard.propTypes = {
  albumName: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
}

export default AlbumCard;