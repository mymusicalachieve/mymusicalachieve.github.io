import { useState } from 'react'
import ChineseDateField from '../components/ChineseDateField.jsx'
import { formatChineseDateShortFromISO, toISODate } from '../lib/dateZh.js'
import { ConfirmDialog } from '../components/ConfirmDialog.jsx'
import {
  archiveDangerButtonClass,
  archiveGhostButtonClass,
  archivePrimaryButtonClass,
} from '../components/ArchiveActions.jsx'
import PageModuleSubtitle from '../components/PageModuleSubtitle.jsx'
import { getDaysUntilDeadline, getReminderStatus } from '../lib/pendingPickupStatus.js'

function uid() {
  return crypto.randomUUID()
}

const REWARD_TYPES = [
  { value: 'ost', label: 'OST' },
  { value: 'polaroid', label: '拍立得' },
  { value: 'bonus', label: '特典' },
  { value: 'other', label: '其他' },
]

function displayRewardType(item) {
  if (item.rewardType === 'other') {
    const c = (item.rewardTypeCustom || '').trim()
    return c || '其他'
  }
  return REWARD_TYPES.find((t) => t.value === item.rewardType)?.label ?? '其他'
}

function summarizeMemo(text) {
  if (!text || !text.trim()) return '暂无备忘'
  const one = text.trim().replace(/\s+/g, ' ')
  return one.length > 80 ? `${one.slice(0, 80)}…` : one
}

function parseISODate(iso) {
  if (!iso) return undefined
  const [y, mo, d] = iso.split('-').map(Number)
  if (!y || !mo || !d) return undefined
  return new Date(y, mo - 1, d)
}

function compareCalendarEndAfterStart(startISO, endISO) {
  const s = parseISODate(startISO)
  const e = parseISODate(endISO)
  if (!s || !e) return false
  return e >= s
}

const initialPending = [
  {
    id: uid(),
    musicalName: '「示例」在燃烧的黑暗中',
    rewardType: 'ost',
    rewardTypeCustom: '',
    periodStart: '2026-06-16',
    periodEnd: '2026-07-31',
    pickupLocation: '某剧场MD 柜台',
    memo: '需携带兑换券',
  },
  
]

function statusCardTone(status) {
  if (status === 'expired') {
    return {
      ring: 'ring-stone-200/80',
      border: 'border-stone-200/90',
      bg: 'bg-stone-50/90',
      badge: 'bg-stone-200/60 text-stone-700 ring-stone-300/50',
      headline: 'text-stone-600',
    }
  }
  if (status === 'soon') {
    return {
      ring: 'ring-amber-200/70',
      border: 'border-amber-200/80',
      bg: 'bg-[#fffaf5]',
      badge: 'bg-amber-100/90 text-amber-900/90 ring-amber-200/70',
      headline: 'text-amber-950/90',
    }
  }
  return {
    ring: 'ring-emerald-200/60',
    border: 'border-emerald-200/70',
    bg: 'bg-[#f7fdf9]',
    badge: 'bg-emerald-100/85 text-emerald-900/85 ring-emerald-200/65',
    headline: 'text-emerald-950/90',
  }
}

function reminderHeadline(musicalName, remaining, status) {
  if (status === 'expired') {
    const d = Math.abs(remaining)
    return `《${musicalName}》待领物料已超期 ${d} 天`
  }
  if (remaining === 0) {
    return `《${musicalName}》待领物料今日截止`
  }
  return `《${musicalName}》待领物料还有 ${remaining} 天截止`
}

