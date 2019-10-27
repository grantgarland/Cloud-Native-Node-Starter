module.exports = {
  async handle(request, toolbox) {
    const { nameOfProject } = request
    const { print, system } = toolbox

    /** Add Docker files */
    await system.run(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/Dockerfile-run'
    )
    await system.run(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/.dockerignore'
    )
    await system.run(`docker build -t nodeserver:1.0.0 -f Dockerfile-run .`)

    return
  }
}
