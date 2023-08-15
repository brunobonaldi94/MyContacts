import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseUrl = baseURL;
  }

  async makeRequest(path, options) {
    let response = null;
    let responseBody = null;
    const { body: requestBody, method: httpMethod, headers: customHeaders } = options;
    const headers = new Headers();
    if (customHeaders) {
      Object.entries(customHeaders).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }
    if (requestBody) {
      response = await fetch(`${this.baseUrl}${path}`, {
        method: httpMethod,
        body: JSON.stringify(requestBody),
        headers,
        signal: options?.signal,
      });
    } else {
      response = await fetch(`${this.baseUrl}${path}`, {
        method: httpMethod,
        headers,
      });
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }
    if (response.ok) {
      return responseBody;
    }
    throw new APIError(
      response,
      responseBody,
    );
  }

  async get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }
}

export default HttpClient;
