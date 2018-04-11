const controllerTemplate = action => `export const ${action} = async (req, res) => {
	res.json({
		ping: 'OK'
	})
}`;

const routerTemplate = (name, action, verb) => `import express from 'express';
import { ${action} } from '../controllers/${name}'

const router = express.Router()
router.get('/${action}', ${action})

export default router`;

const controllerTestTemplate = (
	name,
	action,
	verb
) => `import { agent, SuperAgent, SuperAgentRequest } from 'superagent'

const testUser = agent()

describe.skip('[${name}] ${action} test', () => {
	it('[${verb} api] should return ${name} data', async () => {
		expect.assertions(1)
		try {
			const { text } = await testUser.${verb.toLowerCase()}('localhost:3003/fetch/${name}/${action}')
			const content = JSON.parse(text)
			expect(content.ping).toBe('OK')
		} catch (err) {
			console.error(err)
		}
	})
})`;

module.exports = {
	controllerTemplate,
	routerTemplate,
	controllerTestTemplate
};
