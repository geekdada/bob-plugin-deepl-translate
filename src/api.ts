import { RequestCallbackResponse, RequestObject } from '../types/global'

export class Api {
  constructor(
    private provider: 'deepl' | 'sub-deepl' | 'local',
    private token: string,
  ) {}

  private get baseUrl(): string {
    switch (this.provider) {
      case 'deepl':
        return 'https://api.deepl.com'
      case 'sub-deepl':
        return 'https://sub-deepl-api.nerdynerd.org'
      case 'local':
        return 'http://localhost:1337'
    }
  }

  async request<T = Record<string, unknown>>(
    requestObject: Omit<RequestObject, 'handler' | 'header'>,
  ): Promise<RequestCallbackResponse<T>> {
    try {
      const body: Record<string, any> = {
        ...requestObject.body,
        auth_key: this.token,
      }
      const url = `${this.baseUrl}${requestObject.url}`

      return await $http.request({
        ...requestObject,
        url,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'sub-deepl-bob/' + process.env.__VERSION__,
        },
        body,
      })
    } catch (e) {
      Object.assign(e, {
        _type: 'network',
        _message: '接口请求错误 ' + e.message,
      })

      throw e
    }
  }
}
