# Node SMS Portal
Basic **SMS Portal** HTTP API wrapper built around node's request module.

A node wrapper to allow more native node usage of the SMS Portal web services http API
Requires an existing account with SMS Portal [www.smsportal.co.za](http://www.smsportal.co.za).

## Dependancies 
* [bluebird.js](https://github.com/petkaantonov/bluebird) for promises.
* [xml2json](https://github.com/buglabs/node-xml2json) to parse the response xml into something more manageable in node.


## Install
In your node app, run: 

```bash
$ npm install --save node-smsportal
```

Once it is installed, it needs to be included:

```javascript
  var Client = require('node-smsportal');
```
To use it, it needs to be instantiated and initialized, one of 2 ways.

```javascript
  	var options = {
		username: '<existing smsportal username>',
		password: '<existing smsportal username>'
	}
	var smsportal = new Client();
	smsportal.init(options);
```

*OR*

```javascript
   var options = {
		username: '<existing smsportal username>',
		password: '<existing smsportal username>'
	}
	var smsportal = new Client(options);
```


## Code Example

Currently the library only supports 2 functions, checking the accounts credit balance, and sending a message. The message can be sent to one number or a comma separated list of numbers.
 
The following examples were written in express.

1. Check Credits

```javascript
	router.get('/check-credits', function(req, res,next){
		var options = {
			username: 'username',
			password: 'password'
		}
		var Client = require('node-smsportal');
		var smsportal = new Client();
		smsportal.init(options);
		smsportal.checkCredits(function(result){
			console.log(result);
			res.json(result);
			res.end();
		});
	});
```

2. Send SMS to 1 Number

```javascript
	router.get('/send-sms', function(req, res,next){
		var options = {
			username: 'username',
			password: 'password'
		}
		var Client = require('node-smsportal');
		var smsportal = new Client();
		var message = 'some text here';
		var number = '0812345678';
		smsportal.init(options);
		smsportal.sendSms(number, message,function(result){
			console.log(result);
			res.json(result);
			res.end();
		});
	});
```

3. Send SMS to Multiple Number

```javascript
	router.get('/send-sms', function(req, res,next){
		var options = {
			username: 'username',
			password: 'password'
		}
		var Client = require('node-smsportal');
		var smsportal = new Client();
		var message = 'some text here';
		var numbers = '0812345678,0712345678,0612345678';
		smsportal.init(options);
		smsportal.sendSms(numbers, message,function(result){
			console.log(result);
			res.json(result);
			res.end();
		});
	});
```

## Motivation

A node wrapper to allow more native node usage of the SMS Portal web services http API. This is being used as part of existing projects and made sense to abastract it out into its own module. API docs and more information can be found on [MyMobileAPI.com](http://www.mymobileapi.com).


## Tests

Currently no tests have been implemented


## License

MIT, see [LICENSE](LICENSE).