import React from "react";
import PropTypes from "prop-types";
import "./card.scss";

const Card = ({ item }) => {
  const { userImageURL, tags, user, likes } = item;
  return (
    <div className="card">
      <img src={userImageURL} alt={tags} className="card-image" />
      <div className="card-details">
        <span>Name : {user}</span> <br />
        <span>Likes: {likes}</span>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired
};

export default Card;
