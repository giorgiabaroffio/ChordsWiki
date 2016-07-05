describe('chordsWiki.Wiki', function() {

	'use strict';

	var wiki, customWiki;
	var mainElement, eastDivElement, westDivElement, chordSelection, categorySelection;
	var customRootElement, customSourceData, customInstrument, customChordSelection, customCategorySelection, customWestArea;

	var CONST = {
		CSS: {
			EAST_AREA: 'chordsWiki_east_area',
			WEST_AREA: 'chordsWiki_west_area',
			DETAILS_ROW: 'chordsWiki_details_row'
		},
		CHORDS_LABEL: {
			C_CUSTOM: 'C_custom',
			D_CUSTOM: 'D_custom',
			MAJOR_CUSTOM: 'major_custom',
			MINOR_CUSTOM: 'minor_custom'
		}
	};

	beforeEach(function() {

		wiki = new chordsWiki.Wiki({});

		customRootElement = $('<div>');

		/* jshint ignore:start */
		customSourceData = getJSONFixture('customData.json');
		/* jshint ignore:end */

		customWiki = new chordsWiki.Wiki({
			dataSource: customSourceData
		});

	});

	it('is the function that I need to instantiate to display a chords wiki, bringing initial chords information', function() {
		expect(chordsWiki.Wiki).toBeDefined();
		expect($.isFunction(chordsWiki.Wiki)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(wiki.container).toEqual('div');
		});

		describe('contains: ', function() {

			beforeEach(function() {
				chordSelection = wiki.container.children('select')[0];
				categorySelection = wiki.container.children('select')[1];
			});

			it('two <select> child elements', function() {
				expect(wiki.container.find('> select').length).toEqual(2);
			});

			describe('the first <select> element: ', function() {

				it('has a placeholder label with empty value as first option', function() {
					expect($(chordSelection).children('option:first').val()).toEqual('');
				});
				it('has other 2 not empty options', function() {
					expect($(chordSelection).children('option:not(:first)').length).toEqual(2);
				});
			});

			describe('the second <select> element: ', function() {

				it('has a placeholder label with empty value as first option', function() {
					expect($(categorySelection).children('option:first').val()).toEqual('');
				});
				it('has other 2 not empty options', function() {
					expect($(categorySelection).children('option:not(:first)').length).toEqual(2);
				});

			});

		});

	});

	describe('optionally accepts dataSource as input parameters', function() {

		beforeEach(function() {
			customChordSelection = customWiki.container.children('select')[0];
			customCategorySelection = customWiki.container.children('select')[1];
		});

		describe('if the parameter sourceData is defined the selection fields are populated with custom data: ', function() {

			describe('the first <select> element: ', function() {

				it('has a placeholder label with empty value as first option', function() {
					expect($(customChordSelection).children('option:first').val()).toEqual('');
				});
				it('has an element with label ' + CONST.CHORDS_LABEL.C_CUSTOM + ' as second option', function() {
					expect($(customChordSelection).children()[1].label).toEqual(CONST.CHORDS_LABEL.C_CUSTOM);
				});
			});

			describe('the second <select> element: ', function() {

				it('has a placeholder label with empty value as first option', function() {
					expect($(customCategorySelection).children('option:first').val()).toEqual('');
				});
				it('has an element with label ' + CONST.CHORDS_LABEL.MAJOR_CUSTOM + ' as second option', function() {
					expect($(customCategorySelection).children()[1].label).toEqual(CONST.CHORDS_LABEL.MAJOR_CUSTOM);
				});
			});


		});

	});

});