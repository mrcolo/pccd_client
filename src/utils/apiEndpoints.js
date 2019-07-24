const dev = true;

const ENTRYPOINT_PRODUCTION = 'https://f8760deb.ngrok.io'
const ENTRYPOINT_DEVELOPMENT = 'http://localhost:3000'

let ENTRYPOINT;
dev ? ENTRYPOINT = ENTRYPOINT_DEVELOPMENT : ENTRYPOINT = ENTRYPOINT_PRODUCTION

export const GET_DOCUMENTS = ENTRYPOINT + '/v1/document/?page='

export const CRUD_DOCUMENTS = ENTRYPOINT + '/v1/document/'
export const CRUD_CLASS = ENTRYPOINT + '/v1/class/'

export const AUTOCOMPLETE_DOCUMENTS = ENTRYPOINT + '/v1/document/autocomplete'
export const AUTOCOMPLETE_CLASS = ENTRYPOINT + '/v1/class/autocomplete'


