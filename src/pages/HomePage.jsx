import { Link } from 'react-router-dom'

const modules = [
  {
    to: '/stamps',
    title: '积点盘规划',
    desc: '场次、预计积点与奖励节点整理',
    tone: 'border-rose-100 bg-rose-50/50 ring-rose-100/60',
  },
  {
    to: '/materials',
    title: '官方物料整理',
    desc: '小卡、海报与特典的归档与交换备忘',
    tone: 'border-teal-100 bg-teal-50/45 ring-teal-100/60',
  },
  {
    to: '/pending',
    title: '待领物料整理',
    desc: '即将领取的物料清单',
    tone: 'border-violet-100 bg-violet-50/40 ring-violet-100/60',
  },
  {
    to: '/principal',
    title: '本金演员记录',
    desc: '观剧里程碑与本金统计',
    tone: 'border-sky-100 bg-sky-50/45 ring-sky-100/60',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          欢迎回来
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          一目了然地整理积点、物料与本金记录（数据目前保存在本机浏览器会话中，适合长期随手整理，更改浏览器可能会使数据丢失）
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">功能模块</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {modules.map((m) => (
            <li key={m.to}>
              <Link
                to={m.to}
                className={`flex h-full flex-col rounded-[1.25rem] border bg-white/90 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-10px_rgba(0,0,0,0.08)] ring-1 ring-inset transition hover:shadow-md ${m.tone}`}
              >
                <span className="text-lg font-semibold text-stone-900">{m.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{m.desc}</span>
                <span className="mt-4 text-xs font-medium text-rose-700/90">进入 →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