function PendingFormModal({ editingItem, onClose, onSave }) {
  const [musicalName, setMusicalName] = useState(() => editingItem?.musicalName ?? '')
  const [rewardType, setRewardType] = useState(() => editingItem?.rewardType ?? 'ost')
  const [rewardTypeCustom, setRewardTypeCustom] = useState(
    () => editingItem?.rewardTypeCustom ?? '',
  )
  const [periodStart, setPeriodStart] = useState(() =>
    editingItem ? parseISODate(editingItem.periodStart) : undefined,
  )
  const [periodEnd, setPeriodEnd] = useState(() =>
    editingItem ? parseISODate(editingItem.periodEnd) : undefined,
  )
  const [pickupLocation, setPickupLocation] = useState(() => editingItem?.pickupLocation ?? '')
  const [memo, setMemo] = useState(() => editingItem?.memo ?? '')
  const [formError, setFormError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!musicalName.trim()) {
      setFormError('请填写音乐剧名称')
      return
    }
    if (rewardType === 'other' && !rewardTypeCustom.trim()) {
      setFormError('选择「其他」时请填写自定义物料名称')
      return
    }
    if (!periodStart || !periodEnd) {
      setFormError('请选择领取期间的开始与截止日期')
      return
    }
    const startISO = toISODate(periodStart)
    const endISO = toISODate(periodEnd)
    if (!compareCalendarEndAfterStart(startISO, endISO)) {
      setFormError('截止日期不能早于开始日期')
      return
    }
    if (!pickupLocation.trim()) {
      setFormError('请填写领取地点')
      return
    }
    onSave({
      id: editingItem?.id ?? uid(),
      musicalName: musicalName.trim(),
      rewardType,
      rewardTypeCustom: rewardType === 'other' ? rewardTypeCustom.trim() : '',
      periodStart: startISO,
      periodEnd: endISO,
      pickupLocation: pickupLocation.trim(),
      memo: memo.trim(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-stone-900/20"
        aria-label="关闭"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pending-modal-title"
        className="relative z-[1] max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-violet-100/80 bg-[#fdfcfe] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]"
      >
        <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-violet-100/70 bg-[#fdfcfe] px-5 py-4 sm:px-6">
          <h2 id="pending-modal-title" className="text-base font-semibold text-stone-800">
            {editingItem ? '编辑待领物料' : '添加待领物料'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 transition hover:bg-violet-50 hover:text-stone-600"
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-6">
          <div className="space-y-2">
            <label htmlFor="p-musical" className="text-xs font-medium text-stone-500">
              音乐剧名称
            </label>
            <input
              id="p-musical"
              value={musicalName}
              onChange={(e) => setMusicalName(e.target.value)}
              placeholder="例如：弗兰肯斯坦"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-violet-100/80 placeholder:text-stone-400 focus:border-violet-200 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="p-type" className="text-xs font-medium text-stone-500">
              待领取物料类型
            </label>
            <div className="relative">
              <select
                id="p-type"
                value={rewardType}
                onChange={(e) => setRewardType(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-200/90 bg-white py-3 pl-4 pr-10 text-sm shadow-sm outline-none ring-rose-100/80 focus:border-rose-200 focus:ring-2"
              >
                {REWARD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                ▾
              </span>
            </div>
            {rewardType === 'other' && (
              <input
                value={rewardTypeCustom}
                onChange={(e) => setRewardTypeCustom(e.target.value)}
                placeholder="自定义物料名称"
                className="mt-2 w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-rose-200 focus:ring-2"
              />
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ChineseDateField
              label="领取开始日期"
              value={periodStart}
              onChange={setPeriodStart}
              placeholder="点击选择开始日期"
            />
            <ChineseDateField
              label="领取截止日期"
              value={periodEnd}
              onChange={setPeriodEnd}
              placeholder="点击选择截止日期"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="p-loc" className="text-xs font-medium text-stone-500">
              领取地点
            </label>
            <input
              id="p-loc"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="例如：蓝色广场 · 剧场 MD 柜台"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-sky-100/80 focus:border-sky-200 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">备注备忘</span>
            <div className="rounded-2xl border border-sky-200/60 bg-[#f8fcff] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div
                className="rounded-[1.15rem] bg-[linear-gradient(rgba(120,150,180,0.06)_1px,transparent_1px)] bg-[length:100%_1.4rem] px-4 pb-3 pt-2"
                style={{ backgroundPosition: '0 0.35rem' }}
              >
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={5}
                  placeholder="领取注意事项、排队信息、是否需要票根等……"
                  className="w-full resize-y bg-transparent font-serif text-sm leading-[1.4rem] text-stone-800 outline-none placeholder:text-stone-400 placeholder:font-sans"
                />
              </div>
            </div>
          </div>

          {formError && (
            <p className="rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-2 text-sm text-rose-800/90">
              {formError}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-stone-200/90 bg-white py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              取消
            </button>
            <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PendingMaterialsPage() {
  const [items, setItems] = useState(initialPending)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)
  const [editingItem, setEditingItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const sorted = [...items].sort((a, b) => {
    const sa = getReminderStatus(a.periodEnd).status
    const sb = getReminderStatus(b.periodEnd).status
    const order = { soon: 0, normal: 1, expired: 2 }
    const diff = (order[sa] ?? 9) - (order[sb] ?? 9)
    if (diff !== 0) return diff
    return a.periodEnd.localeCompare(b.periodEnd)
  })

  function openAdd() {
    setEditingItem(null)
    setModalKey((k) => k + 1)
    setModalOpen(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setModalKey((k) => k + 1)
    setModalOpen(true)
  }

  function handleSave(row) {
    setItems((list) => {
      const exists = list.some((x) => x.id === row.id)
      if (exists) return list.map((x) => (x.id === row.id ? row : x))
      return [row, ...list]
    })
  }

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              待领物料整理
            </h1>
            <PageModuleSubtitle>记录尚未领取的积点奖励物料</PageModuleSubtitle>
          </div>
          <button type="button" onClick={openAdd} className={archivePrimaryButtonClass()}>
            添加待领物料
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2">
          {sorted.map((m) => {
            const { remaining, status, label } = getReminderStatus(m.periodEnd)
            const tone = statusCardTone(status)
            const periodLabel = `${formatChineseDateShortFromISO(m.periodStart)} — ${formatChineseDateShortFromISO(m.periodEnd)}`

            return (
              <li
                key={m.id}
                className={`flex flex-col rounded-[1.35rem] border ${tone.border} ${tone.bg} p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-12px_rgba(0,0,0,0.07)] ring-1 ${tone.ring}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    {m.musicalName}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tone.badge}`}
                  >
                    {label}
                  </span>
                </div>

                <p className={`mt-2 text-sm font-medium leading-snug ${tone.headline}`}>
                  {reminderHeadline(m.musicalName, remaining, status)}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200/70">
                    {displayRewardType(m)}
                  </span>
                  <span className="text-xs tabular-nums text-stone-500">
                    剩余{' '}
                    <span className="font-semibold text-stone-800">{getDaysUntilDeadline(m.periodEnd)}</span> 天
                  </span>
                </div>

                <dl className="mt-4 space-y-2 border-t border-white/50 pt-4 text-sm text-stone-600">
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500">领取期间</dt>
                    <dd className="max-w-[65%] text-right text-stone-800">{periodLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500">领取地点</dt>
                    <dd className="max-w-[65%] text-right leading-snug text-stone-800">{m.pickupLocation}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">备忘摘要</p>
                  <p className="mt-1 rounded-xl border border-sky-200/45 bg-white/70 px-3 py-2 font-serif text-sm leading-relaxed text-stone-700">
                    {summarizeMemo(m.memo)}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/40 pt-4">
                  <button type="button" onClick={() => openEdit(m)} className={archiveGhostButtonClass(false)}>
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmDelete({
                        id: m.id,
                        title: '删除待领物料',
                        detail: `确定删除「${m.musicalName} · ${displayRewardType(m)}」的待领记录吗？`,
                      })
                    }
                    className={archiveDangerButtonClass()}
                  >
                    删除
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {modalOpen && (
        <PendingFormModal
          key={modalKey}
          editingItem={editingItem}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        title={confirmDelete?.title ?? ''}
        detail={confirmDelete?.detail}
        confirmLabel="删除"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (confirmDelete?.id) {
            setItems((list) => list.filter((x) => x.id !== confirmDelete.id))
          }
          setConfirmDelete(null)
        }}
      />
    </div>
  )
}
