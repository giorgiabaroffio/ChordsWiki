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

(function() {
	'use strict';

	/**
	 * Make a class inherit from another. The child will inherit all the methods of the parent.
	 * @param {*} context The object that will be used as "this"
	 * @param {function} parent The parent's constructor
	 * @param {...*} args The optional arguments for the parent constructor
	 */
	chordsWiki.superClass = function(context, parent, args) {
		parent.apply(context, args || []);
	};


})();
/**
 * Data broadcast by the Wiki, after both selection fields change and valid values are selected
 *
 * @typedef {Object} chordsWiki.WikiManager.Chord
 * @property {number} chord - The id of the selected chord
 * @property {number} category - The id of the selected category
 */

(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki widget
	 * @param {jQuery} params.rootElement - the jQuery container for the chords wiki widget
	 * @param {Object} params.dataSource - data with the list of chords types and categories
	 * @param {Object} params.instrument - the instrument widget that needs to communicate with the Wiki object
	 * @constructor
	 * @listens selectionChanged
	 * @listens selectionReset
	 */
	chordsWiki.WikiManager = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area'
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details'
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area'
			}
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData,
			instrument: new chordsWiki.Instrument()
		};

		$.extend(config, params);

		this.container = $('<div>');

		var eastContainer = null;
		var westContainer = null;

		/**
		 * @type {chordsWiki.Wiki}
		 */
		var wiki = null;
		var instrument = null;

		var self = this;

		var init = function() {
			render();
			initWiki();
			instrument = config.instrument;
			appendSubElements();
			config.rootElement.append(self.container);
		};

		/**
		 * Instantiate and initialize the Wiki object. Listen to its events.
		 */
		var initWiki = function() {
			wiki = new chordsWiki.Wiki({
				dataSource: chordsWiki.chordsData
			});
			wiki.addObserver(self);
		};

		/**
		 * Render the UI
		 */
		var render = function() {

			var mainContent = $('<main>');

			mainContent.append(renderEast());
			mainContent.append(renderWest());

			self.container.append(mainContent);

		};

		/**
		 * Render the east area of the UI
		 * @returns {jQuery} eastContainer - the jQuery wrapper of the html element containing the east area of the widget
		 */
		var renderEast = function() {

			eastContainer = $('<div>');
			eastContainer.addClass(CONST.CSS.EAST_AREA);
			var subtitleEast = $('<h2>');
			subtitleEast.text(CONST.LABEL.SUBTITLE_EAST);
			eastContainer.append(subtitleEast);
			return eastContainer;

		};

		/**
		 * Render the west area of the UI
		 * @returns {jQuery} westContainer - the jQuery wrapper of the html element containing the west area of the widget
		 */
		var renderWest = function() {

			westContainer = $('<div>');
			westContainer.addClass(CONST.CSS.WEST_AREA);
			var subtitleWest = $('<h2>');
			subtitleWest.text(CONST.LABEL.SUBTITLE_WEST);
			westContainer.append(subtitleWest);
			return westContainer;

		};

		/**
		 * Append to the east and west container respectively the wiki element and the instrument element
		 */
		var appendSubElements = function() {

			//append the wiki
			eastContainer.append(wiki.container);

			//append the instrument
			westContainer.append(instrument.container);

		};

		init();

		/* NOTIFICATION HANDLERS */

		/**
		 * Listen to the "selectionChanged" event notifications broadcast by the Wiki
		 * @param {chordsWiki.WikiManager.Chord} data
		 */
		this.onSelectionChangedHandler = function(data){
			instrument.displayChordDetails(data.chord, data.category);
		};

		/**
		 * Listen to the "selectionReset" event notifications broadcast by the Wiki
		 */
		this.onSelectionResetHandler = function(data){
			instrument.cleanChordDetails();
		};

	};

}());

