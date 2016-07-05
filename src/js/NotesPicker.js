/**
 * Note data type, composed of a unique identifier and a label
 *
 * @typedef {Object} chordsWiki.NotesPicker.Note
 * @property {number} id - The id of the note
 * @property {String} label - The label with the name of the note
 */

(function() {
	'use strict';
	/**
	 * Constructor of the NotesPicker widget, a UI with a list of notes that can be selected to compose a chord
	 * @param {Object} params.dataSource - data with the list of chords types and categories
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
			notesList = initializeNotesCheckboxList();
			render();
			populateNotesCheckboxList(config.dataSource.notes, notesList);
		};

		/**
		 * Render the UI
		 */
		var render = function() {
			self.container.append(notesList);
		};

		/**
		 * Initialize the list of notes creating the html list container
		 */
		var initializeNotesCheckboxList = function() {
			notesList = $('<ul>');
			return notesList;
		};

		/**
		 * Populate the list of notes appending the options to the list
		 * @param {chordsWiki.NotesPicker.Note[]} dataArray - the array of notes
		 * @param {jQuery} list - the jQuery wrapper of the html list container
		 */
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

		/**
		 * Get the notes currently selected
		 * @returns {String[]} notes - the list of ids of the selected notes
		 */
		this.getSelectedNotes = function() {
			var options = notesList.find('input');
			var notes = [];
			for (var i = 0; i < options.length; i++) {
				if(options[i].checked === true){
					notes.push(options[i].value);
				}
			}

			return notes;
		};

		init();

	};

}());
