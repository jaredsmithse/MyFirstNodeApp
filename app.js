
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var employeeProvider = new EmployeeProvider('localhost', 27017);

// routes
app.get('/', function(request,response){
	employeeProvider.findAll( function(error, emps){
		response.render('index', {
			title: 'Employees',
			employees: emps
		});
	});
});



app.get('/employee/new', function(request, response) {
	response.render('employee_new', {
		title: 'New Employee'
	});
});

// save new employee
app.post('/employee/new', function(request, response) {
	employeeProvider.save({
		title: request.param('title'),
		name: request.param('name')
	}, function(error, docs) {
		response.redirect('/')
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});










