module.exports = {
  async handle(request, toolbox) {
    const { nameOfProject } = request
    const { print, system } = toolbox

    print.info(
      'Running image "cloud-native-node-starter:1.0.0" on localhost:3001 '
    )
    await system.run(
      `docker run -d -p 3000:3001 -t cloud-native-node-starter:1.0.0`
    )

    return
  }
}
