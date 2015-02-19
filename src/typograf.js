/**
 *
 */

module.exports = new ATypograf();

function ATypograf ()
{
	// Entity types of response
	this.TYPE_HTML_ENTITIES			= 1;
	this.TYPE_XML_ENTITIES			= 2;
	this.TYPE_NO_ENTITIES			= 3;
	this.TYPE_MIXED_ENTITIES		= 4;

	var _request = require('request');
	var _xmlParser = require('xml2js').parseString;

	this.process = function(text, options, callback)
	{
		// Do some sanity check
		if (!text || text.length == 0)
		{
			callback ('You should pass text parameter');
			return;
		}

		var type = options.type ? parseInt(options.type) : this.TYPE_NO_ENTITIES;
		var useBr = options.useBr ? parseInt(options.useBr) : 0;
		var useP = options.useP ? parseInt(options.useP) : 0;
		var maxNobr = options.maxNobr ? parseInt(options.maxNobr) : 0;


		var xml = '<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<soap:Body>'+
		'<ProcessText xmlns="http://typograf.artlebedev.ru/webservices/">'+
		'<text>' + text + '</text>'+ 
		'<entityType>'+ type +'</entityType>'+
		'<useBr>'+ useBr +'</useBr>'+
		'<useP>'+ useP +'</useP>'+
		'<maxNobr>'+ maxNobr +'</maxNobr>'+
		'</ProcessText>'+
		'</soap:Body>'+
		'</soap:Envelope>';

		_request.post(
		{
			url: 'http://typograf.artlebedev.ru/webservices/typograf.asmx', 
			headers: {
				'Content-Type': 'text/xml',
				'SOAPAction': 'http://typograf.artlebedev.ru/webservices/ProcessText'
			},
			body: xml
		}, function (err, httpResponse, body) 
		{
			if (err) 
			{
				return callback (err.toString());
			}

			_xmlParser(body, function (err, result) 
			{
				if (result['soap:Envelope'] && 
					result['soap:Envelope']['soap:Body'] && 
					result['soap:Envelope']['soap:Body'][0] &&
					result['soap:Envelope']['soap:Body'][0]['ProcessTextResponse'] &&
					result['soap:Envelope']['soap:Body'][0]['ProcessTextResponse'][0] &&
					result['soap:Envelope']['soap:Body'][0]['ProcessTextResponse'][0]['ProcessTextResult'] &&
					result['soap:Envelope']['soap:Body'][0]['ProcessTextResponse'][0]['ProcessTextResult'][0])
				{
					return callback (null, result['soap:Envelope']['soap:Body'][0]['ProcessTextResponse'][0]['ProcessTextResult'][0].replace(/^\s+|\s+$/g, ''));
				}
				else
				{
					return callback ('Unexpected response is received from typograf');
				}
			});
		});
	}

}