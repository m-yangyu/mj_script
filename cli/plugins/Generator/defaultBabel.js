module.exports = {
    "presets": [
		[
			"@babel/preset-env",
			{
				"useBuiltIns": "usage",
				"targets": {
					"chrome": "49",
					"ie": "11",
					"node": "current"
				},
				"corejs": 2
			}
		],
		"@babel/preset-react"
	],
	"plugins": [
		"@babel/plugin-proposal-class-properties",
		[
			"@babel/plugin-transform-runtime",
			{
				"absoluteRuntime": false,
				"corejs": false,
				"helpers": true,
				"regenerator": true,
				"useESModules": false
			}
		],
		[
			"@babel/plugin-proposal-decorators",
			{
				decoratorsBeforeExport: true
			}
		],
		[
			"import",
			{
				"libraryName": "antd",
      			"libraryDirectory": "es",
 				"style": true
			}
		],
		"react-hot-loader/babel"
	]
}