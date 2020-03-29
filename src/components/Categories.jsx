import React from 'react';
import PropTypes from 'prop-types';

const Categories = ({ active, setActive, categories, changePage }) => {
  if (categories) {
    return (
      <div>
        <h4>
          <button
            type="button"
            className={`badge ml-2 ${!active ? 'badge-success' : 'badge-info'}`}
            onClick={async () => {
              setActive(null);
              changePage(1);
            }}
          >
            All
          </button>
          {categories.map((category, idx) => (
            <button
              key={idx}
              type="button"
              className={`badge ml-2 ${
                active === category.name ? 'badge-success' : 'badge-info'
              }`}
              onClick={() => {
                setActive(category.name);
                changePage(1, category.slug);
              }}
            >
              {category.name}
            </button>
          ))}
        </h4>
      </div>
    );
  }
  return <div />;
};

Categories.propTypes = {
  active: PropTypes.string,
  categories: PropTypes.array,
  setActive: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Categories;
