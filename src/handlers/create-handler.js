const path = require('path')
const express_handler = require('./express-handler')
const container_handler = require('./container-handler')
const kubernetes_handler = require('./kubernetes-handler')
const monitoring_handler = require('./monitoring-handler')

module.exports = {
  async handle(request, toolbox) {
    /** Destructure out required objects from request and toolbox */
    const { nameOfProject } = request
    const { filesystem, print } = toolbox

    /** Build a project directory */
    const userFolder = process.cwd()
    const appFolder = path.join(userFolder, nameOfProject)
    filesystem.dir(appFolder)
    process.chdir(appFolder)

    /** Create Express project */
    try {
      print.info('Creating Express project. This may take a minute...')
      await express_handler.handle(request, toolbox)
      print.success('Successfully created Express project.')
    } catch (err) {
      print.error('Error creating Express project.')
      throw new Error()
    }

    // /** Containerize project */
    try {
      print.info('Packaging application for Docker...')
      await container_handler.handle(request, toolbox)
      print.success('Successfully packaged application for Docker.')
    } catch (err) {
      print.error(
        'Error packaging project for Docker. Is your Docker daemon running?'
      )
      throw new Error()
    }

    /** Prepare project for Kubernetes */
    try {
      print.info('Preparing project for Kubernetes orchestration...')
      await kubernetes_handler.handle(request, toolbox)
    } catch (err) {
      print.error('Error creating packaging project for Kubernetes.')
      throw new Error()
    }

    /** Add monitoring to Kubernetes cluster */
    try {
      print.info('Adding monitoring stack inside Kubernetes cluster')
      await monitoring_handler.handle(request, toolbox)
      print.success(
        `Successfully installed Prometheus and Grafana into Kubernetes cluster.`
      )
    } catch (err) {
      print.error('Error adding monitoring suite to cluster.')
    }
    return
  }
}
