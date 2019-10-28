const run_handler = require('../handlers/run-handler')

module.exports = {
  name: 'run',
  alias: ['r'],
  description: 'View your cloud native project from Granafa',
  run: async toolbox => {
    const {
      print: { success }
    } = toolbox

    await run_handler.handle(request, toolbox)

    success(`
        Successfully deployed project to Kubernetes cluster.
        Metrics visible on localhost:3000
    `)
  }
}
