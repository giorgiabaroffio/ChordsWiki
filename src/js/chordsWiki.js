if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}

if (typeof(chordsWiki) === 'undefined') {
	var chordsWiki = {};
}

(function() {
	'use strict';

	chordsWiki.Main = function() {

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
			eastContainer.addClass('east_area');
			var subtitleEast = $('<h2>');
			subtitleEast.text('Chord selection');
			eastContainer.append(subtitleEast);
			eastContainer.append(chordSelect);
			eastContainer.append(categorySelect);

			//West area creation
			var westContainer = $('<div>');
			westContainer.addClass('west_area');
			var subtitleWest = $('<h2>');
			subtitleWest.text('Chord details');
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