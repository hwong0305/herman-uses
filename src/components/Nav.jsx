import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const Nav = ({ changePage, page, last, active }) => (
  <nav aria-label="Page navigation example" className="mx-auto mt-5 row">
    <ul className="pagination">
      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
        <button
          type="button"
          className="page-link"
          aria-label="Previous"
          onClick={async () => {
            if (page === 1) return;
            changePage(page - 1, active ? active.toLowerCase() : null);
          }}
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </button>
      </li>
      {page < 4 &&
        _.range(1, Math.min(8, last + 1)).map((el) => (
          <li className={`page-item ${page === el ? 'active' : ''}`} key={el}>
            <button
              onClick={async () => {
                changePage(el, active ? active.toLowerCase() : null);
              }}
              type="button"
              className="page-link"
            >
              {el}
            </button>
          </li>
        ))}
      {page >= 4 &&
        _.range(
          Math.max(1, Math.min(last - 6, page - 3)),
          Math.min(last + 1, page + 4)
        ).map((el) => (
          <li className={`page-item ${page === el ? 'active' : ''}`} key={el}>
            <button
              onClick={async () => {
                changePage(el, active ? active.toLowerCase() : null);
              }}
              type="button"
              className="page-link"
            >
              {el}
            </button>
          </li>
        ))}
      <li className={`page-item ${page === last ? 'disabled' : ''}`}>
        <button
          type="button"
          className="page-link"
          aria-label="Next"
          onClick={async () => {
            if (page === last) return;
            changePage(page + 1, active ? active.toLowerCase() : null);
          }}
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </button>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  last: PropTypes.number.isRequired,
  active: PropTypes.string,
};

export default Nav;
