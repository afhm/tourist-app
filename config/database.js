if (process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: 'mongodb://afhm:123456a@ds149268.mlab.com:49268/tourist-prod'}
}
else {
    module.exports = { mongoURI: 'mongodb://localhost:27017/tourist'}
}