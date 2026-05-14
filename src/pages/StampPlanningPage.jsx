import { useEffect, useState } from 'react'
import ChineseDateField from '../components/ChineseDateField.jsx'
import { formatChineseDate, toISODate } from '../lib/dateZh.js'
import { ConfirmDialog } from '../components/ConfirmDialog.jsx'
import {
  archiveDangerButtonClass,
  archiveGhostButtonClass,
  archivePrimaryButtonClass,
} from '../components/ArchiveActions.jsx'
import PageModuleSubtitle from '../components/PageModuleSubtitle.jsx'

function uid() {
  return crypto.randomUUID()
}

function sessionPoints(session) {
  return session.multiplier
}

function computePlateStats(plate) {
  const current = plate.sessions
    .filter((s) => s.status === 'done')
    .reduce((sum, s) => sum + sessionPoints(s), 0)
  const expected = plate.sessions.reduce((sum, s) => sum + sessionPoints(s), 0)
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

const initialPlates = [
  {
    id: uid(),
    name: '「示例」粉丝来信',
    targetPoints: 7,
    rewardNodes: [
      { id: uid(), at: 3, label: '赠送30%优惠券' },
      { id: uid(), at: 5, label: '赠送40%优惠券' },
      { id: uid(), at: 7, label: '赠送同人志' },
    ],
    sessions: [
      {
        id: uid(),
        date: '2026-04-12',
        slot: 'evening',
        multiplier: 2,
        status: 'done',
      },
      {
        id: uid(),
        date: '2026-05-03',
        slot: 'matinee',
        multiplier: 1,
        status: 'done',
      },
      {
        id: uid(),
        date: '2026-05-20',
        slot: 'evening',
        multiplier: 2,
        status: 'planned',
      },
    ],
  },
  
]

const slotLabels = { matinee: '午场', evening: '晚场' }
const multLabels = { 1: '1倍', 2: '2倍', 3: '3倍' }
const statusLabels = { done: '已完成', planned: '已计划' }

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

function AddRecordModal({ open, onClose, plates, onSubmit }) {
  const [plateMode, setPlateMode] = useState(() => (plates.length ? 'existing' : 'new'))
  const [selectedPlateId, setSelectedPlateId] = useState(() => plates[0]?.id ?? '')
  const [newName, setNewName] = useState('')
  const [newTarget, setNewTarget] = useState('9')
  const [rewardRows, setRewardRows] = useState(() => [
    { id: uid(), threshold: '3', label: '优惠券' },
    { id: uid(), threshold: '6', label: '拍立得' },
    { id: uid(), threshold: '10', label: '限定周边' },
  ])
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [slot, setSlot] = useState('matinee')
  const [multiplier, setMultiplier] = useState(1)
  const [status, setStatus] = useState('done')
  const [formError, setFormError] = useState('')

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

  function addRewardRow() {
    setRewardRows((r) => [...r, { id: uid(), threshold: '', label: '' }])
  }

  function removeRewardRow(id) {
    setRewardRows((r) => (r.length <= 1 ? r : r.filter((x) => x.id !== id)))
  }

  function updateRewardRow(id, field, value) {
    setRewardRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!selectedDate) {
      setFormError('请选择日期')
      return
    }
    const dateStr = toISODate(selectedDate)
    const session = {
      id: uid(),
      date: dateStr,
      slot,
      multiplier,
      status,
    }

    if (plateMode === 'new') {
      const name = newName.trim()
      if (!name) {
        setFormError('请填写音乐剧名称')
        return
      }
      const target = Number.parseInt(newTarget, 10)
      if (!Number.isFinite(target) || target < 1) {
        setFormError('积点盘总点数需为不小于 1 的整数')
        return
      }
      const nodes = rewardRows
        .map((row) => ({
          at: Number.parseInt(row.threshold, 10),
          label: row.label.trim(),
          id: uid(),
        }))
        .filter((n) => Number.isFinite(n.at) && n.at >= 1 && n.label)
      if (!nodes.length) {
        setFormError('请至少填写一个有效的奖励节点（点数与奖励内容）')
        return
      }
      nodes.sort((a, b) => a.at - b.at)
      onSubmit({
        type: 'new',
        plate: {
          id: uid(),
          name,
          targetPoints: target,
          rewardNodes: nodes,
          sessions: [session],
        },
      })
      onClose()
      return
    }

    if (!selectedPlateId) {
      setFormError('请选择要添加到的积点盘')
      return
    }
    onSubmit({ type: 'append', plateId: selectedPlateId, session })
    onClose()
  }

  if (!open) return null

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
          {plates.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-stone-500">记录方式</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPlateMode('existing')}
                  className={archiveGhostButtonClass(plateMode === 'existing')}
                >
                  添加到已有积点盘
                </button>
                <button
                  type="button"
                  onClick={() => setPlateMode('new')}
                  className={archiveGhostButtonClass(plateMode === 'new')}
                >
                  新建积点盘并记录
                </button>
              </div>
            </div>
          )}

          {plateMode === 'existing' && plates.length > 0 && (
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
                      {p.name}（{p.targetPoints} 点盘）
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                  ▾
                </span>
              </div>
            </div>
          )}

          {plateMode === 'new' && (
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-500">奖励节点设置</span>
                  <button
                    type="button"
                    onClick={addRewardRow}
                    className="text-xs font-medium text-rose-700/90 hover:text-rose-800"
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
                          onChange={(e) => updateRewardRow(row.id, 'threshold', e.target.value)}
                          inputMode="numeric"
                          placeholder="3"
                          className="w-full rounded-xl border border-stone-200/80 bg-white px-3 py-2 text-sm tabular-nums outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-100"
                        />
                      </div>
                      <div className="min-w-0 flex-[2] space-y-1">
                        <span className="text-[10px] uppercase tracking-wide text-stone-500">奖励内容</span>
                        <input
                          value={row.label}
                          onChange={(e) => updateRewardRow(row.id, 'label', e.target.value)}
                          placeholder="例如：优惠券"
                          className="w-full rounded-xl border border-stone-200/80 bg-white px-3 py-2 text-sm outline-none focus:border-violet-200 focus:ring-1 focus:ring-violet-100"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRewardRow(row.id)}
                        className="shrink-0 rounded-xl border border-transparent px-2 py-2 text-xs text-stone-400 hover:bg-white/80 hover:text-stone-600"
                      >
                        移除
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

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
            <div className="flex gap-2">
              {[
                { key: 'done', label: '已完成' },
                { key: 'planned', label: '已计划' },
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

  function addRewardRow() {
    setRewardRows((r) => [...r, { id: uid(), threshold: '', label: '' }])
  }

  function removeRewardRow(id) {
    setRewardRows((r) => (r.length <= 1 ? r : r.filter((x) => x.id !== id)))
  }

  function updateRewardRow(id, field, value) {
    setRewardRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

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
        return {
          id: keepId ? row.id : uid(),
          at,
          label,
        }
      })
      .filter((n) => Number.isFinite(n.at) && n.at >= 1 && n.label)
    if (!nodesBuilt.length) {
      setFormError('请至少保留一个有效的奖励节点')
      return
    }
    nodesBuilt.sort((a, b) => a.at - b.at)
    onSave({
      ...plate,
      name: trimmed,
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
            <label className="text-xs font-medium text-stone-500">积点盘总点数</label>
            <input
              type="number"
              min={1}
              value={targetStr}
              onChange={(e) => setTargetStr(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-teal-200 focus:ring-2"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500">奖励节点</span>
              <button type="button" onClick={addRewardRow} className="text-xs font-medium text-teal-800/90">
                + 添加节点
              </button>
            </div>
            <div className="space-y-2 rounded-2xl border border-violet-100/90 bg-violet-50/35 p-3">
              {rewardRows.map((row) => (
                <div key={row.id} className="flex flex-wrap items-end gap-2">
                  <div className="min-w-[4.5rem] flex-1 space-y-1">
                    <span className="text-[10px] text-stone-500">点数</span>
                    <input
                      value={row.threshold}
                      onChange={(e) => updateRewardRow(row.id, 'threshold', e.target.value)}
                      className="w-full rounded-xl border border-stone-200/80 bg-white px-3 py-2 text-sm tabular-nums outline-none"
                    />
                  </div>
                  <div className="min-w-0 flex-[2] space-y-1">
                    <span className="text-[10px] text-stone-500">奖励内容</span>
                    <input
                      value={row.label}
                      onChange={(e) => updateRewardRow(row.id, 'label', e.target.value)}
                      className="w-full rounded-xl border border-stone-200/80 bg-white px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRewardRow(row.id)}
                    className="text-xs text-stone-400 hover:text-stone-600"
                  >
                    移除
                  </button>
                </div>
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
  const [status, setStatus] = useState(session.status)
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
    onSave({
      ...session,
      date: toISODate(selectedDate),
      slot,
      multiplier,
      status,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-stone-900/20" aria-label="关闭" onClick={onClose} />
      <div className="relative z-[1] max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-violet-100/80 bg-[#fdfcfe] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]">
        <div className="sticky top-0 border-b border-violet-100/70 bg-[#fdfcfe] px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-stone-800">编辑场次</h2>
          <p className="mt-1 text-xs text-stone-500">{plateName}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-6">
          <ChineseDateField label="日期" value={selectedDate} onChange={setSelectedDate} />
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
            <div className="flex gap-2">
              {[
                { key: 'done', label: '已完成' },
                { key: 'planned', label: '已计划' },
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

export default function StampPlanningPage() {
  const [plates, setPlates] = useState(initialPlates)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)
  const [editPlateId, setEditPlateId] = useState(null)
  const [sessionEdit, setSessionEdit] = useState(null)
  const [confirmState, setConfirmState] = useState(null)

  const editingPlate = editPlateId ? plates.find((p) => p.id === editPlateId) : null
  const sessionEditPlate =
    sessionEdit && plates.find((p) => p.id === sessionEdit.plateId)

  function handleModalSubmit(payload) {
    if (payload.type === 'new') {
      setPlates((p) => [...p, payload.plate])
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

      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:space-y-10 sm:px-6">
        {plates.map((plate, idx) => {
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

          return (
            <article
              key={plate.id}
              className={`overflow-hidden rounded-[1.35rem] border border-rose-100/60 bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_16px_40px_-12px_rgba(0,0,0,0.07)] ${accent} border-l-4`}
            >
              <div className="border-b border-stone-100/90 bg-rose-50/35 px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                      {plate.name}
                    </h2>
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
                            detail: `确定删除「${plate.name}」及全部场次与奖励节点吗？此操作无法撤销。`,
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
                  「剩余所需」按预计积点（已完成 + 已计划）计算；按仅已完成场次计，距离满盘还差{' '}
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
                    场次记录
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-stone-100/90 bg-[#fdfcfc]">
                    <table className="w-full min-w-[380px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-stone-200/80 text-xs text-stone-500">
                          <th className="px-3 py-2.5 font-medium">日期</th>
                          <th className="px-3 py-2.5 font-medium">场次</th>
                          <th className="px-3 py-2.5 font-medium">倍率</th>
                          <th className="px-3 py-2.5 font-medium">状态</th>
                          <th className="px-3 py-2.5 text-right font-medium tabular-nums">本场</th>
                          <th className="px-3 py-2.5 text-right font-medium">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessionsSorted.map((s) => {
                          const d = new Date(s.date + 'T12:00:00')
                          return (
                            <tr key={s.id} className="border-b border-stone-100/80 last:border-0">
                              <td className="px-3 py-2.5 text-stone-700">{formatChineseDate(d)}</td>
                              <td className="px-3 py-2.5 text-stone-600">{slotLabels[s.slot]}</td>
                              <td className="px-3 py-2.5 tabular-nums text-stone-600">
                                {multLabels[s.multiplier]}
                              </td>
                              <td className="px-3 py-2.5">
                                <span
                                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                    s.status === 'done'
                                      ? 'bg-teal-50 text-teal-900/85 ring-1 ring-teal-100/80'
                                      : 'bg-sky-50 text-sky-900/85 ring-1 ring-sky-100/80'
                                  }`}
                                >
                                  {statusLabels[s.status]}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-right tabular-nums font-medium text-stone-800">
                                +{sessionPoints(s)}
                              </td>
                              <td className="px-3 py-2.5 text-right">
                                <div className="flex justify-end gap-1">
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
                                        title: '删除场次',
                                        detail: `确定从「${plate.name}」中删除该场次记录吗？`,
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
          plateName={sessionEditPlate.name}
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
