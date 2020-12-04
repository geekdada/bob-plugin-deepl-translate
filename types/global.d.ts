interface $info {
  identifier: string
  version: string
  category: string
  name: string
  summary: string
  icon: string
  author: string
  homepage: string
  appcast: string
  minBobVersion: string
}

interface $log {
  info(obj?: string | Record<string, unknown>): void
  error(obj?: string | Record<string, unknown>): void
}

interface $http {
  request<T>(requestObject: RequestObject): Promise<RequestCallbackResponse<T>>
}

export interface RequestObject {
  method: 'GET' | 'POST' | 'DELETE' | 'HEAD'
  url: string
  header?: Record<string, string>
  body?: Record<string, unknown>
  timeout?: number // 请求超时
}

export interface RequestCallbackResponse<T = Record<string, unknown>> {
  data?: T
  response: {
    url: string // url
    MIMEType: string // MIME 类型
    expectedContentLength: number // 长度
    textEncodingName: string // 编码
    suggestedFilename: string // 建议的文件名
    statusCode: number // HTTP 状态码
    headers: Record<string, string> // HTTP header
  }
  error?: {
    domain: string // domain
    code: number // code
    userInfo: any // userInfo
    localizedDescription: string // 描述
    localizedFailureReason: string // 原因
    localizedRecoverySuggestion: string // 建议
  }
}

interface $option {
  token: string
  provider: 'deepl' | 'a-translator' | 'local'
  formality: 'default' | 'more' | 'less'
}

declare global {
  const $info: $info
  const $log: $log
  const $http: $http
  const $option: $option
}
