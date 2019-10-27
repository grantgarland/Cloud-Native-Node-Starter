const create_handler = require('../handlers/create-handler')

module.exports = {
  name: 'create',
  alias: ['c'],
  description: 'Creates a new cloud native project',
  run: async toolbox => {
    const {
      prompt,
      print: { success }
    } = toolbox

    const askNameOfProject = {
      type: 'input',
      name: 'nameOfProject',
      required: true,
      message: 'Enter project name:'
    }

    const { nameOfProject } = await prompt.ask([askNameOfProject])

    const request = { nameOfProject }

    await create_handler.handle(request, toolbox)

    success(`
        Done! Generated new cloud native Node.js project: ${nameOfProject}.
        Run the following command to deploy and view your app from Kubernetes:\n
        
        "cloud-native-node-starter run"
    `)
  }
}
