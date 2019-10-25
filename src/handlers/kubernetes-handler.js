module.exports = {
  async handle(request, toolbox) {
    const { print, system } = toolbox

    /** Install Helm */
    await system.run(
      'curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh'
    )
    await system.run('chmod 700 get_helm.sh')
    await system.run('./get_helm.sh')
    print.success('Successfully downloaded Helm')

    return
  }
}
