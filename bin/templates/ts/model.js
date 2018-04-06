const modelTemplate = modelName => `export interface ${modelName}Model {
	foo?: string
}`

module.exports = {
	modelTemplate
}
