/* istanbul ignore if */
if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}
/* istanbul ignore else */
if (typeof(chordsWiki) === 'undefined') {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}