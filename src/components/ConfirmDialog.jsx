import { useEffect } from 'react'

export function ConfirmDialog({ open, title, detail, confirmLabel = '确定', cancelLabel = '取消', onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-5">
      <button
        type="button"
        className="absolute inset-0 bg-stone-900/25"
        aria-label="关闭"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative z-[1] w-full max-w-md rounded-3xl border border-rose-100/80 bg-[#fffdfd] p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
      >
        <h2 id="confirm-title" className="text-lg font-semibold text-stone-900">
          {title}
        </h2>
        {detail ? <p className="mt-3 text-sm leading-relaxed text-stone-600">{detail}</p> : null}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-stone-200/90 bg-white py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-rose-500/90 py-2.5 text-sm font-semibold text-white hover:bg-rose-500"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
