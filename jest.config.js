const paths = require('./scripts/config/paths');
module.exports = {
	verbose: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,mjs}'],
	setupFiles: [
		'<rootDir>/node_modules/regenerator-runtime/runtime',
		'<rootDir>/scripts/config/polyfills.js'
	],
	moduleNameMapper: {
		"^@root(.*)$": "<rootDir>/src/types$1",
        "^@utils(.*)$": "<rootDir>/src/helpers/utils$1",
        "^@config(.*)$": "<rootDir>/src/config$1",
        "^@helpers(.*)$": "<rootDir>/src/helpers$1",
        "^@universal-schema(.*)$": "<rootDir>/src/universal-schema$1",
        "^@cross-framework-wrapper(.*)$": "<rootDir>/src/cross-framework-wrapper$1",
        "^@generated(.*)$": "<rootDir>/src/framework/generated$1",
        "^@framework(.*)$": "<rootDir>/src/framework$1",
	},
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/scripts/config/jest/setup.js'],
	testMatch: [
		'<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}',
	],
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: [
		// All type definitions to be excluded
		'!*.d.ts',
		'!*.type.ts',
		// Ingore Mobile files - will be covered seperately
		'!*.native.ts',
		'!*.native.tsx',
		// All Ignore files should be covered by E2E Tests to get maximum coverage.
		'<rootDir>/node_modules',
        // Ignore Demo folder
        '<rootDir>/src/demo',
        // Ignore E2E Folder
        '<rootDir>/src/__e2e__',
		'<rootDir>/src/generated',
		// Ignore Compiled folders
		'<rootDir>/src/index.ts',
		'<rootDir>/src/fields/components/(Checkbox|CreatableSelect|Input|EmptyDiv|MaterialSelect|RadioGroup|ReactSelect|RichTextEditor)/dist',
		'<rootDir>/src/parsers/(enum-utils|parse-values)/dist',
		'<rootDir>/src/fields/interceptors/(translate-currency|translate-range-date|translate-ratings)/dist',
	],
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.(js|jsx|mjs)$': ['babel-jest', { configFile: paths.babelConfig }],
		'\\.(ts|tsx)$': [
		      'ts-jest',
		      {
			useESM: true,
		      },
		],
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
