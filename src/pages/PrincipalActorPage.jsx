import { useId, useMemo, useState } from 'react'
import ChineseDateField from '../components/ChineseDateField.jsx'
import { toISODate } from '../lib/dateZh.js'
import { formatChineseDate } from '../lib/dateZh.js'
import { ConfirmDialog } from '../components/ConfirmDialog.jsx'
import PageModuleSubtitle from '../components/PageModuleSubtitle.jsx'
import {
  archiveDangerButtonClass,
  archiveGhostButtonClass,
  archivePrimaryButtonClass,
} from '../components/ArchiveActions.jsx'

function uid() {
  return crypto.randomUUID()
}

const MILESTONES = [10, 20, 30, 50, 100]

const LETTER_TYPES = [
  { value: 'letter', label: '写信' },
  { value: 'gift', label: '礼物' },
  { value: 'afterparty', label: '下班路' },
  { value: 'other', label: '其他' },
]

function letterTypeLabel(v) {
  return LETTER_TYPES.find((x) => x.value === v)?.label ?? '其他'
}

function sumShows(showStats) {
  return showStats.reduce((s, r) => s + (Number(r.count) || 0), 0)
}

function mostFrequentShow(showStats) {
  if (!showStats.length) return '—'
  const sorted = [...showStats].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title))
  return sorted[0].title
}

function mergeShowTitle(showStats, title, addCount) {
  const t = title.trim()
  if (!t || addCount <= 0) return showStats
  const idx = showStats.findIndex((r) => r.title === t)
  if (idx === -1) return [...showStats, { title: t, count: addCount }]
  return showStats.map((r, i) => (i === idx ? { ...r, count: r.count + addCount } : r))
}

function decrementShowTitle(showStats, title, sub) {
  const t = title.trim()
  return showStats
    .map((r) => (r.title === t ? { ...r, count: Math.max(0, r.count - sub) } : r))
    .filter((r) => r.count > 0)
}

function maxDateISO(a, b) {
  if (!a) return b
  if (!b) return a
  return a >= b ? a : b
}

function getNextMilestone(total) {
  const next = MILESTONES.find((m) => m > total) ?? null
  return { next }
}

function parseYMD(iso) {
  if (!iso) return null
  const [y, mo, d] = iso.split('-').map(Number)
  return new Date(y, mo - 1, d)
}

