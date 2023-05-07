import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseUrl = baseURL;
  }

  async makeRequest(url, httpMethod, requestBody = null) {
    let response = null;
    let body = null;
    if (requestBody) {
      response = await fetch(`${this.baseUrl}${url}`, {
        method: httpMethod,
        body: JSON.stringify(requestBody),
      });
    } else {
      response = await fetch(`${this.baseUrl}${url}`, {
        method: httpMethod,
      });
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }
    if (response.ok) {
      return body;
    }
    throw new APIError(
      response,
      body,
    );
  }

  async get(url) {
    await delay(500);
    return this.makeRequest(url, 'GET');
  }

  async post(url, body) {
    return this.makeRequest(url, 'POST', body);
  }

  async delete(url, id) {
    return this.makeRequest(url + id, 'DELETE');
  }
}

export default HttpClient;
