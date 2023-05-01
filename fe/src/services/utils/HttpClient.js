import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseUrl = baseURL;
  }

  async get(url) {
    const response = await fetch(`${this.baseUrl}${url}`);
    await delay(500);
    return response.json();
  }

  async post(url, body) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    await delay(500);
    return response.json();
  }
}

export default HttpClient();
