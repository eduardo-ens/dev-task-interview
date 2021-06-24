const express = require('express')
const app = express()

function pageLogin(req, res) {
    res.sendFile(__dirname + '/login/login.html')
}

function pageAgreementCount(req, res) {
    return res.sendFile(__dirname + '/agreementCount/agreementCount.html')
}
module.exports = {pageLogin, pageAgreementCount}