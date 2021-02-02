module.exports = {
	'parser': '@typescript-eslint/parser',
	'plugins': [
		'@typescript-eslint',
		'eslint-plugin-jsx-a11y',
		'eslint-plugin-react',
		'eslint-plugin-react-hooks'
	],
	'root': true,
	'env': {
		'commonjs': true,
		'browser': true,
		'es2021': true,
		'node' : true
	},
	'extends': [
		'airbnb',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended'
	],
	'parserOptions': {
		'project': './tsconfig.json',
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
		], // indent는 tab으로 통일
		'react/jsx-indent' : [2, 'tab'], // jsx에서도 indent tab으로 통일
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts'] }], // 확장자 설정
		'linebreak-style': ['error', 'windows'], // CRLF
		'no-unused-vars': 'warn', // 정의 후 사용하지 않은 변수는 경고만 하기
		'no-use-before-define': 1, // 정의 전에 사용 금지
		'no-console': 0, // console 사용하기
		'camelcase': ['error', { 'properties': 'always' }], // 속성에 camelcase 사용
		'no-tabs': 0, // tab 사용 안되는 rule
		'quote-props': 0, // property에 quote를 씌우지 말아야하는 rule
		'operator-linebreak': 0, // 연산자는 라인 앞쪽에 위치해야하는 rule
		'comma-dangle': 0, // 마지막 요소에 ,를 붙여야하는 rule
		'no-param-reassign': 0, // 파라미터는 지역변수로 받아서 쓰라는 rule
    	'import/prefer-default-export': ['off'], // export const 문을 쓸때 에러를 내는 rule 해제
		'react/prop-types': ['off'], // props의 타입체크를 처리에 proptypes가 아닌 typescript 사용 예정
		'react/jsx-wrap-multilines': 0, // jsx에서 여러 줄에 걸쳐서 정의할 때 복잡한 rule 해제
		'react/jsx-indent-props': [2, 'tab'], // jsx의 속성에도 tab으로 indent 적용
		'@typescript-eslint/explicit-module-boundary-types': 0, // function에 return 타입을 명시해야하는 rule 해제
		'import/extensions': 0, // ts 파일을 불러오기 위해
		'react/jsx-filename-extension': 0, // ts, tsx 파일에서도 jsx를 쓰기 위해
		'no-restricted-syntax': ['warn', 'FunctionExpression', 'WithStatement', 'BinaryExpression'], // for in 사용
		'react/jsx-props-no-spreading': ['warn'], // props로 받은 것 바로 props로 넘기기 허용
		'max-len': ['warn'], // 길이 100이 넘어가도 warning 만 하기
		'react/jsx-boolean-value': 0, // boolean 못넘기게 하는 룰 없애기
		'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
		'@typescript-eslint/no-empty-function': 0, // ()=>{} 가능하게 하기
		'prefer-destructuring': ['warn'],
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
		"import/no-unresolved": 0, // Turn off "Unable to resolve path to module ..." error
		"import/extensions": 0, // Turn off "Missing file extension for ..." error
		'import/resolver': {
			'node': {
				'extensions': ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	},
};
