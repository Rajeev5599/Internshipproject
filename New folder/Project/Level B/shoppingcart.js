const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());

app.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(productId);
    res.send({ message: 'Item added to cart!' });
});

app.get('/cart', (req, res) => {
    res.send(req.session.cart || []);
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));


function addToCart(productId) {
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        const notification = document.getElementById('cart-notification');
        notification.innerText = data.message;
        notification.style.display = 'block';
        setTimeout(() => { notification.style.display = 'none'; }, 2000);
    });
}
