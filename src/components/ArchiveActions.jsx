/** 全站统一的档案风操作按钮（小尺寸，用于卡片与表格行） */

export function archiveGhostButtonClass(active) {
  return [
    'rounded-xl border px-3 py-1.5 text-xs font-medium transition',
    active
      ? 'border-rose-200 bg-rose-50 text-rose-900/90 shadow-sm'
      : 'border-stone-200/80 bg-white text-stone-600 hover:border-rose-100 hover:bg-rose-50/50',
  ].join(' ')
}

export function archiveDangerButtonClass() {
  return 'rounded-xl border border-rose-200/80 bg-white px-3 py-1.5 text-xs font-medium text-rose-700/90 transition hover:bg-rose-50'
}

export function archivePrimaryButtonClass() {
  return 'rounded-2xl bg-rose-400/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_-4px_rgba(225,120,140,0.45)] transition hover:bg-rose-400'
}
