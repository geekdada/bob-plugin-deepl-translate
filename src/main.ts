import { Api } from './api'
import { supportedLanguages } from './config'
import { ErrorType, TranslateCompletion, TranslateQuery } from './types'
import { langMap, langMapReverse, translateStatusCode } from './utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function supportLanguages(): ReadonlyArray<string> {
  return supportedLanguages.map(([standardLang]) => standardLang)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function translate(
  query: TranslateQuery,
  completion: (data: TranslateCompletion) => void,
): void {
  const api = new Api($option.provider, $option.token)

  ;(async () => {
    const targetLanguage = langMap.get(query.detectTo)

    $log.info(`translate to ${targetLanguage}`)

    if (!targetLanguage) {
      const err = new Error()
      Object.assign(err, {
        _type: 'unsupportLanguage',
        _message: '不支持该语种',
      })
      throw err
    }

    const response = await api.request<{
      translations: ReadonlyArray<{
        detected_source_language: string
        text: string
      }>
    }>({
      method: 'GET',
      url: '/v2/translate',
      body: {
        text: query.text,
        target_lang: targetLanguage,
        split_sentences: '1',
        preserve_formatting: '0',
        formality: $option.formality,
      },
    })

    if (response.error) {
      $log.error(response.error)
      completion({
        error: {
          type: 'api',
          message: '接口请求错误',
        },
      })
    } else {
      const { statusCode } = response.response

      if (statusCode > 299) {
        let reason: ErrorType

        if (statusCode >= 400 && statusCode < 500) {
          reason = 'param'
        } else {
          reason = 'api'
        }

        completion({
          error: {
            type: reason,
            message: translateStatusCode(statusCode),
            addtion: response.data,
          },
        })

        return
      }

      const translations = response.data?.translations

      if (!translations || !translations.length) {
        completion({
          error: {
            type: 'api',
            message: '接口未返回翻译结果',
          },
        })

        return
      }

      completion({
        result: {
          from: langMapReverse.get(translations[0].detected_source_language),
          toParagraphs: translations.map((item) => item.text),
        },
      })
    }
  })().catch((err) => {
    $log.error(err)
    completion({
      error: {
        type: err._type || 'unknown',
        message: err._message || '未知错误',
      },
    })
  })
}
