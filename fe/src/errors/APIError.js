export default class APIError extends Error {
  constructor(response, body) {
    super();
    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.message = `${response.status} - ${body?.error || response.statusText}`;
  }
}
