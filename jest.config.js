const paths = require('./scripts/config/paths');
module.exports = {
	verbose: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,mjs}'],
	setupFiles: [
		'<rootDir>/node_modules/regenerator-runtime/runtime',
		'<rootDir>/scripts/config/polyfills.js'
	],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/scripts/config/jest/setup.js'],
	testMatch: [
		'<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}',
	],
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: [
		// All type definitions to be excluded
		'!*.d.ts',
		// All Ignore files should be covered by E2E Tests to get maximum coverage.
		'<rootDir>/node_modules',
        // Ignore Demo folder
        '<rootDir>/src/demo',
        // Ignore E2E Folder
        '<rootDir>/src/__e2e__',
		'<rootDir>/src/generated'
	],
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.(js|jsx|mjs)$': ['babel-jest', { configFile: paths.babelConfig }],
		'\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.css$': '<rootDir>/scripts/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|css|json)$)':
			'<rootDir>/scripts/config/jest/fileTransform.js'
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$'
	],
	moduleDirectories: paths.resolveModules,
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs']
};