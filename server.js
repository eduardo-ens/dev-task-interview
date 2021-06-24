const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

const APIRouter = { groupsRoute, agreementsRoute, usersByGroup } =  require('./src/API/routes')
const pages = {pageAgreementCount} = require('./src/views/routes')

app.use(bodyParser.json())
app.use(cors())

app
    .use(express.static(__dirname + '/public'))
    .use('/API/groups', groupsRoute)
    .use('/API/agreements', agreementsRoute)
    .use('/API/usersByGroup', usersByGroup)

app
    .get('/', pageAgreementCount)

app.post('/api/login', (req, res) => {
    if(req.body.user === 'admin' && req.body.password === '123') {
        const token = jwt.sign({userId:1}, SECRET, { expiresIn: 180})
        return res.json({auth: true, token})
    }
    console.log('NÃO AUTORIZADO')
})

app.listen('4567')