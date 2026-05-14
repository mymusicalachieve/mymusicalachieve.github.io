import { format } from 'date-fns'
import { zhCN as dfZhCN } from 'date-fns/locale'

export function toISODate(d) {
  return format(d, 'yyyy-MM-dd')
}

export function formatChineseDate(d) {
  if (!d) return ''
  return format(d, 'yyyy年M月d日 EEEE', { locale: dfZhCN })
}

/** 自 ISO 日期字符串格式化为「2026年5月18日」（无星期），按本地日历日解析 */
export function formatChineseDateShortFromISO(iso) {
  if (!iso) return ''
  const [y, mo, d] = iso.split('-').map(Number)
  if (!y || !mo || !d) return ''
  return format(new Date(y, mo - 1, d), 'yyyy年M月d日', { locale: dfZhCN })
}
