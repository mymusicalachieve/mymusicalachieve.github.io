import { useAppData } from '../context/useAppData.js'

export default function FirstRunDialog() {
  const { showFirstRunDialog, initWithDefaults, initEmpty } = useAppData()

  if (!showFirstRunDialog) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/25" />
      <div className="relative z-[1] w-full max-w-md overflow-hidden rounded-3xl border border-rose-100/80 bg-[#fffdfd] shadow-2xl">
        <div className="px-6 pb-2 pt-8 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-rose-400/90">
            Musical Archive
          </p>
          <h2 className="mt-2 text-xl font-semibold text-stone-900">
            欢迎使用音乐剧收藏管理
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            这是一款用于管理观剧记录、积点盘、物料收集与本金演员档案的个人工具。
            您可以选择导入示例数据来快速了解各模块功能，或直接从空白状态开始记录。
          </p>
        </div>
        <div className="flex flex-col gap-3 px-6 pb-8 pt-6">
          <button
            type="button"
            onClick={initWithDefaults}
            className="rounded-2xl bg-rose-600/90 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700/90"
          >
            导入示例数据
          </button>
          <button
            type="button"
            onClick={initEmpty}
            className="rounded-2xl border border-stone-200 py-3.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            空白开始
          </button>
        </div>
      </div>
    </div>
  )
}
