import { useState } from 'react'
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

const MATERIAL_TYPES = [
  { value: 'card', label: '小卡' },
  { value: 'polaroid', label: '拍立得' },
  { value: 'poster', label: '海报' },
  { value: 'bonus', label: '特典' },
  { value: 'postcard', label: '明信片' },
  { value: 'other', label: '其他' },
]

const EXCHANGE_STATUS = [
  { value: 'pending', label: '未交换' },
  { value: 'in_progress', label: '交换中' },
  { value: 'done', label: '已交换' },
]

function displayTypeLabel(m) {
  if (m.materialType === 'other') {
    const c = (m.materialTypeCustom || '').trim()
    return c || '其他'
  }
  return MATERIAL_TYPES.find((t) => t.value === m.materialType)?.label ?? '其他'
}

function exchangeStatusLabel(v) {
  return EXCHANGE_STATUS.find((x) => x.value === v)?.label ?? '未交换'
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

const initialMaterials = [
  {
    id: uid(),
    musicalName: '「示例」粉丝来信',
    materialName: '概念小卡',
    materialType: 'card',
    materialTypeCustom: '',
    acquiredDate: '2026-05-06',
    forExchange: true,
    exchangeStatus: 'in_progress',
    exchangeMemo:
      '交换渠道：小红书\n' +
      '对方：@我不是Hikaru\n' +
      '进度：等待周末面交。\n' +
      '备注：大学路某柜子a10',
  },
  
]

function MaterialFormModal({ editingItem, onClose, onSave }) {
  const [musicalName, setMusicalName] = useState(() => editingItem?.musicalName ?? '')
  const [materialName, setMaterialName] = useState(() => editingItem?.materialName ?? '')
  const [materialType, setMaterialType] = useState(() => editingItem?.materialType ?? 'card')
  const [materialTypeCustom, setMaterialTypeCustom] = useState(
    () => editingItem?.materialTypeCustom ?? '',
  )
  const [acquiredDate, setAcquiredDate] = useState(() =>
    editingItem ? parseISODate(editingItem.acquiredDate) : undefined,
  )
  const [forExchange, setForExchange] = useState(() => editingItem?.forExchange ?? false)
  const [exchangeStatus, setExchangeStatus] = useState(
    () => editingItem?.exchangeStatus ?? 'pending',
  )
  const [exchangeMemo, setExchangeMemo] = useState(() => editingItem?.exchangeMemo ?? '')
  const [formError, setFormError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!musicalName.trim()) {
      setFormError('请填写音乐剧名称')
      return
    }
    if (!materialName.trim()) {
      setFormError('请填写物料名称')
      return
    }
    if (!acquiredDate) {
      setFormError('请选择获得日期')
      return
    }
    if (materialType === 'other' && !materialTypeCustom.trim()) {
      setFormError('选择「其他」时请补充类型名称')
      return
    }
    const row = {
      id: editingItem?.id ?? uid(),
      musicalName: musicalName.trim(),
      materialName: materialName.trim(),
      materialType,
      materialTypeCustom: materialType === 'other' ? materialTypeCustom.trim() : '',
      acquiredDate: toISODate(acquiredDate),
      forExchange,
      exchangeStatus: forExchange ? exchangeStatus : 'pending',
      exchangeMemo: exchangeMemo.trim(),
    }
    onSave(row)
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
        aria-labelledby="material-modal-title"
        className="relative z-[1] max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-teal-100/80 bg-[#fcfdfd] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]"
      >
        <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-teal-100/70 bg-[#fcfdfd] px-5 py-4 sm:px-6">
          <h2 id="material-modal-title" className="text-base font-semibold text-stone-800">
            {editingItem ? '编辑物料' : '添加官方物料'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 transition hover:bg-teal-50 hover:text-stone-600"
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-6">
          <div className="space-y-2">
            <label htmlFor="m-musical" className="text-xs font-medium text-stone-500">
              音乐剧名称
            </label>
            <input
              id="m-musical"
              value={musicalName}
              onChange={(e) => setMusicalName(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-teal-100/80 focus:border-teal-200 focus:ring-2"
              placeholder="例如：汉密尔顿"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="m-name" className="text-xs font-medium text-stone-500">
              物料名称
            </label>
            <input
              id="m-name"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-teal-100/80 focus:border-teal-200 focus:ring-2"
              placeholder="例如：随机小卡 A"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="m-type" className="text-xs font-medium text-stone-500">
              物料类型
            </label>
            <div className="relative">
              <select
                id="m-type"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-200/90 bg-white py-3 pl-4 pr-10 text-sm shadow-sm outline-none ring-violet-100/80 focus:border-violet-200 focus:ring-2"
              >
                {MATERIAL_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                ▾
              </span>
            </div>
            {materialType === 'other' && (
              <input
                value={materialTypeCustom}
                onChange={(e) => setMaterialTypeCustom(e.target.value)}
                placeholder="请输入类型名称"
                className="mt-2 w-full rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-violet-200 focus:ring-2"
              />
            )}
          </div>

          <ChineseDateField
            label="获得日期"
            value={acquiredDate}
            onChange={setAcquiredDate}
            placeholder="点击选择日期"
          />

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">是否交换</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForExchange(true)}
                className={archiveGhostButtonClass(forExchange === true)}
              >
                是
              </button>
              <button
                type="button"
                onClick={() => {
                  setForExchange(false)
                  setExchangeStatus('pending')
                }}
                className={archiveGhostButtonClass(forExchange === false)}
              >
                否
              </button>
            </div>
          </div>

          <div className={`space-y-2 ${!forExchange ? 'opacity-50' : ''}`}>
            <span className="text-xs font-medium text-stone-500">交换状态</span>
            <div className="flex flex-wrap gap-2">
              {EXCHANGE_STATUS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  disabled={!forExchange}
                  onClick={() => setExchangeStatus(s.value)}
                  className={archiveGhostButtonClass(exchangeStatus === s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {!forExchange && (
              <p className="text-xs text-stone-500">未参与交换时，交换状态固定为「未交换」。</p>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-stone-500">交换备忘</span>
            <div className="rounded-2xl border border-amber-200/70 bg-[#fffdf8] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
              <div
                className="rounded-[1.15rem] bg-[linear-gradient(rgba(180,160,120,0.07)_1px,transparent_1px)] bg-[length:100%_1.4rem] px-4 pb-3 pt-2"
                style={{ backgroundPosition: '0 0.35rem' }}
              >
                <textarea
                  value={exchangeMemo}
                  onChange={(e) => setExchangeMemo(e.target.value)}
                  rows={6}
                  disabled={!forExchange}
                  placeholder={
                    forExchange
                      ? '可记录：在哪里交换、和谁交换、进度、其他备注……'
                      : '未参与交换时可留空'
                  }
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
            <button
              type="submit"
              className={`flex-1 ${archivePrimaryButtonClass()}`}
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function OfficialMaterialsPage() {
  const [items, setItems] = useState(initialMaterials)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)
  const [editingItem, setEditingItem] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

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
              官方物料整理
            </h1>
            <PageModuleSubtitle>整理与归档已获得的官方物料</PageModuleSubtitle>
          </div>
          <button type="button" onClick={openAdd} className={archivePrimaryButtonClass()}>
            添加物料
          </button>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {items.map((m, i) => {
            const d = parseISODate(m.acquiredDate)
            const tone =
              i % 3 === 0
                ? 'border-rose-100/80 bg-[#fffdfd]'
                : i % 3 === 1
                  ? 'border-teal-100/80 bg-[#fcfdfd]'
                  : 'border-violet-100/80 bg-[#fdfcfe]'
            return (
              <li
                key={m.id}
                className={`flex flex-col rounded-[1.35rem] border ${tone} p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-12px_rgba(0,0,0,0.07)] ring-1 ring-stone-100/40`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                      {m.musicalName}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold leading-snug text-stone-900">
                      {m.materialName}
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-200/80">
                    {displayTypeLabel(m)}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm text-stone-600">
                  <div className="flex justify-between gap-2 border-t border-stone-100/80 pt-3">
                    <dt className="text-stone-500">获得日期</dt>
                    <dd className="text-right text-stone-800">{d ? formatChineseDate(d) : '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500">是否交换</dt>
                    <dd className="font-medium text-stone-800">{m.forExchange ? '是' : '否'}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500">交换状态</dt>
                    <dd>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                          !m.forExchange
                            ? 'bg-stone-50 text-stone-500 ring-stone-200/80'
                            : m.exchangeStatus === 'done'
                              ? 'bg-teal-50 text-teal-900/85 ring-teal-100/80'
                              : m.exchangeStatus === 'in_progress'
                                ? 'bg-amber-50 text-amber-900/85 ring-amber-100/80'
                                : 'bg-sky-50 text-sky-900/85 ring-sky-100/80'
                        }`}
                      >
                        {!m.forExchange ? '不涉及' : exchangeStatusLabel(m.exchangeStatus)}
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                    备忘摘要
                  </p>
                  <p className="mt-1 rounded-xl border border-amber-200/50 bg-[#fffdf8]/90 px-3 py-2 font-serif text-sm leading-relaxed text-stone-700">
                    {summarizeMemo(m.forExchange ? m.exchangeMemo : '')}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-stone-100/80 pt-4">
                  <button type="button" onClick={() => openEdit(m)} className={archiveGhostButtonClass(false)}>
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmDelete({
                        id: m.id,
                        title: '删除物料',
                        detail: `确定删除「${m.musicalName} · ${m.materialName}」吗？此操作无法撤销。`,
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
        <MaterialFormModal
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
