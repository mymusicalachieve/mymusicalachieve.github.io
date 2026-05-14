import { NavLink, Outlet, Link } from 'react-router-dom'

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

export default function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-[#faf8f9] text-stone-800 antialiased">
      <header className="sticky top-0 z-40 border-b border-rose-100/70 bg-white/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link to="/" className="shrink-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-rose-400/90">
              Musical Archive
            </p>
            <p className="text-base font-semibold tracking-tight text-stone-900">音乐剧收藏管理</p>
          </Link>
          <nav
            className="flex flex-wrap items-center gap-1.5 sm:justify-end"
            aria-label="主导航"
          >
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-rose-100/60 bg-white/70 py-5 text-center text-xs text-stone-400">
        Musical Archive · 个人本地记录（未连接数据库）
      </footer>
    </div>
  )
}
