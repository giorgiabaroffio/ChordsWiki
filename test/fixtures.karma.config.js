/*
	Karma prepend "base" to any loaded file:
	https://github.com/karma-runner/karma/issues/1607

	This requires a different configuration for fixtures compared to the HTML runner
 */
jasmine.getFixtures().fixturesPath = "base/test/fixtures";