import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { zhCN as rdpZhCN } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import { formatChineseDate } from '../lib/dateZh.js'

export default function ChineseDateField({ label = '日期', value, onChange, placeholder = '点击选择日期' }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      {label ? <span className="text-xs font-medium text-stone-500">{label}</span> : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-left text-sm shadow-sm outline-none ring-rose-100/80 focus:border-rose-200 focus:ring-2"
      >
        <span className={value ? 'text-stone-800' : 'text-stone-400'}>
          {value ? formatChineseDate(value) : placeholder}
        </span>
        <span className="text-stone-400">日历</span>
      </button>
      {open && (
        <div className="rounded-2xl border border-rose-100/80 bg-white p-3 shadow-inner">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange?.(d)
              setOpen(false)
            }}
            locale={rdpZhCN}
            className="mx-auto"
            modifiersClassNames={{
              selected: '!bg-rose-400/85 !text-white rounded-xl',
            }}
          />
        </div>
      )}
    </div>
  )
}
