const express = require('express');
const { Router } = require('express');

const routes = express.Router();

routes.post('/users', (request,response) => {
    
    const body = request.body

    console.log(body)
    return response.json({
        nome: 'Rodrigo'
    });
});


module.exports = routes;