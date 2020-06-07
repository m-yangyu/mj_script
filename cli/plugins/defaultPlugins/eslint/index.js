const path = require('path');
const { copyFile } = require('../../../tools/files');

class Eslint {
	constructor() {
		this.packageVersion = {
			"eslint": "6.8.0",
			"eslint-config-airbnb": "18.0.1",
			"eslint-friendly-formatter": "4.0.1",
			"eslint-import-resolver-alias": "1.1.2",
			"eslint-loader": "3.0.3",
			"eslint-plugin-import": "2.20.1",
			"eslint-plugin-jsx-a11y": "6.2.3",
			"eslint-plugin-react": "7.18.3",
			"babel-eslint": "10.1.0"
		}
		this.scripts = {
			"lint": "eslint --ext .jsx,.js --fix src/",
		}
		this.preCommit = "lint";
	}

	apply(gen) {
		gen.hooks.beforePackageJson.tap('eslint', () => {
			const packageJson = gen.defaultPackageJson;
			const dev = packageJson.devDependencies;
			const scripts = packageJson.scripts;
			const preCommit = packageJson['pre-commit'];
			Object.keys(this.packageVersion).map(name => {
				dev[name] = this.packageVersion[name];
			})
			Object.keys(this.scripts).map(name => {
				scripts[name] = this.scripts[name];
			})
			preCommit.push(this.preCommit);
		})
		gen.hooks.afterRootConfig.tap('eslint', () => {
			copyFile(path.resolve(__dirname, './.eslintrc.js'), `${gen.rootPath}/.eslintrc.js`);
		})
	}
}

module.exports = Eslint;