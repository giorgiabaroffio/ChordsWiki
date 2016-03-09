describe('chordsWiki.Wiki', function() {

	'use strict';

	var wiki, uiContainer;

	var CONST = {
		CSS: {
			EAST_AREA: 'east_area',
			WEST_AREA: 'west_area',
			DETAILS_ROW: 'details_row'
		}
	};

	beforeEach(function() {
		uiContainer = $('<div>');
		wiki = new chordsWiki.Wiki({
			rootElement: uiContainer
		});
	});

	it('is the function that I need to instantiate to display a new chords wiki', function() {
		expect(chordsWiki.Wiki).toBeDefined();
		expect($.isFunction(chordsWiki.Wiki)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(wiki.container).toEqual('div');
		});

		describe('contains: ', function() {

			it('a <main> child element', function() {
				expect(wiki.container.find('> main').length).toEqual(1);
			});

			describe('contains: ', function() {

				it('two <div> child elements', function() {
					expect(wiki.container.children('main:first').find('> div').length).toEqual(2);
				});

				describe('the first <div> element: ', function() {

					it('has css class ' + CONST.CSS.EAST_AREA, function() {
						expect(wiki.container.children('main:first').children('div:nth-child(1)').hasClass(CONST.CSS.EAST_AREA)).toEqual(true);
					});

					describe('contains: ', function() {

						it('one header <h2> element', function() {
							expect(wiki.container.children('main:first').children('div:nth-child(1)').find('> h2').length).toEqual(1);
						});

						it('two <select> child elements', function() {
							expect(wiki.container.children('main:first').children('div:nth-child(1)').find('> select').length).toEqual(2);
						});

					});
				});

				describe('the second <div> element: ', function() {

					it('has css class ' + CONST.CSS.WEST_AREA, function() {
						expect(wiki.container.children('main:first').children('div:nth-child(2)').hasClass(CONST.CSS.WEST_AREA)).toEqual(true);
					});

					describe('contains: ', function() {

						it('one header <h2> element', function() {
							expect(wiki.container.children('main:first').children('div:nth-child(2)').find('> h2').length).toEqual(1);
						});

					});
				});
			});
		});

	});

});

