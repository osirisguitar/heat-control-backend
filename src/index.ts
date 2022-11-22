import app from './app';

const port = 8003

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
