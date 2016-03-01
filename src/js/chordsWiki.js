if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}

if (typeof(chordsWiki) === 'undefined') {
	var chordsWiki = {};
}

(function() {
	'use strict';

	chordsWiki.Main = function() {

		var CONST = {
			CSS: {
				EAST_AREA: 'east_area',
				WEST_AREA: 'west_area'
			},
			STRING: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details'
			}
		};

		var self = this;

		this.container = $('<div>');

		var chordSelect = $('<select>');

		var categorySelect = $('<select>');

		var init = function() {
			render();
			$('body').append(self.container);
		};

		var render = function() {

			//East area creation
			var eastContainer = $('<div>');
			eastContainer.addClass(CONST.CSS.EAST_AREA);
			var subtitleEast = $('<h2>');
			subtitleEast.text(CONST.STRING.SUBTITLE_EAST);
			eastContainer.append(subtitleEast);
			eastContainer.append(chordSelect);
			eastContainer.append(categorySelect);

			//West area creation
			var westContainer = $('<div>');
			westContainer.addClass(CONST.CSS.WEST_AREA);
			var subtitleWest = $('<h2>');
			subtitleWest.text(CONST.STRING.SUBTITLE_WEST);
			westContainer.append(subtitleWest);

			//Main content wrapper creation
			var mainContent = $('<main>');
			mainContent.append(eastContainer);
			mainContent.append(westContainer);

			//Append to container
			self.container.append(mainContent);

		};

		init();

	};

}());