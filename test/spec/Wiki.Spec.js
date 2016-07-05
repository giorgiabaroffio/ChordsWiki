describe('chordsWiki.Wiki', function() {

	'use strict';

	var wiki, customWiki;
	var chordSelection, categorySelection;
	var customRootElement, customSourceData, customChordSelection, customCategorySelection;

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
		},
		EVENT: {
			SELECTION_CHANGED : 'selectionChanged',
			SELECTION_RESET : 'selectionReset'
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

	describe('.getSelectedChord', function() {

		beforeEach(function(){
			chordSelection = wiki.container.children('select')[0];
			categorySelection = wiki.container.children('select')[1];
		});

		describe('retrieves the current value of the two selection fields, which is', function(){
			it('null if one of the selections is not valid', function() {
				var chordTypeId = '0';
				var chordCategoryId = '';
				$(chordSelection).val(chordTypeId);
				$(categorySelection).val(chordCategoryId);
				expect(wiki.getSelectedChord()).toEqual(null);
			});
			it('a chordsWiki.WikiManager.Chord object, composed of a chord and a category attribute with the selected chord information', function() {
				var chordTypeId = '0';
				var chordCategoryId = '0';
				$(chordSelection).val(chordTypeId);
				$(categorySelection).val(chordCategoryId);
				expect(wiki.getSelectedChord()).toEqual({chord: '0', category: '0'});
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

	describe('when at least one of the selection fields change', function(){
		beforeEach(function(){
			spyOn(wiki, 'notifyObservers');
			chordSelection = wiki.container.children('select')[0];
			categorySelection = wiki.container.children('select')[1];
		});

		describe('if the selection fields are both valid:', function(){

			var chordTypeId = '0';
			var chordCategoryId = '0';

			beforeEach(function(){
				$(chordSelection).val(chordTypeId);
				$(categorySelection).val(chordCategoryId);
				$(chordSelection).trigger('change');
			});

			it('the Wiki notifies to the WikiManager the ' + CONST.EVENT.SELECTION_CHANGED + ' event', function(){
				expect(wiki.notifyObservers).toHaveBeenCalled();
				expect(wiki.notifyObservers.calls.argsFor(0)[0]).toEqual(CONST.EVENT.SELECTION_CHANGED);
			});

			it('the Wiki sends to the WikiManager data about the selected chord: chord type and chord category', function(){
				var expectedData = {
					chord: chordTypeId,
					category: chordCategoryId
				};

				expect(wiki.notifyObservers.calls.argsFor(0)[1]).toEqual(expectedData);
			});
		});

		describe('if one of the selection fields is not valid:', function(){

			var chordTypeId = '0';

			beforeEach(function(){
				$(chordSelection).val(chordTypeId);
				$(chordSelection).trigger('change');
			});

			it('the Wiki notifies to the WikiManager the ' + CONST.EVENT.SELECTION_RESET + ' event', function(){
				expect(wiki.notifyObservers).toHaveBeenCalled();
				expect(wiki.notifyObservers.calls.argsFor(0)[0]).toEqual(CONST.EVENT.SELECTION_RESET);
			});
		});
	});

});