const run_handler = require('../handlers/run-handler')

module.exports = {
  name: 'run',
  alias: ['r'],
  description: 'Runs your cloud native project',
  run: async toolbox => {
    const {
      prompt,
      print: { success }
    } = toolbox

    const askPortNumber = {
      type: 'input',
      name: 'portNumber',
      required: true,
      message: 'Which port should application be exposed on?:'
    }

    const { portNumber } = await prompt.ask([askPortNumber])

    const request = { portNumber }

    await run_handler.handle(request, toolbox)

    success(`
        Successfully deployed project to Kubernetes cluster.
        App viewable at localhost:3000
        Metrics visible on localhost:3000
    `)
  }
}
