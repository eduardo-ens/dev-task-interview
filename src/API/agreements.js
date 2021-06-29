const express = require('express')
const axios = require('axios')
const { response } = require('express')
const router = express.Router()
require('dotenv/config')

router.get('/user/:user_id', async(req, res) => {
    const userId = req.params.user_id
    try {
        const url = 'https://api.na4.echosign.com/api/rest/v6/agreements/'
        const token = process.env.API_TOKEN

        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-api-user':`userid:${userId}`
            }
        })
        
        return res.json(data)
    
    } catch (error) {
        if(response.statusCode == 200) {
            data = []
            return res.json(data)
        }
        console.error(error)
        
        
    }
})


router.get('/total', async(req, res) => {
    try {
        const url = 'https://api.na4.echosign.com/api/rest/v6/agreements'
        const token = process.env.API_TOKEN

        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        
        return res.json(data)

    } catch (error) {
        console.error(error)
        
    }
})

module.exports = router