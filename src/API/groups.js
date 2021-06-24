const express = require('express')
const axios = require('axios')
const router = express.Router()
require('dotenv/config')

router.get('/', async(req, res) => {
    try {
        const url = 'https://api.na4.echosign.com/api/rest/v6/groups/'
        const token = process.env.API_TOKEN

        const { data } = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res.json(data)
    
    } catch (error) {
        console.error(error)
    }
})

module.exports = router