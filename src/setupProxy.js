const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/api/expense', { target: 'http://localhost:5000' }));
	app.use(proxy('/api/expense/*', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/expense/*/*', { target: 'http://localhost:5000' }));
	app.use(proxy('/api/expense/totals/*/*', { target: 'http://localhost:5000' }));
    
    app.use(proxy('/api/types', { target: 'http://localhost:5000' }));
}