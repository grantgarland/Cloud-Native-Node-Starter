const fs = require('fs')
const { system } = require('gluegun')

module.exports = {
  async handle(request, toolbox) {
    /** Destructure out required objects from request and toolbox */
    const { nameOfProject } = request
    const { filesystem, parameters, print, template } = toolbox

    /** Build Express project */
    console.log(`Building Express project`)
    await system.run(`express .`)
    await system.run(
      `npm install @cloudnative/health-connect appmetrics-prometheus`
    )
  }
}
