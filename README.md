## atypograf

![NPM version](https://img.shields.io/badge/Version-1.0.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-000000.svg)

This is Node.js library for ArtLebedev's typograf http://www.artlebedev.ru/tools/typograf/

## Usage

Library can be downloaded through npm easily ```npm install atypograf```

Then atypograf is easy to use as the following:

```javascript
var typograf = require('atypograf');

typograf.process('Abc - "1234абы"', {
	type: typograf.TYPE_MIXED_ENTITIES,
	useBr: 1,
	useP: 1,
	maxNobr: 1
}, function(err, text)
{
	if (err)
	{
		console.log('Error ocurred: ' + err.toString());
		return;
	}

	// Success
	console.log('Typografed string: ('+ text +')');
});
```

### Options

Parameter | Description
------------ | -------------
type | Defines type of result entities that will be considered by typograf.<br>Following consstants are defined in exported object:<br>TYPE_HTML_ENTITIES, TYPE_XML_ENTITIES, TYPE_NO_ENTITIES (default) and TYPE_MIXED_ENTITIES.
useBr | 1 – if you want typograf to add br-s. 0 – otherwise (default)
useP | 1 – if you want typograf to add p-s. 0 – otherwise (default)
maxNobr | (integer) max number of nobr-s. Default 0
