export const AppConstants = {
  ClusterProvider : {
      GCP : 'gcp',
      EKS : 'aws',
      CLOUDFLARE: 'cloudflare',
      Other: 'other'
  },
  ClusterStatus : {
      Drafted: 'drafted', 
      Planning: 'cluster-planing',
      Planned: 'planned' , 
      Applying: 'cluster-applying',        
      Applied: 'applied',
      Destroyed: 'destroyed',
      Imported: 'imported',
      PackageInstalling: 'package-installing',        
      PackageInstalled: 'package-installed'
  },
  WorkflowStatus: {
      Succeeded: 'Succeeded',
      Running: 'Running' ,
      Pending: 'Pending',
      Failed: 'Failed' 
  },
  BackupStatus: {
      New: "New",
      InProgress: "InProgress",
      Completed: "Completed",
      Failed: "Failed",
      FailedValidation: "FailedValidation",
      PartiallyFailed: "PartiallyFailed",
      PartiallyDone: "PartiallyDone",
      Deleting: "Deleting"
  },
  Weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"],
  packages: {
      VELERO: "velero",
      SECRET_PATCHER: "zerone-secret-patcher",
      ARGO: "zeron-argo",
  },
  validationRegex: {
    email: new RegExp(/([\w.-]+@([\w-]+)\.+\w{2,}$)/),
    default: new RegExp(/^[A-Za-z0-9_ -]{3,30}$/),
    projectCode: new RegExp(/^(\w|\d){0,5}$/),
    domain: new RegExp(/^([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+$/),
    url: new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
}
}