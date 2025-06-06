const express = require('express');
const { typeError } = require('./middlewares/errors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));
app.use('/users', require('./routes/users'));
app.use('/reviews', require('./routes/reviews'));
app.use('/products2', require('./routes/products2'));
app.use('/users2', require('./routes/users2'));

app.use(typeError);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
