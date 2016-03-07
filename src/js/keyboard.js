if (typeof(chordsWiki.keyboard) === 'undefined') {
	/* jshint ignore:start */
	chordsWiki.keyboard = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';

	chordsWiki.keyboard.Main = function(params) {

		var CONST = {
			CSS: {

			},
			LABEL: {
				NOTES: 'Notes',
				KEYS: 'Keys'
			},
			SELECTOR: {
				WEST_AREA: '.west_area'
			}
		};

		var config = {
			rootElement: $(CONST.SELECTOR.WEST_AREA)
		};

		$.extend(config, params);

		this.container = $('<div>');

		/* jshint ignore:start */
		var instrumentChordsData = {
			"chord_instances": [
				{
					"chord_id": 0,
					"type_id": 0,
					"notes": [1,7,13]
				},
				{
					"chord_id": 0,
					"type_id": 1,
					"notes": [1,6,13]
				},
				{
					"chord_id": 1,
					"type_id": 0,
					"notes": [4,11,16]
				},
				{
					"chord_id": 1,
					"type_id": 1,
					"notes": [4,10,16]
				}

			],
			"notes": [
				{
					"id": 0,
					"label": "Cb",
					"key": 11
				},
				{
					"id": 1,
					"label": "C",
					"key": 0
				},
				{
					"id": 2,
					"label": "C#",
					"key": 1
				},
				{
					"id": 3,
					"label": "Db",
					"key": 1
				},
				{
					"id": 4,
					"label": "D",
					"key": 2
				},
				{
					"id": 5,
					"label": "D#",
					"key": 3
				},
				{
					"id": 6,
					"label": "Eb",
					"key": 3
				},
				{
					"id": 7,
					"label": "E",
					"key": 4
				},
				{
					"id": 8,
					"label": "E#",
					"key": 5
				},
				{
					"id": 9,
					"label": "Fb",
					"key": 4
				},
				{
					"id": 10,
					"label": "F",
					"key": 5
				},
				{
					"id": 11,
					"label": "F#",
					"key": 6
				},
				{
					"id": 12,
					"label": "Gb",
					"key": 6
				},
				{
					"id": 13,
					"label": "G",
					"key": 7
				},
				{
					"id": 14,
					"label": "G#",
					"key": 8
				},
				{
					"id": 15,
					"label": "Ab",
					"key": 8
				},
				{
					"id": 16,
					"label": "A",
					"key": 9
				},
				{
					"id": 17,
					"label": "A#",
					"key": 10
				},
				{
					"id": 18,
					"label": "Bb",
					"key": 10
				},
				{
					"id": 19,
					"label": "B",
					"key": 11
				},
				{
					"id": 20,
					"label": "B#",
					"key": 0
				}
			]
		};
		/* jshint ignore:end */

		var notesTextRow = null;

		var self = this;

		var init = function() {
			render();
			config.rootElement.append(self.container);
		};

		/**
		* Render the UI of the keyboard
		*/
		var render = function() {

		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for(var c in chordInstances){
				if(chordInstances[c].chord_id=== parseInt(chord) && chordInstances[c].type_id===parseInt(category)) {
					return chordInstances[c].notes;
				}
			}
			return false;
		};

		/**
		 * Get notes labels by ids
		 */
		var getNotesLabelByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var labels = [];
			for(var n in notes){
				if(noteIds.indexOf(notes[n].id)> -1) {
					labels.push(notes[n].label);
				}
			}
			return labels;
		};

		/**
		 * Get keys given the notes array
		 */
		var getNotesKeysByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var keys = [];
			for(var n in notes){
				if(noteIds.indexOf(notes[n].id)> -1) {
					keys.push(notes[n].key);
				}
			}
			return keys;
		};

		/**
		 * Display notes on keyboard
		 */
		this.displayNotes = function(chord, category){
			var notes = notesLookup(chord, category);
			var notesLabels = getNotesLabelByIds(notes);
			var keys = getNotesKeysByIds(notes);
			if (notesTextRow === null) {
				notesTextRow = $('<span>');
			}
			self.container.empty().text(CONST.LABEL.NOTES + ' ' + notesLabels.join() + ' ' + CONST.LABEL.KEYS + ' ' + keys.join());

		};

		/**
		 * Clean notes on keyboard
		 */
		this.cleanNotes = function(){
			self.container.empty();
		};

		init();

	};

}());