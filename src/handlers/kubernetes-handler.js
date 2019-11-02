var shell = require('shelljs')
module.exports = {
  async handle(request, toolbox) {
    const { patching, print, system } = toolbox

    /** Install Helm */
    await system.run(
      'curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh'
    )
    await system.run('chmod 700 get_helm.sh && ./get_helm.sh')
    await shell.exec(
      `helm init && helm repo add stable https://kubernetes-charts.storage.googleapis.com`
    )
    await system.run(`rm ./get_helm.sh`)
    /** Grab Cloud Native Helm chart template*/
    await system.run(
      'wget https://github.com/CloudNativeJS/helm/archive/master.zip'
    )
    await system.run('unzip master.zip')
    await system.run(`rm master.zip`)

    const pod_already_present = await system.run(
      `helm ls --all | grep "^nodeserver" | cut -d  " " -f1`
    )
    if (pod_already_present) {
      await system.run(`helm del --purge nodeserver`)
    }

    await shell.exec(
      `helm install --name nodeserver helm-master/chart/nodeserver`
    )
    const pod_name = await system.run(
      `kubectl get pods | grep "^nodeserver" | cut -d " " -f1`
    )
    print.success(`Successfully deployed app into Kubernetes pod: ${pod_name}`)

    return
  }
}
