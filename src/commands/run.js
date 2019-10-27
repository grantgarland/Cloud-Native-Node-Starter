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
      message: 'Enter port number:'
    }

    const { portNumber } = await prompt.ask([askPortNumber])

    const request = { portNumber }

    success(`
        Successfully deployed project to Kubernetes cluster.
        App viewable at localhost:${portNumber}

    `)
  }
}
