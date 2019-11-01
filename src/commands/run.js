const run_handler = require('../handlers/run-handler')

module.exports = {
  name: 'run',
  alias: ['r'],
  description: 'View your cloud native services',
  run: async toolbox => {
    const {
      prompt,
      print: { success }
    } = toolbox

    const askServiceToExpose = {
      type: 'select',
      name: 'serviceToExpose',
      required: true,
      message: 'Which service would you like to expose?',
      choices: ['Express', 'Prometheus', 'Grafana']
    }

    const { serviceToExpose } = await prompt.ask(askServiceToExpose)

    const request = { serviceToExpose }

    await run_handler.handle(request, toolbox)

    success(`
        Successfully deployed project to Kubernetes cluster.
        Metrics visible on localhost:3000
    `)
  }
}
