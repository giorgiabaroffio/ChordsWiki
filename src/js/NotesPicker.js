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

		this.getSelectedNotes = function() {
			var options = notesList.find('input');
			var selectedOptions = $.grep(options, function( option, i ) {
				return ( option.checked === true );
			});
			return selectedOptions;
		};

		init();

	};

}());
