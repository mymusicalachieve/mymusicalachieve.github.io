import { useEffect, useMemo, useState } from 'react'
import ChineseDateField from '../components/ChineseDateField.jsx'
import { formatChineseDate, toISODate } from '../lib/dateZh.js'
import { ConfirmDialog } from '../components/ConfirmDialog.jsx'
import {
  archiveDangerButtonClass,
  archiveGhostButtonClass,
  archivePrimaryButtonClass,
} from '../components/ArchiveActions.jsx'
import PageModuleSubtitle from '../components/PageModuleSubtitle.jsx'
import { useAppData } from '../context/useAppData.js'
import DemoBadge from '../components/DemoBadge.jsx'

function uid() {
  return crypto.randomUUID()
}

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function shortDate(iso) {
  if (!iso) return ''
  const [y, mo] = iso.split('-')
  return `${y}.${mo}`
}

function ensurePlateFields(plate) {
  return {
    boardTitle: '',
    createdAt: '',
    ...plate,
  }
}

/** 场次状态：兼容旧数据仅有 done / planned */
const SESSION_STATUSES = ['planned', 'in_progress', 'done', 'cancelled']

function normalizeSessionStatus(status) {
  if (status === 'done' || status === 'planned' || status === 'in_progress' || status === 'cancelled') {
    return status
  }
  return 'planned'
}

function ensureSessionFields(session) {
  const s = { ...session }
  s.status = normalizeSessionStatus(s.status)
  if (typeof s.title !== 'string') s.title = ''
  if (typeof s.memo !== 'string') s.memo = ''
  if (typeof s.rewardNote !== 'string') s.rewardNote = ''
  if (typeof s.updatedAt !== 'string') s.updatedAt = ''
  if (typeof s.completedAt !== 'string') s.completedAt = ''
  return s
}

function sessionContributesToExpected(s) {
  return normalizeSessionStatus(s.status) !== 'cancelled'
}

function sessionPoints(session) {
  return session.multiplier
}

function computePlateStats(plate) {
  const sessions = plate.sessions.map(ensureSessionFields)
  const current = sessions
    .filter((s) => normalizeSessionStatus(s.status) === 'done')
    .reduce((sum, s) => sum + sessionPoints(s), 0)
  const expected = sessions
    .filter(sessionContributesToExpected)
    .reduce((sum, s) => sum + sessionPoints(s), 0)
  const target = plate.targetPoints
  const remainingByExpected = Math.max(0, target - expected)
  const remainingByCurrent = Math.max(0, target - current)
  const nodes = [...plate.rewardNodes].sort((a, b) => a.at - b.at)
  const unlockedByCurrent = nodes.filter((n) => n.at <= current)
  const expectedPoints = expected
  const nextNode = nodes.find((n) => n.at > current)
  const nextRewardGap = nextNode ? Math.max(0, nextNode.at - current) : 0
  const canCompleteTarget = expected >= target
  return {
    current,
    expected,
    target,
    remainingByExpected,
    remainingByCurrent,
    nodes,
    unlockedByCurrent,
    nextNode,
    nextRewardGap,
    canCompleteTarget,
    expectedPoints,
  }
}

function plateDisplayLabel(plate, allPlates) {
  const p = ensurePlateFields(plate)
  const sameNamePlates = allPlates.filter((x) => x.name === p.name)
  const idx = sameNamePlates.findIndex((x) => x.id === p.id) + 1
  const stats = computePlateStats(plate)
  const progress = `${stats.current}/${stats.target}`
  const title = p.boardTitle || `第${idx}盘`
  return `${p.name}｜${title}｜${progress}`
}

function plateSubLabel(plate, allPlates) {
  const p = ensurePlateFields(plate)
  const sameNamePlates = allPlates.filter((x) => x.name === p.name)
  const idx = sameNamePlates.findIndex((x) => x.id === p.id) + 1
  const title = p.boardTitle || `第${idx}盘`
  const created = p.createdAt ? ` · ${shortDate(p.createdAt)} 创建` : ''
  return `${title}${created}`
}

function uniqueMusicalNames(plates) {
  const seen = new Set()
  return plates.reduce((acc, p) => {
    if (!seen.has(p.name)) {
      seen.add(p.name)
      acc.push(p.name)
    }
    return acc
  }, [])
}

const slotLabels = { matinee: '午场', evening: '晚场' }
const multLabels = { 1: '1倍', 2: '2倍', 3: '3倍' }
const statusLabels = {
  planned: '已计划',
  in_progress: '进行中',
  done: '已完成',
  cancelled: '已取消',
}
const statusIcons = {
  planned: '○',
  in_progress: '◐',
  done: '✓',
  cancelled: '⊘',
}

function buildNewSession({
  dateStr,
  slot,
  multiplier,
  status,
  title = '',
  memo = '',
  rewardNote = '',
}) {
  const ns = normalizeSessionStatus(status)
  const today = todayISO()
  return {
    id: uid(),
    date: dateStr,
    slot,
    multiplier,
    status: ns,
    title: title.trim(),
    memo: memo.trim(),
    rewardNote: rewardNote.trim(),
    updatedAt: today,
    completedAt: ns === 'done' ? today : '',
  }
}

