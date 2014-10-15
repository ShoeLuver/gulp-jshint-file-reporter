var fs = require( 'fs' );

var defaultFilename = 'jshint-output.log';

var wrStream;
var filename;

module.exports = function( results, data, opts ) {
	opts = opts || {};
	opts.filename = opts.filename || defaultFilename;

	if( wrStream && filename !== opts.filename ) {
		wrStream.end();
		wrStream = null;
	}

	if( !wrStream ) {
		wrStream = fs.createWriteStream( opts.filename );
		filename = opts.filename;
	}
	outputNormalText( results, wrStream );
};

var outputNormalText = function outputNormalText( aoResults, wrStream ) {
	var aOutput = [];
	aoResults.forEach( function( oResult, i ) {
		var oError = oResult.error;
		if( i === 0 ) {
			// Start each block with the number of errors and filename
			aOutput.push( aoResults.length + ' lint errors found in ' + oResult.file );
		}
		// Indented entries ex. -> [186,2](W033) Missing semicolon.
		aOutput.push( '\t[' + oError.line + ',' + oError.character + '](' + oError.code + ') ' + oError.reason );
	} );
	// Put it all together
	wrStream.write( aOutput.join( '\n' ) + '\n' );
};
