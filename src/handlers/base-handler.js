const path = require('path')
const { system } = require('gluegun')
const express_hander = require('./express-handler')

module.exports = {
  async handle(request, toolbox) {
    /** Destructure out required objects from request and toolbox */
    const { nameOfProject } = request
    const {
      filesystem,
      print: { success }
    } = toolbox

    /** Build project directory */
    const originalFolder = process.cwd()
    const appFolder = path.join(originalFolder, nameOfProject)
    console.log(`Creating application at ${nameOfProject}`)
    filesystem.dir(appFolder)
    process.chdir(appFolder)

    /** Create Express project inside project directory */
    await express_hander.handle(request, toolbox)

    // if (!ok) {
    //   print.error('Error installing project.')
    //   print.newline()
    //   print.error('Check you have required dependencies and try again')
    //   process.exit(1)
    // }

    return
  }
}
