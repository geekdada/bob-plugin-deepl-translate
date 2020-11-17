// https://ripperhe.gitee.io/bob/#/plugin/quickstart/translate
export interface TranslateQuery {
  text: string // 需要翻译的文本。
  from: string // 用户选中的源语种标准码，可能是 auto
  to: string // 用户选中的目标语种标准码，可能是 auto
  detectFrom: string // 检测过后的源语种，一定不是 auto，如果插件不具备检测语种的能力，可直接使用该属性
  detectTo: string // 检测过后的目标语种，一定不是 auto，如果不想自行推测用户实际需要的目标语种，可直接使用该属性
}

export interface TranslateCompletion {
  result?: {
    from?: string // 由翻译接口提供的源语种，可以与查询时的 from 不同。查看 语种列表。
    to?: string // 由翻译接口提供的目标语种，可以与查询时的 to 不同。查看 语种列表。
    fromParagraphs?: ReadonlyArray<string> // 原文分段拆分过后的 string 数组，可不传。
    toParagraphs: ReadonlyArray<string> // 译文分段拆分过后的 string 数组，必传。
    toDict?: never // 词典结果，见 to dict object。可不传。
    fromTTS?: never // result 原文的语音合成数据，如果没有，可不传。
    toTTS?: never // result 译文的语音合成数据，如果没有，可不传。
    raw?: any // 如果插件内部调用了某翻译接口，可将接口原始数据传回，方便定位问题，可不传。
  }
  error?: {
    type: ErrorType // 错误类型，可设置为下方错误之一
    message: string // 错误描述，用于展示给用户看
    addtion?: any // 附加信息，可以是任何可 json 序列化的数据类型，用于 debug
  }
}

export type ErrorType =
  | 'unknown' // 未知错误
  | 'param' // 参数错误
  | 'unsupportLanguage' // 不支持的语种
  | 'secretKey' // 缺少秘钥
  | 'network' // 网络异常，网络请失败
  | 'api' // 服务接口异常
