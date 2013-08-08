var assert = require("assert");
var EmployeeProvider = require("../employeeprovider").EmployeeProvider;
var employeeProvider = new EmployeeProvider('localhost', 27017);

describe('EmployeeProvider', function() {
	describe('#getCollection()', function() {
		it('should return a collection of employees', function() {
			//employeeProvider.save({title:"Mr", name:"Jared"})
			console.log( "=====================" );
			console.log(employeeProvider);
			console.log( "=====================" );

		})
	})
})