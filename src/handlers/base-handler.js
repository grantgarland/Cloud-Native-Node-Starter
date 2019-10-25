const path = require('path')
const express_handler = require('./express-handler')
const container_handler = require('./container-handler')

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
    } catch (err) {
      print.error('Error creating Express project')
      throw new Error()
    }

    /** Containerize project */
    try {
      print.info('Packaging application into Docker container')
      await container_handler.handle(request, toolbox)
    } catch (err) {
      print.error('Error creating Express project')
      throw new Error()
    }

    print.success('Packaged application into container')

    return
  }
}
