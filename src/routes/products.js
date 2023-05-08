const express = require('express')

const { Router } = express

const uuid4 = require('uuid4')

const router = new Router


router.get('/', (req,res)=>{
    res.send('PRODUCTS GET')
})


module.exports = router