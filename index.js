const express = require('express');
const { typeError } = require('./middlewares/errors');
const cors = require('cors');
// const path = require('path');
const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://<your-frontend-domain>', // if you deploy the frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

// app.get('/health', (req, res) => res.send('ok'));

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
