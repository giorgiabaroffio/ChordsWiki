if (typeof(chordsWiki.Keyboard) === 'undefined') {
	/* jshint ignore:start */
	chordsWiki.Keyboard = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';
	/**
	 * Constructor of the Keyboard instrument
	 * @constructor
	 */
	chordsWiki.Keyboard = function(params) {

		var CONST = {
			CSS: {
				KEYBOARD: 'chordsWiki_keyboard',
				WHITE_KEY: 'chordsWiki_key',
				BLACK_KEY: 'chordsWiki_black_key',
				PRESSED_KEY: 'chordsWiki_pressed_key'
			},
			LABEL: {
				NOTES: 'Notes',
				KEYS: 'Keys'
			},
			SELECTOR: {
				WHITE_KEY: '.chordsWiki_key',
				BLACK_KEY: '.chordsWiki_black_key'
			},
			ATTRIBUTE: {
				KEY: 'data-key'
			}
		};

		var config = {

		};

		$.extend(config, params);

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
		 * Create the key object
		 * @param {boolean} addBlackKey - Flag to define the type of keyboard key (with black key following or not).
		 * @param {string} whiteKeyId - The key attribute unequivocally identifying the white key
		 * @param {string} blackKeyId - The key attribute unequivocally identifying the black key
		 * @returns {Object} whiteKey - The keyboard key html object generated
		 */
		var createWhiteKey = function(addBlackKey, whiteKeyId, blackKeyId) {
			var whiteKey = $('<div>');
			whiteKey.addClass(CONST.CSS.WHITE_KEY);
			whiteKey.attr(CONST.ATTRIBUTE.KEY, whiteKeyId);
			if (addBlackKey === true) {
				var blackKey = $('<div>');
				blackKey.addClass(CONST.CSS.BLACK_KEY);
				blackKey.attr(CONST.ATTRIBUTE.KEY, blackKeyId);
				whiteKey.append(blackKey);
			}
			return whiteKey;
		};

		/**
		 * Render the UI of the keyboard
		 */
		var render = function() {
			var keyboardContainer = $('<div>');
			keyboardContainer.addClass(CONST.CSS.KEYBOARD);

			keyboardContainer.append(createWhiteKey(true,0,1));
			keyboardContainer.append(createWhiteKey(true,2,3));
			keyboardContainer.append(createWhiteKey(false,4));
			keyboardContainer.append(createWhiteKey(true,5,6));
			keyboardContainer.append(createWhiteKey(true,7,8));
			keyboardContainer.append(createWhiteKey(true,9,10));
			keyboardContainer.append(createWhiteKey(false,11));
			
			return keyboardContainer;

		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 * @returns {boolean|string[]}
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for (var c in chordInstances) {
				if (chordInstances[c].chord_id === parseInt(chord) && chordInstances[c].type_id === parseInt(category)) {
					return chordInstances[c].notes;
				}
			}
			return false;
		};

		/**
		 * Get notes labels by ids
		 * @param {string[]} noteIds - The array containing the list of notes ids
		 * @returns {string[]}
		 */
		var getNotesLabelByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var labels = [];
			for (var n in notes) {
				if (noteIds.indexOf(notes[n].id) > -1) {
					labels.push(notes[n].label);
				}
			}
			return labels;
		};

		/**
		 * Get keys ids given the notes array
		 * @param {string[]} noteIds - The array containing the list of notes ids
		 * @returns {string[]}
		 */
		var getNotesKeysByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var keys = [];
			for (var n in notes) {
				if (noteIds.indexOf(notes[n].id) > -1) {
					keys.push(notes[n].key);
				}
			}
			return keys;
		};

		/**
		 * Display notes on keyboard
		 * @param {string[]} keys - The array containing the list of keys ids
		 */
		var colorKeys = function(keys){
			for(var k in keys){
				$( '['+CONST.ATTRIBUTE.KEY+'= "'+keys[k]+'"]').addClass(CONST.CSS.PRESSED_KEY);
			}
		};

		/**
		 * Clean notes on keyboard
		 */
		var cleanKeys = function(){
			$(CONST.SELECTOR.BLACK_KEY).removeClass(CONST.CSS.PRESSED_KEY);
			$(CONST.SELECTOR.WHITE_KEY).removeClass(CONST.CSS.PRESSED_KEY);
		};


		/**
		 * Display notes details
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 */
		this.displayNotes = function(chord, category) {
			var notes = notesLookup(chord, category);
			var notesLabels = getNotesLabelByIds(notes);
			var keys = getNotesKeysByIds(notes);
			if (notesTextRow === null) {
				notesTextRow = $('<span>');
				self.container.append(notesTextRow);
			}
			notesTextRow.empty().text(CONST.LABEL.NOTES + ' ' + notesLabels.join() + ' ' + CONST.LABEL.KEYS + ' ' + keys.join());
			cleanKeys();
			colorKeys(keys);
		};

		/**
		 * Clean notes details
		 */
		this.cleanNotes = function() {
			if (notesTextRow !== null) {
				notesTextRow.empty();
			}
			cleanKeys();
		};

		init();

	};

}());