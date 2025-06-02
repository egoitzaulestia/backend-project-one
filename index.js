const express = require('express');
// const { typeError } = require('./middlewares/errors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
