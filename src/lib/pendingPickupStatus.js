import { differenceInCalendarDays, startOfDay } from 'date-fns'

function parseYMDLocal(iso) {
  if (!iso || typeof iso !== 'string') return new Date(NaN)
  const [y, mo, d] = iso.split('-').map(Number)
  if (!y || !mo || !d) return new Date(NaN)
  return new Date(y, mo - 1, d)
}

/** 距离截止日剩余日历天数（截止日当日为 0，已过期为负数） */
export function getDaysUntilDeadline(periodEndISO, now = new Date()) {
  const end = startOfDay(parseYMDLocal(periodEndISO))
  const today = startOfDay(now)
  return differenceInCalendarDays(end, today)
}

const DEFAULT_URGENT_WITHIN = 7

/**
 * @param {string} periodEndISO
 * @param {{ urgentWithinDays?: number, now?: Date }} [opts]
 * @returns {{ remaining: number, status: 'normal' | 'soon' | 'expired', label: string }}
 */
export function getReminderStatus(periodEndISO, opts = {}) {
  const urgentWithin = opts.urgentWithinDays ?? DEFAULT_URGENT_WITHIN
  const now = opts.now ?? new Date()
  const remaining = getDaysUntilDeadline(periodEndISO, now)
  if (remaining < 0) {
    return { remaining, status: 'expired', label: '已过期' }
  }
  if (remaining <= urgentWithin) {
    return { remaining, status: 'soon', label: '即将截止' }
  }
  return { remaining, status: 'normal', label: '正常' }
}

/** 首页等可复用：取即将截止的条目（含今日截止，不含已过期） */
export function filterSoonPending(items, opts = {}) {
  const urgentWithin = opts.urgentWithinDays ?? DEFAULT_URGENT_WITHIN
  const now = opts.now ?? new Date()
  return items.filter((item) => {
    const { status } = getReminderStatus(item.periodEnd, { urgentWithinDays: urgentWithin, now })
    return status === 'soon'
  })
}
