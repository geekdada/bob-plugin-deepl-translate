import { RequestCallbackResponse, RequestObject } from '../types/global'

export class Api {
  constructor(private provider: 'deepl' | 'sub-deepl', private token: string) {}

  private get baseUrl(): string {
    switch (this.provider) {
      case 'deepl':
        return 'https://api.deepl.com'
      case 'sub-deepl':
        return 'https://sub-deepl-api.nerdynerd.org'
    }
  }

  async request<T = Record<string, unknown>>(
    requestObject: Omit<RequestObject, 'handler' | 'header'>,
  ): Promise<RequestCallbackResponse<T>> {
    try {
      return await $http.request({
        ...requestObject,
        url: `${this.baseUrl}${requestObject.url}`,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          ...requestObject.body,
          auth_key: this.token,
        },
      })
    } catch (e) {
      Object.assign(e, {
        _type: 'network',
        _message: '接口请求错误',
      })

      throw e
    }
  }
}
