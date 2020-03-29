import express from 'express';
import axios from 'axios';
import path from 'path';

const API_LINK = 'https://usesthis.com/api/v2/interviews/';

const port = process.env.PORT || 3041;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/categories', async (req, res) => {
  try {
    const { data } = await axios.get('https://usesthis.com/api/v2/categories');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
});

app.get('/categories/:name', async (req, res) => {
  try {
    const {
      params: { name },
      query: { page },
    } = req;
    const interviewPromises = [];
    const {
      data: { interviews, links },
    } = await axios.get(
      `https://usesthis.com/api/v2/categories/${name}${page ? '?page=' : ''}${
        page || ''
      }`
    );
    for (const interview of interviews) {
      if (interview.slug.indexOf('.') !== -1) {
        interviewPromises.push(axios.get(`${API_LINK}${interview.slug}`));
      } else {
        interviewPromises.push({ data: { interview: { categories: [] } } });
      }
    }
    const lastPageArr = links.last_page.split('?page=');
    const lastPage = lastPageArr.length === 1 ? 1 : lastPageArr[1];
    Promise.all(interviewPromises).then((results) => {
      results.forEach((result, index) => {
        interviews[index].categories = result.data.interview.categories;
      });
      res.json({ interviews, lastPage });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

app.get('/uses', async (req, res) => {
  try {
    const {
      query: { page },
    } = req;
    const {
      data: { interviews, links },
    } = await axios.get(`${API_LINK}?page=${page || ''}`);
    const lastPage = links.last_page.split('?page=')[1];
    const interviewPromises = [];
    for (const interview of interviews) {
      if (interview.slug.indexOf('.') !== -1) {
        interviewPromises.push(axios.get(`${API_LINK}${interview.slug}`));
      } else {
        interviewPromises.push({ data: { interview: { categories: [] } } });
      }
    }
    Promise.all(interviewPromises)
      .then((results) => {
        results.forEach((result, index) => {
          interviews[index].categories = result.data.interview.categories;
        });
        res.json({ interviews, lastPage });
      })
      .catch((err) => {
        console.log(err.request.path);
        console.log(err.message);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
});

app.listen(port, () => {
  console.log(`Now listening on Port ${port}...`);
});
