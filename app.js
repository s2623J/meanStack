require('dotenv/config');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const api = process.env.API_URL;
const strConn = process.env.CONNECTTION_STRING;

// Middleware Section
app.use(express.json()); // Middleware for processing JSON data
app.use(morgan('tiny')); // Middleware for console logging requests

const productSchema = mongoose.Schema({ // Defines the Collection/table
    name:           String,
    image:          String,
    countInStock:   {
        type:       Number,
        required:   true
    }
})

const Product = mongoose.model('Product', productSchema); // Creates a model using the aforementioned schema

// Router Section
app.get(`${api}/products` , (req, res) => {
    // const product = {
    //     "id":     1,
    //     "name":   "hairdresser",
    //     "image":  "some_url"
    // }
    // res.send(product);
    Product.find()  // Pulling array of Products from collection/table
        .then((data) => {
            return (!!data) ? res.send(data) : res.status(500).json({success: false});
        })
})

app.post(`${api}/products` , (req, res) => {
    // const newProduct = req.body;
    // console.log('newProduct: ', newProduct);
    const product = new Product({
        name:           req.body.name,
        image:          req.body.image,
        countInStock:   req.body.countInStock
    })
    product.save()
        .then((createdProduct => {
            res.status(201).json(createdProduct);
        }))
        .catch((err) => {
            res.status(500).json({
                error:      err,
                success:    false
            })
        })
    // res.send(newProduct);
})

mongoose.connect(strConn)
    .then((data) => {
        console.log('data: ', data);
    })
    .catch((err) => {
        console.log('Error: ', err);
    })

app.listen(3000, () => {
    console.log('Server now running on http://localhost:3000');
})