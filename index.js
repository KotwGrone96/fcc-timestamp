const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/views`));

app.get('/', (req, res) => {
  app.render('index');
});

app.get('/api', (req, res) => {
  const date = new Date();
  const unix = Date.parse(date);
  const utc = date.toUTCString();
  const responseDate = { unix, utc };
  res.json(responseDate);
});

app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  const dateType = isNaN(Number(dateParam));
  if (dateType) {
    const regExpDate = new RegExp(/^\d{1,4}\-\d{1,2}\-\d{1,2}$/);
    const dateTest = regExpDate.test(dateParam);
    if (!dateTest) {
      res.json({ error: 'Invalid Date' });
      return;
    }
    const utc = new Date(dateParam).toUTCString();
    const unix = Date.parse(new Date(dateParam));
    const responseDate = { unix, utc };
    res.json(responseDate);
  } else {
    const unix = Number(dateParam);
    const utc = new Date(unix).toUTCString();
    const responseDate = { unix, utc };
    res.json(responseDate);
  }
});

app.listen(port, () => console.log(`Server is runing in http://localhost:${port}`));
