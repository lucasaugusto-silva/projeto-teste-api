const mongoose = require('mongoose')

const Universities = mongoose.model('Universities', {
    alpha_two_code: String,
    web_pages: Array,
    name: String,
    country: String,
    domains: Array,
    state_province: String
})

module.exports = Universities