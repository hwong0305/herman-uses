import React, { useEffect, useState } from 'react';
import Card from './Card';
import Loading from './Loading';
import Nav from './Nav';

import '../styles/uses.css';
import Categories from './Categories';

const fetchInterviews = async (page, category = false) => {
  let res;
  if (page === 1 && !category) {
    res = await fetch('/uses');
  } else if (!category) {
    res = await fetch(`/uses?page=${page}`);
  } else if (page === 1) {
    res = await fetch(`/categories/${category}`);
  } else {
    res = await fetch(`/categories/${category}?page=${page}`);
  }
  return res.json();
};

const App = () => {
  const [last, setLast] = useState(null);
  const [interviews, setInterviews] = useState();
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const [categories, setCategories] = useState([]);

  const changePage = async (newPage, name = null) => {
    setInterviews(null);
    const { interviews: myInterviews, lastPage } = await fetchInterviews(
      newPage,
      name
    );
    setPage(newPage);
    setInterviews(myInterviews);
    setLast(Number(lastPage));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/uses');
        const response = await fetch('/categories');
        const [
          { interviews: interviewsData, lastPage },
          { categories: myCategories },
        ] = await Promise.all([res.json(), response.json()]);
        setInterviews(interviewsData);
        setCategories(myCategories);
        setLast(Number(lastPage));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  if (!!interviews && !!last && !!categories) {
    return (
      <div className="container page__container d-flex flex-column">
        <h1>uses this</h1>
        <div className="row mb-4">
          <Categories
            className="px-3"
            active={active}
            setActive={setActive}
            categories={categories}
            setCategories={setCategories}
            changePage={changePage}
          />
        </div>
        <div className="container__grid row">
          {interviews.map((el) => (
            <Card key={el.slug} element={el} />
          ))}
        </div>
        <Nav page={page} changePage={changePage} last={last} active={active} />
        <footer className="text-center">
          <small>
            Powered by <a href="https://usesthis.com/api/">Uses This</a> under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              Attribution-Share License
            </a>
          </small>
        </footer>
      </div>
    );
  }

  return <Loading />;
};

export default App;
