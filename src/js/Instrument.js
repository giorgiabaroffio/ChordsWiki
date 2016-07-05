(function() {
	'use strict';
	/**
	 * Constructor of the Instrument object
	 * @constructor
	 */
	chordsWiki.Instrument = function(params) {

		var CONST = {
			LABEL: {
				NOTES: 'Notes',
			},
			ERROR: {
				CHORD_NOT_FOUND: 'Chord not found'
			}
		};

		this.container = $('<div>');

		/* jshint ignore:start */
		var instrumentChordsData = {
			"chord_instances": [{
				"chord_id": 0,
				"type_id": 0,
				"notes": [1, 7, 13]
			}, {
				"chord_id": 0,
				"type_id": 1,
				"notes": [1, 6, 13]
			}, {
				"chord_id": 1,
				"type_id": 0,
				"notes": [4, 11, 16]
			}, {
				"chord_id": 1,
				"type_id": 1,
				"notes": [4, 10, 16]
			}

			],
			"notes": [{
				"id": 0,
				"label": "Cb",
				"key": 11
			}, {
				"id": 1,
				"label": "C",
				"key": 0
			}, {
				"id": 2,
				"label": "C#",
				"key": 1
			}, {
				"id": 3,
				"label": "Db",
				"key": 1
			}, {
				"id": 4,
				"label": "D",
				"key": 2
			}, {
				"id": 5,
				"label": "D#",
				"key": 3
			}, {
				"id": 6,
				"label": "Eb",
				"key": 3
			}, {
				"id": 7,
				"label": "E",
				"key": 4
			}, {
				"id": 8,
				"label": "E#",
				"key": 5
			}, {
				"id": 9,
				"label": "Fb",
				"key": 4
			}, {
				"id": 10,
				"label": "F",
				"key": 5
			}, {
				"id": 11,
				"label": "F#",
				"key": 6
			}, {
				"id": 12,
				"label": "Gb",
				"key": 6
			}, {
				"id": 13,
				"label": "G",
				"key": 7
			}, {
				"id": 14,
				"label": "G#",
				"key": 8
			}, {
				"id": 15,
				"label": "Ab",
				"key": 8
			}, {
				"id": 16,
				"label": "A",
				"key": 9
			}, {
				"id": 17,
				"label": "A#",
				"key": 10
			}, {
				"id": 18,
				"label": "Bb",
				"key": 10
			}, {
				"id": 19,
				"label": "B",
				"key": 11
			}, {
				"id": 20,
				"label": "B#",
				"key": 0
			}]
		};
		/* jshint ignore:end */

		var notesTextRow = null;

		var self = this;

		var init = function() {
			self.container.append(render());
		};

		/**
		 * Render the UI of the instrument
		 */
		var render = function() {
			var instrumentContainer = $('<div>');
			return instrumentContainer;
		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 * @returns {string[]}
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for (var i = 0; i < chordInstances.length; i++) {
				if (chordInstances[i].chord_id === parseInt(chord) && chordInstances[i].type_id === parseInt(category)) {
					return chordInstances[i].notes;
				}
			}
			return [];
		};

		/**
		 * Get notes property given the array of notes ids and the name of the property
		 * @param {string[]} noteIds - The array containing the list of notes ids
		 * @returns {string[]}
		 */
		var getNotesProperty = function(noteIds, prop) {
			var notes = instrumentChordsData.notes;
			var properties = [];
			for (var n in notes) {
				if (noteIds.indexOf(notes[n].id) > -1) {
					properties.push(notes[n][prop]);
				}
			}
			return properties;
		};

		/**
		 * Display textual details about the selected chord
		 * @param {string[]} notes - The array containing the list of notes ids
		 */
		var displayTextualDetails = function(notes){
			var notesLabels = getNotesProperty(notes, 'label');
			if (notesTextRow === null) {
				notesTextRow = $('<span>');
				self.container.append(notesTextRow);
			}
			notesTextRow.text(CONST.LABEL.NOTES + ' ' + notesLabels.join());
		};

		/**
		 * Clean chord textual details
		 */
		var cleanTextualDetails = function(){
			if (notesTextRow !== null) {
				notesTextRow.empty();
			}
		};

		/**
		 * Display chord details
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 */
		this.displayChordDetails = function(chord, category) {

			//retrieve chord details
			var notes = notesLookup(chord, category);
			if(notes.length===0){
				throw new Error(CONST.ERROR.CHORD_NOT_FOUND);
			}

			//display chord textual details
			displayTextualDetails(notes);

		};

		/**
		 * Clean chord details
		 */
		this.cleanChordDetails = function() {
			cleanTextualDetails();
		};

		init();

	};

}());
