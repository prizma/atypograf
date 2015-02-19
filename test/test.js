var typograf = require('..');

typograf.process('Abc - "1234абы"', {}, function(err, text)
{
	if (err)
	{
		console.log('Error ocurred: ' + err.toString());
		return;
	}

	// Success
	console.log('Typografed string: ('+ text +')');
});

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