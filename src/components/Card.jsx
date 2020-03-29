import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ element }) => (
  <div className="card border-dark" key={element.slug}>
    <img
      className="card-img-top"
      src={`https://usesthis.com/images/interviews/${element.slug}/portrait.jpg`}
      alt={`${element.name} Portrait`}
    />
    <div className="card-header">
      <h4>
        <a href={element.url}>{element.name}</a>
      </h4>
    </div>
    <div className="card-body">
      <p className="card-text">{element.summary}</p>
    </div>
    <div className="mx-2">
      <p>
        {element.categories.map((e, i) => (
          <span key={i} className="badge badge-secondary ml-2">
            {e}
          </span>
        ))}
      </p>
    </div>
  </div>
);

Card.propTypes = {
  element: PropTypes.exact({
    slug: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    summary: PropTypes.string,
    url: PropTypes.string,
    api_url: PropTypes.string,
    categories: PropTypes.array,
  }).isRequired,
};

export default Card;
