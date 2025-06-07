const express = require('express');
const { typeError } = require('./middlewares/errors');
// const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/categories', require('./routes/categories'));
app.use('/orders', require('./routes/orders'));
app.use('/reviews', require('./routes/reviews'));
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(typeError);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
