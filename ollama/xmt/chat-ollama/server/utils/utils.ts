export function tryParseJson(json: string, defaultValue: any = null) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error(e)
    return defaultValue
  }
}