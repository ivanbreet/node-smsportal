'use-strict';

var curl = require('curlrequest');
var parser = require('xml2json');
var Promise = require('bluebird');

var Client = function(options){
	
	options = options || false;

	var username;
	var password;
	var url;

	var _init = function (options){

		options = options || {};

		if (!options.username) {
		    throw new Error('username is required, please pass a username in the options hash');
		}

	  	if (!options.password) {
	    	throw new Error('password is required, please pass a username in the options hash');
	  	}

	  	username = options.username;
	  	password = options.password;

	  	url = 'http://www.mymobileapi.com/api5/http5.aspx';
	}

	var _verify = function(){
		if (!username) {
		    throw new Error('username is required, please run init()');
		}
	  	if (!password) {
	    	throw new Error('password is required, please run init()');
	  	}
	  	if (!url) {
	    	throw new Error('url is required, please run init()');
	  	}
	}

	var _querySmsServer = function(data){
		data = data || {};
		data.username = username;
		data.password = password;
		var options = {
			url: url,
			method: 'POST',
			data: data,
			timeout: 2000,
		}
		return new Promise(function(resolve, reject){
			curl.request(options, function(err, data){
				if (err) reject(err);
		    	if (!data) reject('SMS Connection Error: No data was returned');
				var result = parser.toJson(data, {object: true, coerce: true}).api_result;	
				if (result.call_result.error.length) reject(result.call_result.error);
				if (!result.call_result.result) reject('Sending Failed: Could not connect to the SMS gateway');
				resolve(result);
			});
		});
	}

	this.init = function(options){
		_init(options);
	}

	this.checkCredits = function(callback){
		_verify();
		var data = {
			Type: 'credits',
		}
		_querySmsServer(data)
		.then(function(response){
			if (response.call_result.result){
				callback(response.data.credits);
			} else {
				callback( 'Connection Error or connection timed out');
			}
		}).catch(function(err){
			callback(err);
		});
	};

	this.sendSms = function(mobile_number, message, callback){
		_verify();
		var data = {
			Type: 'sendparam',
			numto: mobile_number || "",
			data1: message || ""
		}
		_querySmsServer(data)
		.then(function(response){
			callback({
				status: 'Sent Successfully',
				eventid: response.send_info.eventid
			});
		}).catch(function(err){
			callback(err);
		});	
	};

	if (options) _init(options);
}


module.exports = Client;
