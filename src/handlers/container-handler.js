var shell = require('shelljs')
module.exports = {
  async handle(request, toolbox) {
    const { system } = toolbox

    /** Add Docker files */
    await system.run(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/Dockerfile-run'
    )
    await system.run(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/.dockerignore'
    )
    await shell.exec(`docker build -t nodeserver:1.0.0 -f Dockerfile-run .`)

    return
  }
}
