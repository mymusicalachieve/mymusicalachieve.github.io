import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAppData } from '../context/useAppData.js'
import { ConfirmDialog } from '../components/ConfirmDialog.jsx'

const navLinkClass = ({ isActive }) =>
  [
    'rounded-full px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-rose-100/90 text-rose-900 shadow-sm ring-1 ring-rose-200/70'
      : 'text-stone-600 hover:bg-stone-100/70 hover:text-stone-900',
  ].join(' ')

const navItems = [
  { to: '/', label: '首页', end: true },
  { to: '/stamps', label: '积点盘规划', end: false },
  { to: '/materials', label: '官方物料整理', end: false },
  { to: '/pending', label: '待领物料整理', end: false },
  { to: '/principal', label: '本金演员记录', end: false },
]

function hasDemoData({ plates, materials, pendingItems, actors }) {
  return [plates, materials, pendingItems, actors].some((arr) =>
    arr.some((x) => x.isDemo),
  )
}

export default function MainLayout() {
  const ctx = useAppData()
  const [showConfirm, setShowConfirm] = useState(false)
  const hasDemo = hasDemoData(ctx)

  return (
    <div className="flex min-h-svh flex-col bg-[#faf8f9] text-stone-800 antialiased">
      <header className="sticky top-0 z-40 border-b border-rose-100/70 bg-white/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link to="/" className="shrink-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-rose-400/90">
              Musical Archive
            </p>
            <p className="text-base font-semibold tracking-tight text-stone-900">音乐剧收藏管理</p>
          </Link>
          <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
            <nav className="flex flex-wrap items-center gap-1.5" aria-label="主导航">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            {hasDemo && (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="ml-2 rounded-full px-3 py-2 text-xs font-medium text-amber-700 ring-1 ring-amber-200/80 transition hover:bg-amber-50"
              >
                清除示例数据
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-rose-100/60 bg-white/70 py-5 text-center text-xs text-stone-400">
        Musical Archive · 个人本地记录（未连接数据库）
      </footer>

      <ConfirmDialog
        open={showConfirm}
        title="清除全部示例数据"
        detail="此操作将删除所有带有「示例」标记的数据（积点盘、物料、待领物料、演员），不会影响您的正式数据。"
        confirmLabel="确认清除"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          ctx.clearDemoData()
          setShowConfirm(false)
        }}
      />
    </div>
  )
}
