param location string = resourceGroup().location

// create container registry 

resource acr 'Microsoft.ContainerRegistry/registries@2021-09-01' = {
  name: toLower('${resourceGroup().name}acr')
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

// create ACA environement 

module env 'environment.bicep' = {
  name: 'containerAppEnvironement'
  params: {
    location: location
  }
}

// create the various config pairs
var shared_config = [
  {
    name: 'ASPNETCORE_ENVIRONMENT'
    value: 'Development'
  }
  {
    name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
    value: env.outputs.appInsightsInstrumentationKey
  }
  {
    name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
    value: env.outputs.appInsightsConnectionString
  }
]

// create api container app
module api 'container_app.bicep' = {
  name: 'api'
  params: {
    name: 'api'
    location: location
    registryPassword: acr.listCredentials().passwords[0].value
    registryUsername: acr.listCredentials().username
    containerAppEnvironmentId: env.outputs.id
    registry: acr.name
    envVars: shared_config
    externalIngress: false
  }
}

// create frontend container app

var frontend_config = [
  {
    name: 'api'
    value: 'http://${api.outputs.fqdn}'
  }
]

module frontend 'container_app.bicep' = {
  name: 'frontend'
  params: {
    name: 'frontend'
    location: location
    registryPassword: acr.listCredentials().passwords[0].value
    registryUsername: acr.listCredentials().username
    containerAppEnvironmentId: env.outputs.id
    registry: acr.name
    envVars: union(shared_config, frontend_config)
    externalIngress: true
  }
}
