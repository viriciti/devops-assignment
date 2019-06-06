const app = require('./app')

app.start(() => console.log('started app...'))

const stop = () => app.stop(() => console.log('stopped app...'))

process.once('SIGINT', stop)
process.once('SIGTERM', stop)