(function() {
	'use strict';
	/**
	 * Constructor of the chords editor
	 * @param {Object} params.dataSource - data with the list of chords types and categories
	 * @constructor
	 */
	chordsWiki.ChordsEditor = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area'
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Notes Selection'
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area'
			}
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');
		var eastContainer = null;
		var westContainer = null;

		var wiki = null;
		var notesPicker = null;


		var init = function() {
			render();
			initWiki();
			initNotesPicker();
			appendSubElements();
			config.rootElement.append(self.container);
		};

		/**
		 * Instantiate and initialize the Wiki object.
		 */
		var initWiki = function() {
			wiki = new chordsWiki.Wiki({
				dataSource: chordsWiki.chordsData
			});
		};

		/**
		 * Instantiate and initialize the Wiki object.
		 */
		var initNotesPicker = function() {
			notesPicker = new chordsWiki.NotesPicker({
				dataSource: chordsWiki.chordsData
			});
		};

		/**
		 * Render the UI
		 */
		var render = function() {

			var mainContent = $('<main>');

			mainContent.append(renderEast());
			mainContent.append(renderWest());

			self.container.append(mainContent);

		};

		/**
		 * Render the east area of the UI
		 * @returns {jQuery} eastContainer - the jQuery wrapper of the html element containing the east area of the widget
		 */
		var renderEast = function() {

			eastContainer = $('<div>');
			eastContainer.addClass(CONST.CSS.EAST_AREA);
			var subtitleEast = $('<h2>');
			subtitleEast.text(CONST.LABEL.SUBTITLE_EAST);
			eastContainer.append(subtitleEast);
			return eastContainer;

		};

		/**
		 * Render the west area of the UI
		 * @returns {jQuery} westContainer - the jQuery wrapper of the html element containing the west area of the widget
		 */
		var renderWest = function() {

			westContainer = $('<div>');
			westContainer.addClass(CONST.CSS.WEST_AREA);
			var subtitleWest = $('<h2>');
			subtitleWest.text(CONST.LABEL.SUBTITLE_WEST);
			westContainer.append(subtitleWest);
			return westContainer;

		};

		/**
		 * Append to the east and west container the subelements composing the editor
		 */
		var appendSubElements = function() {
			//append the wiki
			eastContainer.append(wiki.container);

			//append the notes picker
			westContainer.append(notesPicker.container);

		};

		init();

	};

}());

(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki
	 * @param {Object} params.dataSource - data with the list of chords types and categories
	 * @constructor
	 * @extend luga.Notifier
	 * @fires selectionChanged
	 * @fires selectionReset
	 */
	chordsWiki.Wiki = function(params) {

		luga.extend(luga.Notifier, this);

		var CONST = {
			LABEL: {
				PLEASE_SELECT_CHORD: 'Please select a chord',
				PLEASE_SELECT_CATEGORY: 'Please select a category'
			},
			EVENT: {
				SELECTION_CHANGED : 'selectionChanged',
				SELECTION_RESET : 'selectionReset'
			},
			TEMPLATE_SELECTOR: {
				CHORD_TYPES: '#chordsTypes',
				CHORD_CATEGORIES: '#chordsCategories'
			}
		};

		var config = {
			dataSource: chordsWiki.chordsData
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var chordSelect = null;
		var categorySelect = null;

		var init = function() {
			chordSelect = initializeSelect(chordSelect, CONST.LABEL.PLEASE_SELECT_CHORD);
			categorySelect = initializeSelect(categorySelect, CONST.LABEL.PLEASE_SELECT_CATEGORY);
			render();
			loadData();
			attachEvents();
		};

		/**
		 * Initialize select field
		 * @param {Object} select - The selection field object.
		 * @param {string} placeholder - The placeholder for the selection field.
		 * @returns {jQuery} select - The initialized selection field jQuery object
		 */
		var initializeSelect = function(select, placeholder) {

			select = $('<select>');
			var option = $('<option>');
			option.text(placeholder);
			option.val('');
			select.append(option);
			return select;

		};

		/**
		 * Render the UI
		 */
		var render = function() {

			//Append the selection fields to the container
			self.container.append(chordSelect);
			self.container.append(categorySelect);

		};

		/**
		 * Load data via chordsData object (default option) or via an external json object
		 */
		var loadData = function() {
			var data = config.dataSource;
			populateSelect(data, chordSelect, $(CONST.TEMPLATE_SELECTOR.CHORD_TYPES).html());
			populateSelect(data, categorySelect, $(CONST.TEMPLATE_SELECTOR.CHORD_CATEGORIES).html());
		};

		/**
		 * Populate select field given the data array and the select object
		 * @param {Object} data - the object containing data to be parsed.
		 * @param {jQuery} selectObj - the selection field to be populated.
		 * @param {Object} templateScript - the Handlebars template script.
		 */
		var populateSelect = function(data, selectObj, templateScript) {
			var template = Handlebars.compile (templateScript);
			selectObj.append(template(data));
		};

		var handleOnSelectionChange = function() {
			if (isSelectionValid()) {
				try {
					self.notifyObservers(CONST.EVENT.SELECTION_CHANGED, { chord: chordSelect.val(), category: categorySelect.val()});
				}catch(err){
					console.log(err);
				}
			}
			else{
				self.notifyObservers(CONST.EVENT.SELECTION_RESET, {});
			}
		};

		/**
		 * Attach events to UI elements
		 */
		var attachEvents = function() {
			chordSelect.change(handleOnSelectionChange);
			categorySelect.change(handleOnSelectionChange);
		};

		/**
		 * Check if the selected option is valid (is not the placeholder)
		 */
		var isSelectionValid = function() {
			return (chordSelect.val() !== '' && categorySelect.val() !== '');
		};

		init();

	};

}());
/* jshint camelcase: false, quotmark: double */

