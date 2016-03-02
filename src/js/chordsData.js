if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}

if (typeof(chordsWiki) === 'undefined') {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}

if (typeof(chordsWiki.chordsData) === 'undefined') {
	/* jshint ignore:start */
	chordsWiki.chordsData = {
		"chord_instances": [
			{
				"chord_id": 0,
				"type_id": 0,
				"notes": [0,4,8]
			},
			{
				"chord_id": 0,
				"type_id": 1,
				"notes": [1,3,8]
			},
			{
				"chord_id": 1,
				"type_id": 0,
				"notes": [2,6,10]
			},
			{
				"chord_id": 1,
				"type_id": 1,
				"notes": [2,5,10]
			}

		],
		"chord_types": [
			{
				"id": 0,
				"label": "C"
			},
			{
				"id": 1,
				"label": "D"
			}
		],
		"chord_categories": [
			{
				"id": 0,
				"label": "major"
			},
			{
				"id": 1,
				"label": "minor"
			}
		],
		"notes": [
			{
				"id": 0,
				"label": "C"
			},
			{
				"id": 1,
				"label": "C#"
			},
			{
				"id": 2,
				"label": "D"
			},
			{
				"id": 3,
				"label": "D#"
			},
			{
				"id": 4,
				"label": "E"
			},
			{
				"id": 5,
				"label": "E#"
			},
			{
				"id": 6,
				"label": "F"
			},
			{
				"id": 7,
				"label": "F#"
			},
			{
				"id": 8,
				"label": "G"
			},
			{
				"id": 9,
				"label": "G#"
			},
			{
				"id": 10,
				"label": "A"
			},
			{
				"id": 11,
				"label": "A#"
			},
			{
				"id": 12,
				"label": "B"
			}
		]
	};
	/* jshint ignore:end */
}