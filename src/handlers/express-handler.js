module.exports = {
  async handle(request, toolbox) {
    /** Destructure out required packages from request and toolbox */
    const { patching, system } = toolbox

    /** Build Express project */
    try {
      await system.run(`npm install -g express-generator`)
      await system.run(`express --no-view .`)
      await patching.prepend(
        'app.js',
        `var health = require('@cloudnative/health-connect')\nvar prometheus = require('appmetrics-prometheus').attach()\n`
      )
      await patching.patch('app.js', {
        after: `app.use('/users', usersRouter)`,
        insert: `\napp.use('/health', health.LivenessEndpoint(healthcheck))`
      })
      await patching.patch('app.js', {
        after: `app = express()`,
        insert: `\nvar healthcheck = new health.HealthChecker()`
      })
      await system.run(
        `npm install @cloudnative/health-connect appmetrics-prometheus`
      )
    } catch (err) {
      throw new Error()
    }
    return
  }
}