if (typeof(chordsWiki.chordsData) === "undefined") {

	chordsWiki.chordsData = {
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
			"label": "Cb"
		},
		{
			"id": 1,
			"label": "C"
		},
		{
			"id": 2,
			"label": "C#"
		},
		{
			"id": 3,
			"label": "Db"
		},
		{
			"id": 4,
			"label": "D"
		},
		{
			"id": 5,
			"label": "D#"
		},
		{
			"id": 6,
			"label": "Eb"
		},
		{
			"id": 7,
			"label": "E"
		},
		{
			"id": 8,
			"label": "E#"
		},
		{
			"id": 9,
			"label": "Fb"
		},
		{
			"id": 10,
			"label": "F"
		},
		{
			"id": 11,
			"label": "F#"
		},
		{
			"id": 12,
			"label": "Gb"
		},
		{
			"id": 13,
			"label": "G"
		},
		{
			"id": 14,
			"label": "G#"
		},
		{
			"id": 15,
			"label": "Ab"
		},
		{
			"id": 16,
			"label": "A"
		},
		{
			"id": 17,
			"label": "A#"
		},
		{
			"id": 18,
			"label": "Bb"
		},
		{
			"id": 19,
			"label": "B"
		},
		{
			"id": 20,
			"label": "B#"
		}]
	};

}
(function() {
	'use strict';
	/**
	 * Constructor of the NotesPicker widget
	 * @constructor
	 */
	chordsWiki.NotesPicker = function(params) {

		var CONST = {
			DOM: {
				INPUT_TYPE: 'checkbox',
				INPUT_NAME: 'note'
			}
		};

		var config = {
			dataSource: chordsWiki.chordsData
		};

		$.extend(config, params);

		var self = this;

		var notesList = null;

		this.container = $('<div>');

		var init = function() {
			notesList = initializeNotesCheckboxList(notesList);
			render();
			populateNotesCheckboxList(config.dataSource.notes, notesList);
		};

		/**
		 * Render the UI
		 */
		var render = function() {
			self.container.append(notesList);
		};

		var initializeNotesCheckboxList = function(notesList) {
			notesList = $('<ul>');
			return notesList;
		};

		var populateNotesCheckboxList = function(dataArray, list) {
			for (var i = 0; i < dataArray.length; i++) {
				var record = dataArray[i];
				var listEntry = $('<li>');
				var checkboxElement = $('<input />', { type: CONST.DOM.INPUT_TYPE, name: CONST.DOM.INPUT_NAME, value: record.id });
				listEntry.append(checkboxElement);
				listEntry.append(record.label);
				list.append(listEntry);
			}
		};

		init();

	};

}());

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
				throw CONST.ERROR.CHORD_NOT_FOUND;
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

