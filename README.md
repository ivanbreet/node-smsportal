# node-smsportal
Basic SMS Portal HTTP API wrapper built around CURL.

Requires an existing account with SMS Portal [www.smsportal.co.za](www.smsportal.co.za).

## Dependancies 
[bluebird.js](https://github.com/petkaantonov/bluebird) for promises.
[curlrequest](https://github.com/node-js-libs/curlrequest) for the wrapper around curl.
[xml2json](https://github.com/buglabs/node-xml2json) to parse the response xml into something more manageable in node.

## Explanation
curl was used as the sample code and api document on [MyMobileAPI.com](http://www.mymobileapi.com) use curl. this can be refactored to a more native node implementation but functionality was required quickly.

## Testing
no tests have been implimented as yet.