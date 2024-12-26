const express = require("express");
const router = express.Router();

// localhost:3000/products 라우터페이지

const Product = require("../models/Products") // product 테이블 호출


router.route('/')
.get(async (req, rew, next) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    } catch(err) {
        console.error(err)
    }
})