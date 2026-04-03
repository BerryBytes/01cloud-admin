import { AppConstants } from './appconstants'

export const ClusterConstants = [
    {
        provider : AppConstants.ClusterProvider.GCP,
        regions : [
            { value: 'asia-east1', name: 'Changhua County, Taiwan', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-east2', name: 'Hong Kong', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-northeast1', name: 'Tokyo, Japan', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-northeast2', name: 'Osaka, Japan', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-northeast3', name: 'Seoul, South Korea', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-south1', name: 'Mumbai, India', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-southeast1', name: 'Jurong West, Singapore', zones: [ 'a', 'b', 'c' ] },
            { value: 'asia-southeast2', name: 'Jakarta, Indonesia', zones: [ 'a', 'b', 'c' ] },
            { value: 'australia-southeast1', name: 'Sydney, Australia', zones: [ 'a', 'b', 'c' ] },
            { value: 'europe-north1', name: 'Hamina, Finland', zones: [ 'a', 'b', 'c' ] },
            { value: 'europe-west1', name: 'St. Ghislain, Belgium', zones: [ 'b', 'c', 'd' ] },
            { value: 'europe-west2', name: 'London, England, UK', zones: [ 'a', 'b', 'c' ] },
            { value: 'europe-west3', name: 'Frankfurt, Germany', zones: [ 'a', 'b', 'c' ] },
            { value: 'europe-west4', name: 'Eemshaven, Netherlands', zones: [ 'a', 'b', 'c' ] },
            { value: 'europe-west6', name: 'Zürich, Switzerland', zones: [ 'a', 'b', 'c' ] },
            { value: 'northamerica-northeast1', name: 'Montréal, Québec, Canada', zones: [ 'a', 'b', 'c' ] },
            { value: 'southamerica-east1', name: 'Osasco (São Paulo), Brazil', zones: [ 'a', 'b', 'c' ] },
            { value: 'us-central1', name: 'Council Bluffs, Iowa, USA', zones: [ 'a', 'b', 'c', 'f' ] },
            { value: 'us-east1', name: 'Moncks Corner, South Carolina, USA', zones: [ 'b', 'c', 'd' ] },
            { value: 'us-east4', name: 'Ashburn, Northern Virginia, USA', zones: [ 'a', 'b', 'c' ] },
            { value: 'us-west1', name: 'The Dalles, Oregon, USA', zones: [ 'a', 'b', 'c' ] },
            { value: 'us-west2', name: 'Los Angeles, California, USA', zones: [ 'a', 'b', 'c' ] },
            { value: 'us-west3', name: 'Salt Lake City, Utah, USA', zones: [ 'a', 'b', 'c' ] },
            { value: 'us-west4', name: 'Las Vegas, Nevada, USA', zones: [ 'a', 'b', 'c' ] }
        ],
        cluster_version: [
            '1.15.12-gke.20'
        ],
        subnet_cidr_range: [
            '10.0.0.0/20',
            '192.168.0.0/20',
            '11.0.0.0/20',
            '172.16.0.0/20'
        ],
        filestore_tier: [
            'BASIC_HDD'
        ],
        disk_type:[
            'pd-standard'
        ],
        instance_type: [
            'n1-standard-1'
        ]
    },
    {
        provider : AppConstants.ClusterProvider.EKS,
        regions : [   
            { value: 'us-east-2', name: 'US East (Ohio)' },  
            { value: 'us-east-1', name: 'US East (N. Virginia)' },  
            { value: 'us-west-1', name: 'US West (N. California)' },  
            { value: 'us-west-2', name: 'US West (Oregon)' },  
            { value: 'af-south-1', name: 'Africa (Cape Town)' },  
            { value: 'ap-east-1', name: 'Asia Pacific (Hong Kong)' },  
            { value: 'ap-south-1', name: 'Asia Pacific (Mumbai)' },  
            { value: 'ap-northeast-3', name: 'Asia Pacific (Osaka-Local)' },  
            { value: 'ap-northeast-2', name: 'Asia Pacific (Seoul)' },  
            { value: 'ap-southeast-1', name: 'Asia Pacific (Singapore)' },  
            { value: 'ap-southeast-2', name: 'Asia Pacific (Sydney)' },  
            { value: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)' },  
            { value: 'ca-central-1', name: 'Canada (Central)' },  
            { value: 'eu-central-1', name: 'Europe (Frankfurt)' },  
            { value: 'eu-west-1', name: 'Europe (Ireland)' },  
            { value: 'eu-west-2', name: 'Europe (London)' },  
            { value: 'eu-south-1', name: 'Europe (Milan)' },  
            { value: 'eu-west-3', name: 'Europe (Paris)' },  
            { value: 'eu-north-1', name: 'Europe (Stockholm)' },  
            { value: 'me-south-1', name: 'Middle East (Bahrain)' },  
            { value: 'sa-east-1', name: 'South America (São Paulo)' }
        ],
        cluster_version : [
            '1.17'
        ],
        network_cidr: [
            '10.0.0.0/16',
            '11.0.0.0/16',
            '172.0.0.0/16'
        ],
        instance_type: [
            't2.medium'
        ]
    }
]

export const ClusterProviders = [
    { id: 1, provider: AppConstants.ClusterProvider.GCP , name: 'Google Kubernetes Engine', image: '/images/provider/gke.svg' },
    { id: 2, provider: AppConstants.ClusterProvider.EKS , name: 'AWS', image: '/images/provider/eks.svg' }
]