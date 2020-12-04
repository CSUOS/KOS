module.exports = {
	parser: 'babel-eslint',
	'env': {
		'commonjs': true,
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'airbnb-base',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 12,
		'sourceType': 'module',
	},
	'rules': {
		'indent': [
			'error',
			'tab',
		],
		'linebreak-style': ['error', 'windows'],
		'no-unused-vars': 'warn',
		'no-use-before-define': 1,
		'no-console': 0,
		'camelcase': ['error', { 'properties': 'always' }],
		'no-tabs': 0, // tab 사용 안되는 rule
		'quote-props': 0, // property에 quote를 씌우지 말아야하는 rule
		'operator-linebreak': 0, // 연산자는 라인 앞쪽에 위치해야하는 rule
		'comma-dangle': 0, // 마지막 요소에 ,를 붙여야하는 rule
		'no-param-reassign': 0, // 파라미터는 지역변수로 받아서 쓰라는 rule
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
};
