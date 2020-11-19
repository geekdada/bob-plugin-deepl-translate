import { supportedLanguages } from './config'

/**
 * 往往各大翻译服务商的语种类型都不同，
 * 实现插件的过程中很可能需要服务商特有的语种标识符和 Bob 定义的标识符来回转换，
 * 建议以下面的方式实现，
 * `xxx` 代表服务商特有的语种标识符，请替换为真实的，
 * 具体支持的语种数量根据实际情况而定。
 *
 * Bob 语种标识符转服务商语种标识符(以为 'zh-Hans' 为例): var lang = langMap.get('zh-Hans');
 * 服务商语种标识符转 Bob 语种标识符: var standardLang = langMapReverse.get('xxx');
 */

export const langMap = new Map<string, string>(supportedLanguages)

export const langMapReverse = new Map(
  supportedLanguages.map(([standardLang, lang]) => [lang, standardLang]),
)

export const translateStatusCode = (code: number): string => {
  switch (code) {
    case 400:
      return 'Bad request. Please check error message and your parameters.'
    case 403:
      return 'Authorization failed. Please supply a valid token.'
    case 404:
      return 'The requested resource could not be found.'
    case 413:
      return 'The request size exceeds the limit.'
    case 429:
      return 'Too many requests. Please wait and resend your request.'
    case 456:
      return 'Quota exceeded. The character limit has been reached.'
    case 503:
      return 'Resource currently unavailable. Try again later.'
    default:
      return 'Internal error'
  }
}
