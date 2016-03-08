describe('chordsWiki.Wiki', function () {

    'use strict';

    var wiki,
        uiContainer;

    beforeEach(function () {
        uiContainer = $('<div>');
        wiki = new chordsWiki.Wiki({
            rootElement: uiContainer
        });
    });

    it('is the function that I need to instantiate to display a new chords wiki', function () {
        expect(chordsWiki.Wiki).toBeDefined();
        expect($.isFunction(chordsWiki.Wiki)).toBeTruthy();
    });



});