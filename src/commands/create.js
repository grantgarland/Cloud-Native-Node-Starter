const base_handler = require('../handlers/base-handler')

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

    await base_handler.handle(request, toolbox)

    success(`
        Done! Generated new cloud native Node.js project: ${nameOfProject}.
        Next:
          $ cd ${nameOfProject}
          $ npm install
    `)
  }
}
