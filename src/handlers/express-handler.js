module.exports = {
  async handle(request, toolbox) {
    /** Destructure out required packages from request and toolbox */
    const { patching, system } = toolbox

    /** Build Express project */
    try {
      await system.run(`npm install -g express-generator`)
      await system.run(`express --no-view .`)
      /** Add Health and readiness checks */
      await patching.prepend(
        'app.js',
        `var health = require('@cloudnative/health-connect')\nvar prometheus = require('appmetrics-prometheus').attach()\n`
      )
      await patching.patch('app.js', {
        after: `app.use('/users', usersRouter)`,
        insert: `\napp.use('/health', health.LivenessEndpoint(healthcheck))\napp.use('/ready', health.ReadinessEndpoint(healthcheck))`
      })
      await patching.patch('app.js', {
        after: `app = express();`,
        insert: `\n\nvar healthcheck = new health.HealthChecker()\nconst readyPromise = new Promise(resolve => {\n  // This will make the app ready after 30 seconds for testing purposes.\n  setTimeout(() => {\n    console.log('READY!')\n    resolve()\n  }, 30000)\n});\nhealthcheck.registerReadinessCheck(new health.ReadinessCheck('testReadyCheck', readyPromise));`
      })
      await system.run(
        `npm install @cloudnative/health-connect appmetrics-prometheus && npm install`
      )
    } catch (err) {
      throw new Error()
    }
    return
  }
}