(function() {
	'use strict';
	/**
	 * Constructor of the Keyboard instrument
	 * @constructor
	 * @extend chordsWiki.Instrument
	 */
	chordsWiki.Keyboard = function(params) {

		chordsWiki.superClass(this, chordsWiki.Instrument, arguments);

		var CONST = {
			CSS: {
				KEYBOARD: 'chordsWiki_keyboard',
				WHITE_KEY: 'chordsWiki_white_key',
				BLACK_KEY: 'chordsWiki_black_key',
				PRESSED_KEY: 'chordsWiki_pressed_key',
				KEYBOARD_CONTAINER: 'chordsWiki_keyboard_container'
			},
			LABEL: {
				NOTES: 'Notes',
				KEYS: 'Keys'
			},
			SELECTOR: {
				WHITE_KEY: '.chordsWiki_white_key',
				BLACK_KEY: '.chordsWiki_black_key'
			},
			ATTRIBUTE: {
				KEY: 'data-key'
			},
			ERROR: {
				CHORD_NOT_FOUND: 'Chord not found'
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
		 * @returns {jQuery} whiteKey - The keyboard key jQuery object generated
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
			keyboardContainer.addClass(CONST.CSS.KEYBOARD_CONTAINER);
			var keyboardInstrument = $('<div>');
			keyboardInstrument.addClass(CONST.CSS.KEYBOARD);

			keyboardInstrument.append(createWhiteKey(true,0,1));
			keyboardInstrument.append(createWhiteKey(true,2,3));
			keyboardInstrument.append(createWhiteKey(false,4));
			keyboardInstrument.append(createWhiteKey(true,5,6));
			keyboardInstrument.append(createWhiteKey(true,7,8));
			keyboardInstrument.append(createWhiteKey(true,9,10));
			keyboardInstrument.append(createWhiteKey(false,11));

			keyboardContainer.append(keyboardInstrument);
			return keyboardContainer;

		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 * @returns {string[]}
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for (var c in chordInstances) {
				if (chordInstances[c].chord_id === parseInt(chord) && chordInstances[c].type_id === parseInt(category)) {
					return chordInstances[c].notes;
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
			notesTextRow.text(CONST.LABEL.NOTES + ' ' + notesLabels.join() + ' ' + CONST.LABEL.KEYS + ' ' + notesLabels.join());
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
		 * Display notes on keyboard
		 * @param {string[]} notes - The array containing the list of notes ids
		 */
		var colorKeys = function(notes){
			var keys = getNotesProperty(notes, 'key');
			for(var k in keys){
				self.container.find( '['+CONST.ATTRIBUTE.KEY+'= "'+keys[k]+'"]').addClass(CONST.CSS.PRESSED_KEY);
			}
		};

		/**
		 * Clean notes on keyboard
		 */
		var cleanKeys = function(){
			self.container.find(CONST.SELECTOR.BLACK_KEY).removeClass(CONST.CSS.PRESSED_KEY);
			self.container.find(CONST.SELECTOR.WHITE_KEY).removeClass(CONST.CSS.PRESSED_KEY);
		};


		/**
		 * Display chord details
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 */
		this.displayChordDetails = function(chord, category) {
			//clean notes details
			self.cleanChordDetails();

			//retrieve chord details
			var notes = notesLookup(chord, category);
			if(notes.length===0){
				throw CONST.ERROR.CHORD_NOT_FOUND;
			}

			//display chord textual details (notes, keys)
			displayTextualDetails(notes);

			//display notes on keyboard, coloring keys
			colorKeys(notes);
		};

		/**
		 * Clean chord details
		 */
		this.cleanChordDetails = function() {
			cleanTextualDetails();
			cleanKeys();
		};

		init();

	};

}());