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
        Run the following command to deploy and view app on port 3000:\n
        kubectl port-forward (kubectl get pods | grep "^nodeserver" | cut -d " " -f1) 3000:3000
    `)
  }
}