function monthKey(iso) {
  const d = parseYMD(iso)
  if (!d || Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

/** 为时间轴预计算月份标题（纯函数，无可变状态） */
function withMonthDividers(items, dateField = 'date') {
  return items.map((item, i) => {
    const mk = monthKey(item[dateField])
    const prevMk = i > 0 ? monthKey(items[i - 1][dateField]) : ''
    const showMonthHeader = mk !== prevMk
    return { item, monthKey: mk, showMonthHeader }
  })
}

const initialActors = [
  {
    id: uid(),
    name: '「示例」演员B',
    showStats: [
      { title: 'Beastie', count: 6 },
      
    ],
    watchLogs: [{ id: uid(), date: '2026-05-12', showTitle: 'Beastie', count: 1 }],
    letterRecords: [
      {
        id: uid(),
        date: '2026-04-20',
        type: 'letter',
        showTitle: 'Beastie',
        location: '',
        memo: '简短问候与观剧感。',
      },
      
    ],
    lastWatchDate: '2026-05-12',
  },
  {
    id: uid(),
    name: '「示例」演员A',
    showStats: [
      { title: '粉丝来信', count: 12 },
      
    ],
    watchLogs: [{ id: uid(), date: '2026-05-10', showTitle: '粉丝来信', count: 2 }],
    letterRecords: [
      {
        id: uid(),
        date: '2026-04-20',
        type: 'letter',
        showTitle: '粉丝来信',
        location: '下班路',
        memo: '简短问候与观剧感。',
      },
      {
        id: uid(),
        date: '2026-03-08',
        type: 'gift',
        showTitle: '粉丝来信',
        location: '下班路',
        memo: '营养品和零食',
      },
    ],
    lastWatchDate: '2026-05-10',
  },
]

function LetterTypeSummary({ records }) {
  const map = LETTER_TYPES.reduce((acc, t) => {
    acc[t.value] = 0
    return acc
  }, {})
  records.forEach((r) => {
    map[r.type] = (map[r.type] || 0) + 1
  })
  const parts = LETTER_TYPES.filter((t) => map[t.value] > 0).map((t) => `${t.label} ${map[t.value]} 次`)
  if (!parts.length) return <span className="text-stone-400">暂无记录</span>
  return <span>{parts.join(' · ')}</span>
}

export default function PrincipalActorPage() {
  const [actors, setActors] = useState(initialActors)
  const [selectedId, setSelectedId] = useState(() => initialActors[0]?.id ?? null)

  const [modalActor, setModalActor] = useState(null)
  const [modalActorKey, setModalActorKey] = useState(0)
  const [modalWatch, setModalWatch] = useState(false)
  const [modalWatchKey, setModalWatchKey] = useState(0)
  const [modalShowStat, setModalShowStat] = useState(false)
  const [modalShowStatKey, setModalShowStatKey] = useState(0)
  const [modalLetter, setModalLetter] = useState(null)
  const [modalLetterKey, setModalLetterKey] = useState(0)
  const [editShowRow, setEditShowRow] = useState(null)
  const [editWatch, setEditWatch] = useState(null)
  const [confirmState, setConfirmState] = useState(null)

  const selected = actors.find((a) => a.id === selectedId) ?? null

  const ranked = useMemo(
    () => [...actors].sort((a, b) => sumShows(b.showStats) - sumShows(a.showStats)),
    [actors],
  )

  function ensureSelected(nextActors) {
    if (!nextActors.length) {
      setSelectedId(null)
      return
    }
    if (!nextActors.some((a) => a.id === selectedId)) {
      setSelectedId(nextActors[0].id)
    }
  }

  return (
    <div className="pb-14">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              本金演员记录
            </h1>
            <PageModuleSubtitle>统计与整理本金演员相关记录</PageModuleSubtitle>
          </div>
          <button
            type="button"
            onClick={() => {
              setModalActorKey((k) => k + 1)
              setModalActor({ mode: 'create' })
            }}
            className={archivePrimaryButtonClass()}
          >
            添加演员
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        {/* 排行榜 */}
        {ranked.length > 1 && (
          <section aria-labelledby="rank-title">
            <h2 id="rank-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
              观剧场次榜
            </h2>
            <ol className="mt-3 grid gap-2 sm:grid-cols-3">
              {ranked.map((a, i) => (
                <li
                  key={a.id}
                  className={`flex items-center gap-3 rounded-[1.15rem] border border-rose-100/70 bg-white/90 px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_10px_28px_-12px_rgba(0,0,0,0.06)] ring-1 ring-rose-50/80 ${
                    selectedId === a.id ? 'ring-2 ring-rose-200/80' : ''
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-sm font-semibold text-rose-800/90 ring-1 ring-rose-100">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setSelectedId(a.id)}
                      className="truncate text-left text-sm font-semibold text-stone-900 hover:text-rose-900/90"
                    >
                      {a.name}
                    </button>
                    <p className="text-xs tabular-nums text-stone-500">{sumShows(a.showStats)} 场</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 演员档案卡片 */}
        <section aria-labelledby="cards-title">
          <h2 id="cards-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            演员档案
          </h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {actors.map((a, idx) => {
              const total = sumShows(a.showStats)
              const tones = [
                'border-rose-100/80 bg-[#fffdfd] ring-rose-100/50',
                'border-teal-100/80 bg-[#fcfdfd] ring-teal-100/50',
                'border-violet-100/80 bg-[#fdfcfe] ring-violet-100/50',
              ]
              const tone = tones[idx % tones.length]
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    className={`flex w-full flex-col rounded-[1.25rem] border p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-10px_rgba(0,0,0,0.07)] ring-1 transition hover:shadow-md ${tone} ${
                      selectedId === a.id ? 'ring-2 ring-rose-200/90' : ''
                    }`}
                  >
                    <span className="text-lg font-semibold text-stone-900">{a.name}</span>
                    <span className="mt-2 text-xs text-stone-500">总观剧</span>
                    <span className="text-2xl font-semibold tabular-nums text-rose-900/85">{total}</span>
                    <span className="mt-2 text-xs text-stone-500">剧目数 · 最近观看</span>
                    <span className="text-sm text-stone-700">
                      {a.showStats.length} 部
                      {a.lastWatchDate
                        ? ` · ${formatChineseDate(parseYMD(a.lastWatchDate))}`
                        : ' · —'}
                    </span>
                    <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500">
                      最常：{mostFrequentShow(a.showStats)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* 详情 */}
        {selected && (
          <section className="space-y-8" aria-labelledby="detail-title">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stone-100/90 pb-4">
              <h2 id="detail-title" className="text-xl font-semibold text-stone-900">
                {selected.name}
                <span className="ml-2 text-sm font-normal text-stone-500">档案详情</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalActorKey((k) => k + 1)
                    setModalActor({ mode: 'edit', actor: selected })
                  }}
                  className={archiveGhostButtonClass(false)}
                >
                  编辑演员
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setConfirmState({
                      title: '删除演员',
                      detail: `将删除「${selected.name}」的全部剧目、观看与写信记录。`,
                      onConfirm: () => {
                        const next = actors.filter((x) => x.id !== selected.id)
                        setActors(next)
                        ensureSelected(next)
                        setConfirmState(null)
                      },
                    })
                  }
                  className={archiveDangerButtonClass()}
                >
                  删除演员
                </button>
              </div>
            </div>

            {/* Milestone */}
            <div className="rounded-[1.35rem] border border-emerald-100/80 bg-[#f7fdf9]/90 p-6 shadow-inner ring-1 ring-emerald-50/60">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800/70">
                观剧里程碑
              </h3>
              <MilestoneBlock actor={selected} />
            </div>

            {/* 剧目统计 */}
            <div className="rounded-[1.35rem] border border-stone-100/90 bg-white/95 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-10px_rgba(0,0,0,0.06)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">剧目统计</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalShowStatKey((k) => k + 1)
                      setModalShowStat(true)
                    }}
                    className={archiveGhostButtonClass(false)}
                  >
                    添加剧目统计
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalWatchKey((k) => k + 1)
                      setModalWatch(true)
                    }}
                    className={archiveGhostButtonClass(false)}
                  >
                    新增观看记录
                  </button>
                </div>
              </div>
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200/80 text-xs text-stone-500">
                    <th className="py-2 font-medium">剧目</th>
                    <th className="py-2 font-medium tabular-nums">场数</th>
                    <th className="py-2 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.showStats.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-sm text-stone-400">
                        暂无剧目数据，可添加统计或从观看记录自动累加。
                      </td>
                    </tr>
                  ) : (
                    selected.showStats.map((row) => (
                      <tr key={row.title} className="border-b border-stone-100/80 last:border-0">
                        <td className="py-2.5 font-medium text-stone-800">{row.title}</td>
                        <td className="py-2.5 tabular-nums text-stone-700">{row.count}</td>
                        <td className="py-2.5 text-right">
                          <button
                            type="button"
                            className="mr-2 text-xs font-medium text-teal-800/90 hover:underline"
                            onClick={() => setEditShowRow({ actorId: selected.id, row })}
                          >
                            编辑
                          </button>
                          <button
                            type="button"
                            className="text-xs font-medium text-rose-700/90 hover:underline"
                            onClick={() =>
                              setConfirmState({
                                title: '删除剧目',
                                detail: `删除「${row.title}」的统计（${row.count} 场）？`,
                                onConfirm: () => {
                                  setActors((list) =>
                                    list.map((ac) =>
                                      ac.id === selected.id
                                        ? {
                                            ...ac,
                                            showStats: ac.showStats.filter((s) => s.title !== row.title),
                                          }
                                        : ac,
                                    ),
                                  )
                                  setConfirmState(null)
                                },
                              })
                            }
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 观看记录时间轴 */}
            <div className="rounded-[1.35rem] border border-sky-100/80 bg-[#f8fcff]/90 p-6 ring-1 ring-sky-50/70">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-800/70">观看记录</h3>
              <WatchTimeline
                logs={selected.watchLogs}
                onEdit={(log) => setEditWatch({ actorId: selected.id, log })}
                onDelete={(log) =>
                  setConfirmState({
                    title: '删除观看记录',
                    detail: `将扣减「${log.showTitle}」${log.count} 场，并可能更新最近观看日期。`,
                    onConfirm: () => {
                      setActors((list) =>
                        list.map((ac) => {
                          if (ac.id !== selected.id) return ac
                          const nextStats = decrementShowTitle(ac.showStats, log.showTitle, log.count)
                          const nextLogs = ac.watchLogs.filter((w) => w.id !== log.id)
                          const last = nextLogs.reduce((m, w) => maxDateISO(m, w.date), null)
                          return { ...ac, showStats: nextStats, watchLogs: nextLogs, lastWatchDate: last }
                        }),
                      )
                      setConfirmState(null)
                    },
                  })
                }
              />
            </div>

            {/* 写信与送礼 */}
            <div className="rounded-[1.35rem] border border-violet-100/80 bg-[#fdfcfe]/95 p-6 ring-1 ring-violet-50/60">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-800/70">
                    写信与送礼
                  </h3>
                  <p className="mt-2 text-sm text-stone-600">
                    <LetterTypeSummary records={selected.letterRecords} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModalLetterKey((k) => k + 1)
                    setModalLetter({ mode: 'create', actorId: selected.id })
                  }}
                  className={archiveGhostButtonClass(false)}
                >
                  添加记录
                </button>
              </div>
              <LetterTimeline
                records={selected.letterRecords}
                onEdit={(rec) => {
                  setModalLetterKey((k) => k + 1)
                  setModalLetter({ mode: 'edit', actorId: selected.id, record: rec })
                }}
                onDelete={(rec) =>
                  setConfirmState({
                    title: '删除记录',
                    detail: '确定删除这条写信 / 送礼记录吗？',
                    onConfirm: () => {
                      setActors((list) =>
                        list.map((ac) =>
                          ac.id === selected.id
                            ? {
                                ...ac,
                                letterRecords: ac.letterRecords.filter((r) => r.id !== rec.id),
                              }
                            : ac,
                        ),
                      )
                      setConfirmState(null)
                    },
                  })
                }
              />
            </div>
          </section>
        )}

        {!actors.length && (
          <p className="rounded-[1.25rem] border border-dashed border-stone-200 bg-stone-50/50 py-12 text-center text-sm text-stone-500">
            暂无演员档案，请点击「添加演员」开始记录。
          </p>
        )}
      </div>

      {modalActor && (
        <ActorFormModal
          key={modalActorKey}
          mode={modalActor.mode}
          actor={modalActor.actor}
          onClose={() => setModalActor(null)}
          onSave={(payload) => {
            if (payload.mode === 'create') {
              setActors((a) => [...a, payload.actor])
              setSelectedId(payload.actor.id)
            } else {
              setActors((list) =>
                list.map((x) => (x.id === payload.actor.id ? { ...payload.actor } : x)),
              )
            }
            setModalActor(null)
          }}
        />
      )}

      {modalWatch && selected && (
        <WatchLogModal
          key={modalWatchKey}
          actor={selected}
          onClose={() => setModalWatch(false)}
          onSave={({ showTitle, count, date }) => {
            const iso = toISODate(date)
            setActors((list) =>
              list.map((ac) => {
                if (ac.id !== selected.id) return ac
                const nextStats = mergeShowTitle(ac.showStats, showTitle, count)
                const log = { id: uid(), date: iso, showTitle: showTitle.trim(), count }
                return {
                  ...ac,
                  showStats: nextStats,
                  watchLogs: [log, ...ac.watchLogs],
                  lastWatchDate: maxDateISO(ac.lastWatchDate, iso),
                }
              }),
            )
            setModalWatch(false)
          }}
        />
      )}

      {modalShowStat && selected && (
        <ShowStatModal
          key={modalShowStatKey}
          onClose={() => setModalShowStat(false)}
          onSave={({ title, count }) => {
            setActors((list) =>
              list.map((ac) =>
                ac.id === selected.id
                  ? { ...ac, showStats: mergeShowTitle(ac.showStats, title, count) }
                  : ac,
              ),
            )
            setModalShowStat(false)
          }}
        />
      )}

      {modalLetter && (
        <LetterFormModal
          key={modalLetterKey}
          mode={modalLetter.mode}
          actorId={modalLetter.actorId}
          record={modalLetter.record}
          showTitles={
            actors.find((a) => a.id === modalLetter.actorId)?.showStats.map((s) => s.title) ?? []
          }
          onClose={() => setModalLetter(null)}
          onSave={(rec) => {
            const { actorId, ...row } = rec
            setActors((list) =>
              list.map((ac) => {
                if (ac.id !== actorId) return ac
                const exists = ac.letterRecords.some((r) => r.id === row.id)
                if (exists) {
                  return {
                    ...ac,
                    letterRecords: ac.letterRecords.map((r) => (r.id === row.id ? { ...row } : r)),
                  }
                }
                return { ...ac, letterRecords: [{ ...row }, ...ac.letterRecords] }
              }),
            )
            setModalLetter(null)
          }}
        />
      )}

      {editShowRow && (
        <EditShowStatModal
          key={editShowRow.row.title}
          row={editShowRow.row}
          onClose={() => setEditShowRow(null)}
          onSave={({ title, count }) => {
            setActors((list) =>
              list.map((ac) => {
                if (ac.id !== editShowRow.actorId) return ac
                return {
                  ...ac,
                  showStats: ac.showStats.map((s) =>
                    s.title === editShowRow.row.title ? { title, count } : s,
                  ),
                }
              }),
            )
            setEditShowRow(null)
          }}
        />
      )}

      {editWatch && (
        <EditWatchLogModal
          key={editWatch.log.id}
          log={editWatch.log}
          showTitles={actors.find((a) => a.id === editWatch.actorId)?.showStats.map((s) => s.title) ?? []}
          onClose={() => setEditWatch(null)}
          onSave={(nextLog, prevLog) => {
            setActors((list) =>
              list.map((ac) => {
                if (ac.id !== editWatch.actorId) return ac
                let stats = decrementShowTitle(ac.showStats, prevLog.showTitle, prevLog.count)
                stats = mergeShowTitle(stats, nextLog.showTitle, nextLog.count)
                const nextLogs = ac.watchLogs.map((w) => (w.id === nextLog.id ? nextLog : w))
                const last = nextLogs.reduce((m, w) => maxDateISO(m, w.date), null)
                return { ...ac, showStats: stats, watchLogs: nextLogs, lastWatchDate: last }
              }),
            )
            setEditWatch(null)
          }}
        />
      )}

      <ConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.title ?? ''}
        detail={confirmState?.detail}
        confirmLabel="确定"
        onCancel={() => setConfirmState(null)}
        onConfirm={() => confirmState?.onConfirm?.()}
      />
    </div>
  )
}

function MilestoneBlock({ actor }) {
  const total = sumShows(actor.showStats)
  const { next } = getNextMilestone(total)
  const pct = next ? Math.min(100, Math.round((total / next) * 100)) : 100

  return (
    <div className="mt-4 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-sm text-stone-600">
          当前累计 <span className="font-semibold tabular-nums text-stone-900">{total}</span> 场
        </p>
        {next ? (
          <p className="text-xs tabular-nums text-stone-500">
            {total} / {next} 场 · 距离 {next} 场还差{' '}
            <span className="font-medium text-emerald-900/90">{next - total}</span> 场
          </p>
        ) : (
          <p className="text-xs font-medium text-emerald-800/90">已达全部里程碑</p>
        )}
      </div>
      {next && (
        <div className="h-2.5 overflow-hidden rounded-full bg-emerald-100/80">
          <div
            className="h-full rounded-full bg-emerald-400/70 transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
      <ul className="flex flex-wrap gap-2">
        {MILESTONES.map((m) => {
          const done = total >= m
          return (
            <li
              key={m}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${
                done
                  ? 'bg-teal-50 text-teal-900 ring-teal-200/80'
                  : 'bg-white/80 text-stone-400 ring-stone-200/70'
              }`}
            >
              {m} 场{done ? ' · 已达成' : ''}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function WatchTimeline({ logs, onEdit, onDelete }) {
  const sorted = [...logs].sort((a, b) => (a.date < b.date ? 1 : -1))
  if (!sorted.length) {
    return <p className="mt-4 text-sm text-stone-400">暂无观看记录。</p>
  }
  const rows = withMonthDividers(sorted)
  return (
    <ol className="relative mt-4 space-y-0 border-l border-sky-200/70 pl-5">
      {rows.map(({ item: log, monthKey: mk, showMonthHeader }) => {
        const d = parseYMD(log.date)
        return (
          <li key={log.id} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-sky-400/80 shadow-sm" />
            {showMonthHeader && (
              <p className="-ml-1 mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-700/80">
                {mk}
              </p>
            )}
            <div className="rounded-xl border border-sky-100/80 bg-white/85 px-3 py-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-stone-900">{log.showTitle}</span>
                <time className="text-xs tabular-nums text-stone-500">
                  {d ? formatChineseDate(d) : log.date}
                </time>
              </div>
              <p className="mt-1 text-xs text-stone-600">+{log.count} 场</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(log)}
                  className="text-[11px] font-medium text-teal-800/90 hover:underline"
                >
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(log)}
                  className="text-[11px] font-medium text-rose-700/90 hover:underline"
                >
                  删除
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function LetterTimeline({ records, onEdit, onDelete }) {
  const sorted = [...records].sort((a, b) => (a.date < b.date ? 1 : -1))
  if (!sorted.length) {
    return <p className="mt-4 text-sm text-stone-400">暂无写信或送礼记录。</p>
  }
  const rows = withMonthDividers(sorted)
  return (
    <ol className="relative mt-5 space-y-0 border-l border-violet-200/60 pl-5">
      {rows.map(({ item: rec, monthKey: mk, showMonthHeader }) => {
        const d = parseYMD(rec.date)
        return (
          <li key={rec.id} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-violet-400/75 shadow-sm" />
            {showMonthHeader && (
              <p className="-ml-1 mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700/75">
                {mk}
              </p>
            )}
            <div className="rounded-xl border border-violet-100/80 bg-white/90 px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-900/85 ring-1 ring-violet-100">
                  {letterTypeLabel(rec.type)}
                </span>
                {rec.showTitle ? (
                  <span className="text-xs text-stone-600">《{rec.showTitle}》</span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-stone-500">{rec.location}</p>
              {rec.memo ? <p className="mt-1 line-clamp-2 text-xs text-stone-600">{rec.memo}</p> : null}
              <time className="mt-1 block text-[10px] tabular-nums text-stone-400">
                {d ? formatChineseDate(d) : rec.date}
              </time>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(rec)}
                  className="text-[11px] font-medium text-teal-800/90 hover:underline"
                >
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(rec)}
                  className="text-[11px] font-medium text-rose-700/90 hover:underline"
                >
                  删除
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function ActorFormModal({ mode, actor, onClose, onSave }) {
  const [name, setName] = useState(() => actor?.name ?? '')
  const [rows, setRows] = useState(() =>
    mode === 'edit' && actor?.showStats?.length
      ? actor.showStats.map((r) => ({ id: uid(), title: r.title, count: String(r.count) }))
      : [{ id: uid(), title: '', count: '' }],
  )
  const [err, setErr] = useState('')

  function addRow() {
    setRows((r) => [...r, { id: uid(), title: '', count: '' }])
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    if (!name.trim()) {
      setErr('请填写演员姓名')
      return
    }
    const stats = []
    const seen = new Set()
    for (const row of rows) {
      const t = row.title.trim()
      const c = Number.parseInt(row.count, 10)
      if (!t && !row.count.trim()) continue
      if (!t || !Number.isFinite(c) || c < 1) {
        setErr('请完整填写剧目名称与有效场数，或删除空白行')
        return
      }
      if (seen.has(t)) {
        setErr('同一剧目请勿重复行，请合并为一条')
        return
      }
      seen.add(t)
      stats.push({ title: t, count: c })
    }
    if (mode === 'create') {
      onSave({
        mode: 'create',
        actor: {
          id: uid(),
          name: name.trim(),
          showStats: stats,
          watchLogs: [],
          letterRecords: [],
          lastWatchDate: null,
        },
      })
      return
    }
    onSave({
      mode: 'edit',
      actor: {
        ...actor,
        name: name.trim(),
        showStats: stats,
      },
    })
  }

  return (
    <ModalShell title={mode === 'create' ? '添加演员' : '编辑演员'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6 sm:px-6">
        <div>
          <label className="text-xs text-stone-500">姓名</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">已有剧目统计（可选）</span>
            <button type="button" onClick={addRow} className="text-xs text-rose-700/90">
              + 一行
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {rows.map((row) => (
              <div key={row.id} className="flex gap-2">
                <input
                  placeholder="剧目"
                  value={row.title}
                  onChange={(e) =>
                    setRows((rs) => rs.map((x) => (x.id === row.id ? { ...x, title: e.target.value } : x)))
                  }
                  className="min-w-0 flex-1 rounded-xl border border-stone-200/80 px-3 py-2 text-sm"
                />
                <input
                  placeholder="场数"
                  inputMode="numeric"
                  value={row.count}
                  onChange={(e) =>
                    setRows((rs) => rs.map((x) => (x.id === row.id ? { ...x, count: e.target.value } : x)))
                  }
                  className="w-24 rounded-xl border border-stone-200/80 px-3 py-2 text-sm tabular-nums"
                />
              </div>
            ))}
          </div>
        </div>
        {err && <p className="text-sm text-rose-800/90">{err}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm">
            取消
          </button>
          <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
            保存
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function WatchLogModal({ actor, onClose, onSave }) {
  const titles = actor.showStats.map((s) => s.title)
  const [showTitle, setShowTitle] = useState(titles[0] ?? '')
  const [customTitle, setCustomTitle] = useState('')
  const [useNew, setUseNew] = useState(!titles.length)
  const [countStr, setCountStr] = useState('1')
  const [date, setDate] = useState(() => new Date())
  const [err, setErr] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    const title = useNew ? customTitle.trim() : showTitle
    const count = Number.parseInt(countStr, 10)
    if (!title) {
      setErr('请选择或填写剧目')
      return
    }
    if (!Number.isFinite(count) || count < 1) {
      setErr('请输入至少 1 场')
      return
    }
    if (!date) {
      setErr('请选择日期')
      return
    }
    onSave({ showTitle: title, count, date })
  }

  return (
    <ModalShell title="新增观看记录" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6 sm:px-6">
        <div className="flex gap-2">
          <button
            type="button"
            className={archiveGhostButtonClass(!useNew && titles.length > 0)}
            onClick={() => setUseNew(false)}
            disabled={!titles.length}
          >
            已有剧目
          </button>
          <button type="button" className={archiveGhostButtonClass(useNew)} onClick={() => setUseNew(true)}>
            新剧名
          </button>
        </div>
        {!useNew && titles.length > 0 ? (
          <div>
            <label className="text-xs text-stone-500">剧目</label>
            <select
              value={showTitle}
              onChange={(e) => setShowTitle(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-stone-200/90 bg-white py-3 pl-3 text-sm"
            >
              {titles.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="text-xs text-stone-500">剧目名称</label>
            <input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm"
              placeholder="例如：德古拉"
            />
          </div>
        )}
        <div>
          <label className="text-xs text-stone-500">新增场数</label>
          <input
            type="number"
            min={1}
            value={countStr}
            onChange={(e) => setCountStr(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm tabular-nums"
          />
        </div>
        <ChineseDateField label="观看日期" value={date} onChange={setDate} />
        {err && <p className="text-sm text-rose-800/90">{err}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm">
            取消
          </button>
          <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
            保存
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function ShowStatModal({ onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [countStr, setCountStr] = useState('1')
  const [err, setErr] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    const t = title.trim()
    const c = Number.parseInt(countStr, 10)
    if (!t) {
      setErr('请填写剧目名称')
      return
    }
    if (!Number.isFinite(c) || c < 1) {
      setErr('场数需为不小于 1 的整数')
      return
    }
    onSave({ title: t, count: c })
  }
  return (
    <ModalShell title="添加剧目统计" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6 sm:px-6">
        <p className="text-xs text-stone-500">若剧目已存在，场数会自动累加。</p>
        <div>
          <label className="text-xs text-stone-500">剧目名称</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500">场数（累加）</label>
          <input
            type="number"
            min={1}
            value={countStr}
            onChange={(e) => setCountStr(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm tabular-nums"
          />
        </div>
        {err && <p className="text-sm text-rose-800/90">{err}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm">
            取消
          </button>
          <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
            保存
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function EditShowStatModal({ row, onClose, onSave }) {
  const [title, setTitle] = useState(row.title)
  const [countStr, setCountStr] = useState(String(row.count))
  const [err, setErr] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    const t = title.trim()
    const c = Number.parseInt(countStr, 10)
    if (!t) {
      setErr('请填写剧目')
      return
    }
    if (!Number.isFinite(c) || c < 1) {
      setErr('场数需为不小于 1')
      return
    }
    onSave({ title: t, count: c })
  }
  return (
    <ModalShell title="编辑剧目统计" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6 sm:px-6">
        <div>
          <label className="text-xs text-stone-500">剧目名称</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-stone-500">场数</label>
          <input
            type="number"
            min={1}
            value={countStr}
            onChange={(e) => setCountStr(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm tabular-nums"
          />
        </div>
        {err && <p className="text-sm text-rose-800/90">{err}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm">
            取消
          </button>
          <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
            保存
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function EditWatchLogModal({ log, showTitles, onClose, onSave }) {
  const dlId = useId()
  const [showTitle, setShowTitle] = useState(log.showTitle)
  const [countStr, setCountStr] = useState(String(log.count))
  const [date, setDate] = useState(() => parseYMD(log.date) ?? new Date())
  const [err, setErr] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    const t = showTitle.trim()
    const c = Number.parseInt(countStr, 10)
    if (!t || !Number.isFinite(c) || c < 1 || !date) {
      setErr('请完整填写')
      return
    }
    const next = { ...log, showTitle: t, count: c, date: toISODate(date) }
    onSave(next, log)
  }
  return (
    <ModalShell title="编辑观看记录" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6 sm:px-6">
        <div>
          <label className="text-xs text-stone-500">剧目</label>
          <input
            list={dlId}
            value={showTitle}
            onChange={(e) => setShowTitle(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm"
          />
          <datalist id={dlId}>
            {showTitles.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="text-xs text-stone-500">场数</label>
          <input
            type="number"
            min={1}
            value={countStr}
            onChange={(e) => setCountStr(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm tabular-nums"
          />
        </div>
        <ChineseDateField label="日期" value={date} onChange={setDate} />
        {err && <p className="text-sm text-rose-800/90">{err}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm">
            取消
          </button>
          <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
            保存
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function LetterFormModal({ mode, actorId, record, showTitles, onClose, onSave }) {
  const dlId = useId()
  const [date, setDate] = useState(() => (record ? parseYMD(record.date) : new Date()))
  const [type, setType] = useState(() => record?.type ?? 'letter')
  const [showTitle, setShowTitle] = useState(() => record?.showTitle ?? '')
  const [location, setLocation] = useState(() => record?.location ?? '')
  const [memo, setMemo] = useState(() => record?.memo ?? '')
  const [err, setErr] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    if (!location.trim()) {
      setErr('请填写地点或场合')
      return
    }
    if (!date) {
      setErr('请选择日期')
      return
    }
    const payload = {
      id: record?.id ?? uid(),
      actorId,
      date: toISODate(date),
      type,
      showTitle: showTitle.trim(),
      location: location.trim(),
      memo: memo.trim(),
    }
    onSave(payload)
  }
  return (
    <ModalShell title={mode === 'create' ? '添加写信 / 送礼记录' : '编辑记录'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 px-5 py-6 sm:px-6">
        <ChineseDateField label="日期" value={date} onChange={setDate} />
        <div>
          <label className="text-xs text-stone-500">类型</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 bg-white py-3 pl-3 text-sm"
          >
            {LETTER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500">对应剧目（可选）</label>
          <input
            list={dlId}
            value={showTitle}
            onChange={(e) => setShowTitle(e.target.value)}
            placeholder="可留空"
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm"
          />
          <datalist id={dlId}>
            {showTitles.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="text-xs text-stone-500">地点或场合</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-stone-200/90 px-4 py-3 text-sm"
            placeholder="例如：下班路"
          />
        </div>
        <div>
          <span className="text-xs text-stone-500">备注</span>
          <div className="mt-1 rounded-2xl border border-amber-200/50 bg-[#fffdf8] p-3">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={3}
              className="w-full resize-none bg-transparent text-sm text-stone-800 outline-none"
            />
          </div>
        </div>
        {err && <p className="text-sm text-rose-800/90">{err}</p>}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-stone-200 py-3 text-sm">
            取消
          </button>
          <button type="submit" className={`flex-1 ${archivePrimaryButtonClass()}`}>
            保存
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

function ModalShell({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-stone-900/20" aria-label="关闭" onClick={onClose} />
      <div className="relative z-[1] max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-rose-100/80 bg-[#fffdfd] shadow-xl sm:rounded-3xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-rose-100/70 bg-[#fffdfd] px-5 py-4">
          <h2 className="text-base font-semibold text-stone-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-rose-50">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