function mergeSessionOnSave(prevSession, updates) {
  const s = ensureSessionFields(prevSession)
  const merged = { ...s, ...updates }
  if (typeof merged.title === 'string') merged.title = merged.title.trim()
  if (typeof merged.memo === 'string') merged.memo = merged.memo.trim()
  if (typeof merged.rewardNote === 'string') merged.rewardNote = merged.rewardNote.trim()
  const ns = normalizeSessionStatus(merged.status)
  const today = todayISO()
  let completedAt = s.completedAt
  if (ns === 'done') {
    if (!completedAt) completedAt = today
  } else {
    completedAt = ''
  }
  return {
    ...merged,
    status: ns,
    updatedAt: today,
    completedAt,
  }
}

const cardAccents = [
  'border-l-rose-300/90',
  'border-l-teal-300/90',
  'border-l-violet-300/90',
]

const barFills = ['bg-rose-400/55', 'bg-teal-400/50', 'bg-violet-400/50']

function ProgressBar({ value, max, fillClass }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200/70"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuetext={`${value} / ${max}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${fillClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function RewardTimeline({ nodes, currentPoints, expectedPoints }) {
  return (
    <div className="relative">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
        奖励节点
      </p>
      <ol className="space-y-0">
        {nodes.map((node, index) => {
          const achieved = node.at <= currentPoints
          const reachableByPlan = node.at <= expectedPoints && !achieved
          const isLast = index === nodes.length - 1
          return (
            <li key={node.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className="absolute bottom-0 left-[7px] top-4 w-px bg-stone-200/90"
                  aria-hidden
                />
              )}
              <div className="relative z-[1] flex shrink-0 flex-col items-center pt-0.5">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border-2 text-[10px] font-semibold ${
                    achieved
                      ? 'border-teal-400/80 bg-teal-100 text-teal-800'
                      : reachableByPlan
                        ? 'border-amber-300/90 bg-amber-50 text-amber-900/80'
                        : 'border-stone-200 bg-white text-stone-400'
                  }`}
                >
                  {achieved ? '✓' : ''}
                </span>
              </div>
              <div className="min-w-0 flex-1 pt-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      achieved ? 'text-teal-900/90' : 'text-stone-800'
                    }`}
                  >
                    {node.at} 点
                  </span>
                  {achieved && (
                    <span className="rounded-full bg-teal-100/90 px-2 py-0.5 text-[10px] font-medium text-teal-800">
                      已达成
                    </span>
                  )}
                  {!achieved && reachableByPlan && (
                    <span className="rounded-full bg-amber-100/90 px-2 py-0.5 text-[10px] font-medium text-amber-900/80">
                      计划内可达成
                    </span>
                  )}
                  {!achieved && !reachableByPlan && (
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500">
                      未达成
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1 text-sm leading-relaxed ${
                    achieved ? 'text-teal-900/85' : 'text-stone-600'
                  }`}
                >
                  {node.label}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function RewardNodeEditor({ rewardRows, setRewardRows, accentColor = 'rose' }) {
  function addRow() {
    setRewardRows((r) => [...r, { id: uid(), threshold: '', label: '' }])
  }
  function removeRow(id) {
    setRewardRows((r) => (r.length <= 1 ? r : r.filter((x) => x.id !== id)))
  }
  function updateRow(id, field, value) {
    setRewardRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-stone-500">奖励节点设置</span>
        <button
          type="button"
          onClick={addRow}
          className={`text-xs font-medium text-${accentColor}-700/90 hover:text-${accentColor}-800`}
        >
          + 添加节点
        </button>
      </div>
      <div className="space-y-2 rounded-2xl border border-violet-100/90 bg-violet-50/35 p-3">
        {rewardRows.map((row) => (
          <div key={row.id} className="flex flex-wrap items-end gap-2">
            <div className="min-w-[4.5rem] flex-1 space-y-1">
              <span className="text-[10px] uppercase tracking-wide text-stone-500">点数</span>
              <input
                value={row.threshold}
                onChange={(e) => updateRow(row.id, 'threshold', e.target.value)}
                inputMode="numeric"
                placeholder="3"
                className="w-full rounded-xl border border-stone-200/80 bg-white px-3 py-2 text-sm tabular-nums outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-100"
              />
            </div>
            <div className="min-w-0 flex-[2] space-y-1">
              <span className="text-[10px] uppercase tracking-wide text-stone-500">奖励内容</span>
              <input
                value={row.label}
                onChange={(e) => updateRow(row.id, 'label', e.target.value)}
                placeholder="例如：优惠券"
                className="w-full rounded-xl border border-stone-200/80 bg-white px-3 py-2 text-sm outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-100"
              />
            </div>
            <button
              type="button"
              onClick={() => removeRow(row.id)}
              className="shrink-0 rounded-xl border border-transparent px-2 py-2 text-xs text-stone-400 hover:bg-white/80 hover:text-stone-600"
            >
              移除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function AddRecordModal({ open, onClose, plates, onSubmit }) {
  const musicalNames = useMemo(() => uniqueMusicalNames(plates), [plates])
  const hasPlates = plates.length > 0

  const [plateMode, setPlateMode] = useState(() =>
    hasPlates ? 'existing' : 'brand_new',
  )
  const [selectedPlateId, setSelectedPlateId] = useState(() => plates[0]?.id ?? '')

  const [cloneFromMusical, setCloneFromMusical] = useState(() => musicalNames[0] ?? '')
  const [newName, setNewName] = useState('')
  const [boardTitle, setBoardTitle] = useState('')
  const [newTarget, setNewTarget] = useState(() => {
    if (hasPlates && musicalNames.length > 0) {
      const t = plates.find((p) => p.name === musicalNames[0])
      if (t) return String(t.targetPoints)
    }
    return '9'
  })
  const [rewardRows, setRewardRows] = useState(() => {
    if (hasPlates && musicalNames.length > 0) {
      const t = plates.find((p) => p.name === musicalNames[0])
      if (t) return t.rewardNodes.map((n) => ({ id: uid(), threshold: String(n.at), label: n.label }))
    }
    return [
      { id: uid(), threshold: '3', label: '优惠券' },
      { id: uid(), threshold: '6', label: '拍立得' },
      { id: uid(), threshold: '10', label: '限定周边' },
    ]
  })

  const [selectedDate, setSelectedDate] = useState(undefined)
  const [slot, setSlot] = useState('matinee')
  const [multiplier, setMultiplier] = useState(1)
  const [status, setStatus] = useState('planned')
  const [sessionTitle, setSessionTitle] = useState('')
  const [sessionMemo, setSessionMemo] = useState('')
  const [rewardNote, setRewardNote] = useState('')
  const [formError, setFormError] = useState('')

  function applyTemplate(musicalName) {
    const template = plates.find((p) => p.name === musicalName)
    if (!template) return
    setNewTarget(String(template.targetPoints))
    setRewardRows(
      template.rewardNodes.map((n) => ({
        id: uid(),
        threshold: String(n.at),
        label: n.label,
      })),
    )
  }

  function handleCloneMusicalChange(val) {
    setCloneFromMusical(val)
    applyTemplate(val)
  }

  function handleModeChange(mode) {
    setPlateMode(mode)
    if (mode === 'clone' && cloneFromMusical) {
      applyTemplate(cloneFromMusical)
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function buildNodesFromRows() {
    const nodes = rewardRows
      .map((row) => ({
        at: Number.parseInt(row.threshold, 10),
        label: row.label.trim(),
        id: uid(),
      }))
      .filter((n) => Number.isFinite(n.at) && n.at >= 1 && n.label)
    nodes.sort((a, b) => a.at - b.at)
    return nodes
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!selectedDate) {
      setFormError('请选择日期')
      return
    }
    const dateStr = toISODate(selectedDate)
    const session = buildNewSession({
      dateStr,
      slot,
      multiplier,
      status,
      title: sessionTitle,
      memo: sessionMemo,
      rewardNote,
    })

    if (plateMode === 'existing') {
      if (!selectedPlateId) {
        setFormError('请选择要添加到的积点盘')
        return
      }
      onSubmit({ type: 'append', plateId: selectedPlateId, session })
      onClose()
      return
    }

    const isClone = plateMode === 'clone'
    const name = isClone ? cloneFromMusical : newName.trim()
    if (!name) {
      setFormError(isClone ? '请选择音乐剧' : '请填写音乐剧名称')
      return
    }
    const target = Number.parseInt(newTarget, 10)
    if (!Number.isFinite(target) || target < 1) {
      setFormError('积点盘总点数需为不小于 1 的整数')
      return
    }
    const nodes = buildNodesFromRows()
    if (!nodes.length) {
      setFormError('请至少填写一个有效的奖励节点（点数与奖励内容）')
      return
    }
    onSubmit({
      type: 'new',
      plate: {
        id: uid(),
        name,
        boardTitle: boardTitle.trim(),
        createdAt: todayISO(),
        targetPoints: target,
        rewardNodes: nodes,
        sessions: [session],
      },
    })
    onClose()
  }

  if (!open) return null

  const modes = []
  if (hasPlates) modes.push({ key: 'existing', label: '添加到已有积点盘' })
  if (musicalNames.length > 0) modes.push({ key: 'clone', label: '基于已有剧新建盘' })
  modes.push({ key: 'brand_new', label: '创建全新剧的积点盘' })

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
        aria-labelledby="stamp-modal-title"
        className="relative z-[1] max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-rose-100/80 bg-[#fffdfd] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]"
      >
        <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-rose-100/70 bg-[#fffdfd] px-5 py-4 sm:px-6">
          <h2 id="stamp-modal-title" className="text-base font-semibold text-stone-800">
            添加积点记录
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 transition hover:bg-rose-50 hover:text-stone-600"
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-6">
          {modes.length > 1 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-stone-500">记录方式</span>
              <div className="flex flex-wrap gap-2">
                {modes.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => handleModeChange(m.key)}
                    className={archiveGhostButtonClass(plateMode === m.key)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {plateMode === 'existing' && (
            <div className="space-y-2">
              <label htmlFor="plate-select" className="text-xs font-medium text-stone-500">
                选择积点盘
              </label>
              <div className="relative">
                <select
                  id="plate-select"
                  value={selectedPlateId}
                  onChange={(e) => setSelectedPlateId(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-stone-200/90 bg-white py-3 pl-4 pr-10 text-sm text-stone-800 shadow-sm outline-none ring-rose-100/80 focus:border-rose-200 focus:ring-2"
                >
                  {plates.map((p) => (
                    <option key={p.id} value={p.id}>
                      {plateDisplayLabel(p, plates)}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                  ▾
                </span>
              </div>
            </div>
          )}

          {plateMode === 'clone' && (
            <>
              <div className="space-y-2">
                <label htmlFor="clone-musical" className="text-xs font-medium text-stone-500">
                  选择已有音乐剧
                </label>
                <div className="relative">
                  <select
                    id="clone-musical"
                    value={cloneFromMusical}
                    onChange={(e) => handleCloneMusicalChange(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-stone-200/90 bg-white py-3 pl-4 pr-10 text-sm text-stone-800 shadow-sm outline-none ring-teal-100/80 focus:border-teal-200 focus:ring-2"
                  >
                    {musicalNames.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                    ▾
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  将自动继承该剧已有的积点盘总点数与奖励节点，你可以在下方修改。
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="board-title-clone" className="text-xs font-medium text-stone-500">
                  盘标题（可选）
                </label>
                <input
                  id="board-title-clone"
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  placeholder="例如：韩卡交换盘、2026春季盘"
                  className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-rose-100/80 placeholder:text-stone-400 focus:border-rose-200 focus:ring-2"
                />
                <p className="text-xs text-stone-500">留空将自动按序号命名（如"第2盘"）</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="target-points-clone" className="text-xs font-medium text-stone-500">
                  积点盘总点数
                </label>
                <input
                  id="target-points-clone"
                  type="number"
                  min={1}
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-teal-100/80 focus:border-teal-200 focus:ring-2"
                />
              </div>
              <RewardNodeEditor rewardRows={rewardRows} setRewardRows={setRewardRows} accentColor="teal" />
            </>
          )}

          {plateMode === 'brand_new' && (
            <>
              <div className="space-y-2">
                <label htmlFor="musical-name" className="text-xs font-medium text-stone-500">
                  音乐剧名称
                </label>
                <input
                  id="musical-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="例如：汉密尔顿"
                  className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-rose-100/80 placeholder:text-stone-400 focus:border-rose-200 focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="board-title-new" className="text-xs font-medium text-stone-500">
                  盘标题（可选）
                </label>
                <input
                  id="board-title-new"
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  placeholder="例如：韩卡交换盘、2026春季盘"
                  className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-rose-100/80 placeholder:text-stone-400 focus:border-rose-200 focus:ring-2"
                />
                <p className="text-xs text-stone-500">留空将自动按序号命名（如"第1盘"）</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="target-points" className="text-xs font-medium text-stone-500">
                  积点盘总点数
                </label>
                <input
                  id="target-points"
                  type="number"
                  min={1}
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-teal-100/80 focus:border-teal-200 focus:ring-2"
                />
                <p className="text-xs text-stone-500">例如 6 点盘、9 点盘、10 点盘</p>
              </div>
              <RewardNodeEditor rewardRows={rewardRows} setRewardRows={setRewardRows} accentColor="rose" />
            </>
          )}

          <div className="space-y-2">
            <label htmlFor="session-title" className="text-xs font-medium text-stone-500">
              积点名称（可选）
            </label>
            <input
              id="session-title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              placeholder="例如：首刷末场、朋友代刷"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-rose-100/80 placeholder:text-stone-400 focus:border-rose-200 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">备注</span>
            <div className="rounded-2xl border border-amber-200/50 bg-[#fffdf8] p-3">
              <textarea
                value={sessionMemo}
                onChange={(e) => setSessionMemo(e.target.value)}
                rows={2}
                placeholder="场次备忘、座位、同行等"
                className="w-full resize-none bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="reward-note" className="text-xs font-medium text-stone-500">
              奖励 / 物料相关备注（可选）
            </label>
            <input
              id="reward-note"
              value={rewardNote}
              onChange={(e) => setRewardNote(e.target.value)}
              placeholder="例如：可领拍立得、需柜台登记"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none ring-violet-100/80 placeholder:text-stone-400 focus:border-violet-200 focus:ring-2"
            />
          </div>

          <ChineseDateField
            label="日期"
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="点击选择日期"
          />

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">午场 / 晚场</span>
            <div className="flex gap-2">
              {[
                { key: 'matinee', label: '午场' },
                { key: 'evening', label: '晚场' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSlot(key)}
                  className={archiveGhostButtonClass(slot === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="mult-select" className="text-xs font-medium text-stone-500">
              积点倍率
            </label>
            <div className="relative">
              <select
                id="mult-select"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full appearance-none rounded-2xl border border-stone-200/90 bg-white py-3 pl-4 pr-10 text-sm text-stone-800 shadow-sm outline-none ring-violet-100/80 focus:border-violet-200 focus:ring-2"
              >
                <option value={1}>1倍</option>
                <option value={2}>2倍</option>
                <option value={3}>3倍</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                ▾
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">状态</span>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'planned', label: '○ 已计划' },
                { key: 'in_progress', label: '◐ 进行中' },
                { key: 'done', label: '✓ 已完成' },
                { key: 'cancelled', label: '⊘ 已取消' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={archiveGhostButtonClass(status === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {formError && (
            <p className="rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-2 text-sm text-rose-800/90">
              {formError}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-stone-200/90 bg-white py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              取消
            </button>
            <button
              type="submit"
              className={`flex-1 ${archivePrimaryButtonClass()}`}
            >
              保存记录
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditPlateModal({ plate, onClose, onSave }) {
  const [name, setName] = useState(plate.name)
  const [boardTitle, setBoardTitle] = useState(ensurePlateFields(plate).boardTitle)
  const [targetStr, setTargetStr] = useState(String(plate.targetPoints))
  const [rewardRows, setRewardRows] = useState(() =>
    plate.rewardNodes.map((n) => ({
      id: n.id,
      threshold: String(n.at),
      label: n.label,
    })),
  )
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    const trimmed = name.trim()
    if (!trimmed) {
      setFormError('请填写音乐剧名称')
      return
    }
    const target = Number.parseInt(targetStr, 10)
    if (!Number.isFinite(target) || target < 1) {
      setFormError('积点盘总点数需为不小于 1 的整数')
      return
    }
    const nodesBuilt = rewardRows
      .map((row) => {
        const at = Number.parseInt(row.threshold, 10)
        const label = row.label.trim()
        const keepId = plate.rewardNodes.some((n) => n.id === row.id)
        return { id: keepId ? row.id : uid(), at, label }
      })
      .filter((n) => Number.isFinite(n.at) && n.at >= 1 && n.label)
    if (!nodesBuilt.length) {
      setFormError('请至少保留一个有效的奖励节点')
      return
    }
    nodesBuilt.sort((a, b) => a.at - b.at)
    onSave({
      ...ensurePlateFields(plate),
      name: trimmed,
      boardTitle: boardTitle.trim(),
      targetPoints: target,
      rewardNodes: nodesBuilt,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-stone-900/20" aria-label="关闭" onClick={onClose} />
      <div className="relative z-[1] max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-teal-100/80 bg-[#fcfdfd] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]">
        <div className="sticky top-0 flex items-center justify-between border-b border-teal-100/70 bg-[#fcfdfd] px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-stone-800">编辑积点盘</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-teal-50 hover:text-stone-600"
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone-500">音乐剧名称</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-teal-200 focus:ring-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone-500">盘标题（可选）</label>
            <input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              placeholder="例如：韩卡交换盘、2026春季盘"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none placeholder:text-stone-400 focus:border-teal-200 focus:ring-2"
            />
            <p className="text-xs text-stone-500">留空将自动按序号显示</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone-500">积点盘总点数</label>
            <input
              type="number"
              min={1}
              value={targetStr}
              onChange={(e) => setTargetStr(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-teal-200 focus:ring-2"
            />
          </div>
          <RewardNodeEditor rewardRows={rewardRows} setRewardRows={setRewardRows} accentColor="teal" />
          {formError && (
            <p className="rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-2 text-sm text-rose-800/90">
              {formError}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-stone-200/90 bg-white py-3 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              取消
            </button>
            <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function parseISODate(iso) {
  if (!iso) return undefined
  const [y, mo, d] = iso.split('-').map(Number)
  if (!y || !mo || !d) return undefined
  return new Date(y, mo - 1, d)
}

function EditSessionModal({ plateName, session, onClose, onSave }) {
  const [selectedDate, setSelectedDate] = useState(() => parseISODate(session.date))
  const [slot, setSlot] = useState(session.slot)
  const [multiplier, setMultiplier] = useState(session.multiplier)
  const [status, setStatus] = useState(() => normalizeSessionStatus(session.status))
  const [sessionTitle, setSessionTitle] = useState(() => ensureSessionFields(session).title)
  const [sessionMemo, setSessionMemo] = useState(() => ensureSessionFields(session).memo)
  const [rewardNote, setRewardNote] = useState(() => ensureSessionFields(session).rewardNote)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!selectedDate) {
      setFormError('请选择日期')
      return
    }
    onSave(
      mergeSessionOnSave(session, {
        date: toISODate(selectedDate),
        slot,
        multiplier,
        status,
        title: sessionTitle,
        memo: sessionMemo,
        rewardNote,
      }),
    )
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-stone-900/20" aria-label="关闭" onClick={onClose} />
      <div className="relative z-[1] max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-violet-100/80 bg-[#fdfcfe] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]">
        <div className="sticky top-0 border-b border-violet-100/70 bg-[#fdfcfe] px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-stone-800">编辑积点场次</h2>
          <p className="mt-1 text-xs text-stone-500">{plateName}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-6">
          <ChineseDateField label="日期" value={selectedDate} onChange={setSelectedDate} />

          <div className="space-y-2">
            <label htmlFor="es-title" className="text-xs font-medium text-stone-500">
              积点名称（可选）
            </label>
            <input
              id="es-title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              placeholder="例如：首刷末场"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-violet-200 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">备注</span>
            <div className="rounded-2xl border border-amber-200/50 bg-[#fffdf8] p-3">
              <textarea
                value={sessionMemo}
                onChange={(e) => setSessionMemo(e.target.value)}
                rows={3}
                placeholder="场次备忘、座位、同行等"
                className="w-full resize-none bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="es-reward" className="text-xs font-medium text-stone-500">
              奖励 / 物料相关备注（可选）
            </label>
            <input
              id="es-reward"
              value={rewardNote}
              onChange={(e) => setRewardNote(e.target.value)}
              placeholder="例如：可领拍立得"
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-violet-200 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">午场 / 晚场</span>
            <div className="flex gap-2">
              {[
                { key: 'matinee', label: '午场' },
                { key: 'evening', label: '晚场' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSlot(key)}
                  className={archiveGhostButtonClass(slot === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="es-mult" className="text-xs font-medium text-stone-500">
              积点倍率
            </label>
            <div className="relative">
              <select
                id="es-mult"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full appearance-none rounded-2xl border border-stone-200/90 bg-white py-3 pl-4 pr-10 text-sm shadow-sm outline-none focus:border-violet-200 focus:ring-2"
              >
                <option value={1}>1倍</option>
                <option value={2}>2倍</option>
                <option value={3}>3倍</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                ▾
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">状态</span>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'planned', label: '○ 已计划' },
                { key: 'in_progress', label: '◐ 进行中' },
                { key: 'done', label: '✓ 已完成' },
                { key: 'cancelled', label: '⊘ 已取消' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
                  className={archiveGhostButtonClass(status === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {formError && (
            <p className="rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-2 text-sm text-rose-800/90">
              {formError}
            </p>
          )}
          <div className="flex gap-3">
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

function ChevronIcon({ open }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-stone-400 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function groupPlatesByName(plates) {
  const map = new Map()
  plates.forEach((plate) => {
    const key = plate.name
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(plate)
  })
  return Array.from(map.entries())
}

function GroupSummaryBar({ groupPlates }) {
  let totalCurrent = 0
  let totalTarget = 0
  for (const p of groupPlates) {
    const s = computePlateStats(p)
    totalCurrent += s.current
    totalTarget += s.target
  }
  const pct = totalTarget > 0 ? Math.min(100, Math.round((totalCurrent / totalTarget) * 100)) : 0
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200/70">
        <div
          className="h-full rounded-full bg-rose-400/55 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 text-xs tabular-nums text-stone-500">{pct}%</span>
    </div>
  )
}

function sessionStatusChipClass(statusRaw) {
  const key = normalizeSessionStatus(statusRaw)
  if (key === 'done') return 'bg-teal-50 text-teal-900/85 ring-1 ring-teal-100/80'
  if (key === 'in_progress') return 'bg-amber-50 text-amber-900/85 ring-1 ring-amber-100/80'
  if (key === 'cancelled') return 'bg-stone-100 text-stone-500 ring-1 ring-stone-200/70'
  return 'bg-sky-50 text-sky-900/85 ring-1 ring-sky-100/80'
}

function PlateCard({ plate, idx, allPlates, setEditPlateId, setSessionEdit, setConfirmState, setPlates }) {
  const stats = computePlateStats(plate)
  const accent = cardAccents[idx % cardAccents.length]
  const barFill = barFills[idx % barFills.length]
  const sessionsSorted = [...plate.sessions].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  )
  const currentStageLabel =
    stats.unlockedByCurrent.length === 0
      ? '尚未达成奖励节点'
      : `已达成 ${stats.unlockedByCurrent[stats.unlockedByCurrent.length - 1].at} 点档`
  const sub = plateSubLabel(plate, allPlates)

  return (
    <article
      className={`overflow-hidden rounded-[1.35rem] border border-rose-100/60 bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_16px_40px_-12px_rgba(0,0,0,0.07)] ${accent} border-l-4`}
    >
      <div className="border-b border-stone-100/90 bg-rose-50/35 px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-stone-900">
              {sub}
              {plate.isDemo && <DemoBadge />}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              目标{' '}
              <span className="font-medium tabular-nums text-stone-800">{stats.target}</span> 点盘
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-50/90 px-3 py-1 text-xs font-medium text-teal-900/85 ring-1 ring-teal-100/80">
                当前积点 {stats.current}
              </span>
              <span className="rounded-full bg-violet-50/90 px-3 py-1 text-xs font-medium text-violet-900/85 ring-1 ring-violet-100/80">
                预计积点 {stats.expected}
              </span>
              <span className="rounded-full bg-amber-50/90 px-3 py-1 text-xs font-medium text-amber-900/85 ring-1 ring-amber-100/80">
                剩余所需 {stats.remainingByExpected}
              </span>
            </div>
            <div className="flex gap-2 sm:ml-2">
              <button
                type="button"
                onClick={() => setEditPlateId(plate.id)}
                className={archiveGhostButtonClass(false)}
              >
                编辑积点盘
              </button>
              <button
                type="button"
                onClick={() =>
                  setConfirmState({
                    title: '删除积点盘',
                    detail: `确定删除「${plate.name} · ${sub}」及全部场次与奖励节点吗？此操作无法撤销。`,
                    onConfirm: () => {
                      setPlates((p) => p.filter((x) => x.id !== plate.id))
                      setConfirmState(null)
                    },
                  })
                }
                className={archiveDangerButtonClass()}
              >
                删除积点盘
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-stone-500">
          「剩余所需」按预计积点（已计划 + 进行中 + 已完成；已取消不计入）计算；按仅已完成场次计，距离满盘还差{' '}
          <span className="font-medium tabular-nums text-stone-700">{stats.remainingByCurrent}</span> 点。
        </p>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs text-stone-500">
            <span>进度（按预计积点）</span>
            <span className="tabular-nums">
              {stats.expected} / {stats.target}
            </span>
          </div>
          <ProgressBar value={stats.expected} max={stats.target} fillClass={barFill} />
        </div>

        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-100/90 bg-white/70 px-4 py-3">
            <p className="text-xs text-stone-500">目标完成预测</p>
            <p className="mt-1 font-medium leading-snug text-stone-800">
              {stats.canCompleteTarget
                ? '在现有场次计划下，预计可以完成本盘目标。'
                : `按当前计划，预计尚缺 ${stats.remainingByExpected} 点可满盘。`}
            </p>
          </div>
          <div className="rounded-2xl border border-stone-100/90 bg-white/70 px-4 py-3">
            <p className="text-xs text-stone-500">已解锁奖励（按已完成积点）</p>
            <p className="mt-1 font-medium leading-snug text-stone-800">
              {stats.unlockedByCurrent.length
                ? stats.unlockedByCurrent.map((n) => `${n.at} 点：${n.label}`).join('；')
                : '暂无（仅统计已完成的场次）'}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-100/80 pt-4 text-sm">
          <p className="text-stone-600">
            奖励进度：
            <span className="ml-1 font-medium text-stone-900">{currentStageLabel}</span>
          </p>
          {stats.nextNode ? (
            <p className="text-stone-600">
              下一档「{stats.nextNode.at} 点 · {stats.nextNode.label}」还差{' '}
              <span className="font-semibold tabular-nums text-rose-700/90">
                {stats.nextRewardGap}
              </span>{' '}
              点（按已完成）
            </p>
          ) : (
            <p className="text-teal-800/90">全部奖励节点已按已完成积点达成。</p>
          )}
        </div>
      </div>

      <div className="grid gap-8 px-6 py-6 sm:grid-cols-2 sm:gap-10 sm:px-8 sm:py-8">
        <RewardTimeline
          nodes={stats.nodes}
          currentPoints={stats.current}
          expectedPoints={stats.expectedPoints}
        />
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
            积点场次
          </p>
          <div className="overflow-x-auto rounded-2xl border border-stone-100/90 bg-[#fdfcfc]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200/80 text-xs text-stone-500">
                  <th className="min-w-[9rem] px-3 py-2.5 font-medium">日期 / 积点</th>
                  <th className="px-3 py-2.5 font-medium">场次</th>
                  <th className="px-3 py-2.5 font-medium">倍率</th>
                  <th className="min-w-[10rem] px-3 py-2.5 font-medium">状态</th>
                  <th className="px-3 py-2.5 text-right font-medium tabular-nums">本场</th>
                  <th className="min-w-[8.5rem] px-3 py-2.5 text-right font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {sessionsSorted.map((sRaw) => {
                  const s = ensureSessionFields(sRaw)
                  const d = new Date(s.date + 'T12:00:00')
                  const st = normalizeSessionStatus(s.status)
                  return (
                    <tr
                      key={s.id}
                      className={`group/ses border-b border-stone-100/80 transition-colors last:border-0 ${
                        st === 'done' ? 'bg-teal-50/15' : ''
                      } ${st === 'cancelled' ? 'opacity-70' : ''}`}
                    >
                      <td className="max-w-[14rem] px-3 py-2.5 align-top text-stone-700">
                        <div className="text-sm">{formatChineseDate(d)}</div>
                        {s.title ? (
                          <div className="mt-0.5 text-xs font-medium text-stone-900">{s.title}</div>
                        ) : null}
                        {s.memo || s.rewardNote ? (
                          <div className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-stone-400">
                            {s.memo}
                            {s.memo && s.rewardNote ? ' · ' : ''}
                            {s.rewardNote}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-3 py-2.5 align-top text-stone-600">{slotLabels[s.slot]}</td>
                      <td className="px-3 py-2.5 align-top tabular-nums text-stone-600">
                        {multLabels[s.multiplier]}
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <div className="flex flex-col gap-2">
                          <span
                            className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${sessionStatusChipClass(s.status)}`}
                          >
                            {statusIcons[st]} {statusLabels[st]}
                          </span>
                          <div className="flex flex-wrap gap-0.5" title="快速切换状态">
                            {SESSION_STATUSES.map((nextSt) => (
                              <button
                                key={nextSt}
                                type="button"
                                aria-label={`设为${statusLabels[nextSt]}`}
                                onClick={() => {
                                  setPlates((p) =>
                                    p.map((pl) =>
                                      pl.id === plate.id
                                        ? {
                                            ...pl,
                                            sessions: pl.sessions.map((x) =>
                                              x.id === s.id ? mergeSessionOnSave(x, { status: nextSt }) : x,
                                            ),
                                          }
                                        : pl,
                                    ),
                                  )
                                }}
                                className={`rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums transition ${
                                  st === nextSt
                                    ? 'bg-rose-100/90 text-rose-900 ring-1 ring-rose-200/80'
                                    : 'text-stone-400 hover:bg-stone-100 hover:text-stone-700'
                                }`}
                              >
                                {statusIcons[nextSt]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-3 py-2.5 text-right align-top tabular-nums font-medium ${
                          st === 'cancelled' ? 'text-stone-400 line-through' : 'text-stone-800'
                        }`}
                      >
                        {st === 'cancelled' ? '—' : `+${sessionPoints(s)}`}
                      </td>
                      <td className="px-3 py-2.5 text-right align-top">
                        <div className="flex flex-col items-end gap-1 sm:flex-row sm:justify-end sm:gap-1">
                          <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover/ses:opacity-100">
                            <button
                              type="button"
                              onClick={() => setSessionEdit({ plateId: plate.id, session: s })}
                              className="rounded-lg px-2 py-1 text-xs font-medium text-teal-800/90 hover:bg-teal-50"
                            >
                              编辑
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmState({
                                  title: '删除积点场次',
                                  detail: `确定删除「${s.title || formatChineseDate(d)}」这条积点记录吗？`,
                                  onConfirm: () => {
                                    setPlates((p) =>
                                      p.map((pl) =>
                                        pl.id === plate.id
                                          ? {
                                              ...pl,
                                              sessions: pl.sessions.filter((x) => x.id !== s.id),
                                            }
                                          : pl,
                                      ),
                                    )
                                    setConfirmState(null)
                                  },
                                })
                              }
                              className="rounded-lg px-2 py-1 text-xs font-medium text-rose-700/90 hover:bg-rose-50"
                            >
                              删除
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function StampPlanningPage() {
  const { plates, setPlates } = useAppData()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)
  const [editPlateId, setEditPlateId] = useState(null)
  const [sessionEdit, setSessionEdit] = useState(null)
  const [confirmState, setConfirmState] = useState(null)
  const [openGroups, setOpenGroups] = useState(() => new Set())

  const groups = useMemo(() => groupPlatesByName(plates), [plates])

  const editingPlate = editPlateId ? plates.find((p) => p.id === editPlateId) : null
  const sessionEditPlate =
    sessionEdit && plates.find((p) => p.id === sessionEdit.plateId)

  function toggleGroup(name) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function handleModalSubmit(payload) {
    if (payload.type === 'new') {
      setPlates((p) => [...p, payload.plate])
      setOpenGroups((prev) => new Set(prev).add(payload.plate.name))
      return
    }
    setPlates((p) =>
      p.map((pl) =>
        pl.id === payload.plateId
          ? { ...pl, sessions: [...pl.sessions, payload.session] }
          : pl,
      ),
    )
  }

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              积点盘整理及规划
            </h1>
            <PageModuleSubtitle>记录与规划音乐剧积点进度</PageModuleSubtitle>
          </div>
          <div className="flex gap-2">
            {groups.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const allOpen = groups.every(([name]) => openGroups.has(name))
                  if (allOpen) setOpenGroups(new Set())
                  else setOpenGroups(new Set(groups.map(([name]) => name)))
                }}
                className={archiveGhostButtonClass(false)}
              >
                {groups.every(([name]) => openGroups.has(name)) ? '全部折叠' : '全部展开'}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setModalKey((k) => k + 1)
                setModalOpen(true)
              }}
              className={archivePrimaryButtonClass()}
            >
              添加积点记录
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6">
        {groups.map(([name, groupPlates]) => {
          const isOpen = openGroups.has(name)
          return (
            <section
              key={name}
              className="overflow-hidden rounded-[1.35rem] border border-rose-100/60 bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_10px_28px_-10px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-2 px-6 py-5 sm:px-8">
                <button
                  type="button"
                  onClick={() => toggleGroup(name)}
                  className="flex min-w-0 flex-1 items-center gap-4 text-left transition hover:opacity-80"
                >
                  <ChevronIcon open={isOpen} />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-semibold tracking-tight text-stone-900">
                      {name}
                    </h2>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                      <span>{groupPlates.length} 个积点盘</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden w-32 sm:block">
                        <GroupSummaryBar groupPlates={groupPlates} />
                      </span>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setConfirmState({
                      title: '删除整个剧分组',
                      detail: `确定删除《${name}》的全部 ${groupPlates.length} 个积点盘吗？此操作不可撤销。`,
                      onConfirm: () => {
                        setPlates((prev) => prev.filter((p) => p.name !== name))
                        setConfirmState(null)
                      },
                    })
                  }
                  className="shrink-0 rounded-xl px-3 py-2 text-xs font-medium text-rose-700/80 transition hover:bg-rose-50 hover:text-rose-800"
                  title="删除整个分组"
                >
                  删除分组
                </button>
              </div>

              {isOpen && (
                <div className="space-y-6 border-t border-stone-100/80 px-4 py-5 sm:px-6 sm:py-6">
                  {groupPlates.map((plate, idx) => (
                    <PlateCard
                      key={plate.id}
                      plate={plate}
                      idx={idx}
                      allPlates={plates}
                      setEditPlateId={setEditPlateId}
                      setSessionEdit={setSessionEdit}
                      setConfirmState={setConfirmState}
                      setPlates={setPlates}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>

      <AddRecordModal
        key={modalKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plates={plates}
        onSubmit={handleModalSubmit}
      />

      {editingPlate && (
        <EditPlateModal
          key={editingPlate.id}
          plate={editingPlate}
          onClose={() => setEditPlateId(null)}
          onSave={(updated) => {
            setPlates((p) => p.map((x) => (x.id === updated.id ? updated : x)))
            setEditPlateId(null)
          }}
        />
      )}

      {sessionEdit && sessionEditPlate && (
        <EditSessionModal
          key={sessionEdit.session.id}
          plateName={plateDisplayLabel(sessionEditPlate, plates)}
          session={sessionEdit.session}
          onClose={() => setSessionEdit(null)}
          onSave={(updatedSession) => {
            setPlates((p) =>
              p.map((pl) =>
                pl.id === sessionEdit.plateId
                  ? {
                      ...pl,
                      sessions: pl.sessions.map((s) =>
                        s.id === updatedSession.id ? updatedSession : s,
                      ),
                    }
                  : pl,
              ),
            )
            setSessionEdit(null)
          }}
        />
      )}

      <ConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.title ?? ''}
        detail={confirmState?.detail}
        confirmLabel="确定"
        onCancel={() => setConfirmState(null)}
        onConfirm={() => {
          confirmState?.onConfirm?.()
        }}
      />
    </div>
  )
}
