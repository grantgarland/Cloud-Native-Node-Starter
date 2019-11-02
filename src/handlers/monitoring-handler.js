var shell = require('shelljs')
module.exports = {
  async handle(request, toolbox) {
    const { system } = toolbox

    /** Install Prometheus & Grafana */
    const prom_pod_already_present = await system.run(
      `helm ls --all | grep "^prometheus" | cut -d  " " -f1`
    )
    const grafana_pod_already_present = await system.run(
      `helm ls --all | grep "^grafana" | cut -d  " " -f1`
    )
    if (grafana_pod_already_present) {
      await system.run(`helm del --purge grafana`)
    }
    if (prom_pod_already_present) {
      await system.run(`helm del --purge prometheus`)
    }
    await shell.exec(
      'helm install stable/prometheus \
      --name prometheus \
      --namespace prometheus'
    )
    await shell.exec(
      `helm install stable/grafana \
      --set adminPassword=admin \
      --name grafana \
      --namespace grafana`
    )

    return
  }
}
