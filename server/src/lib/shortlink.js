
const { HTTP_HOSTNAME, HTTP_PORT, HTTP_SCHEMA} = process.env;
if (!HTTP_HOSTNAME) {
  throw new Error('Missing env variable HTTP_HOSTNAME')
}
if (!HTTP_PORT) {
  throw new Error('Missing env variable HTTP_PORT')
}
if (!HTTP_SCHEMA) {
  throw new Error('Missing env variable HTTP_SCHEMA')
}

const getShortURL = function(id) {
  return `${HTTP_SCHEMA}://${HTTP_HOSTNAME}:${HTTP_PORT}/${id}`
}

module.exports = {
  getShortURL,
}