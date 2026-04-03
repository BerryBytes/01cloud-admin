const initialState = {
    isValidatingDnsPermission: false,
    validationDnsData: null,
    gcpFilePath: "",
    fetchingProviderConfig: false,
    providerConfig: null,
    dnsList :  [],
    creatingDns: false,
    deletingDns: false,
    updatingDns: false
}

export default initialState;