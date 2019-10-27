module.exports = {
  async handle(request, toolbox) {
    const { print, system } = toolbox

    print.info('Forwarding servers to local ports ')
    await system.run(
      `kubectl --namespace prometheus port-forward $PROM_POD_NAME 9090`
    )
    await system.run(
      `kubectl --namespace grafana port-forward $GRAFANA_POD_NAME 3000`
    )

    return
  }
}
