function uid() {
  return crypto.randomUUID()
}

export function createDefaults() {
  return {
    plates: [
      {
        id: uid(),
        isDemo: true,
        name: '「示例」粉丝来信',
        boardTitle: '',
        createdAt: '2026-04-10',
        targetPoints: 7,
        rewardNodes: [
          { id: uid(), at: 3, label: '赠送30%优惠券' },
          { id: uid(), at: 5, label: '赠送40%优惠券' },
          { id: uid(), at: 7, label: '赠送同人志' },
        ],
        sessions: [
          { id: uid(), date: '2026-04-12', slot: 'evening', multiplier: 2, status: 'done' },
          { id: uid(), date: '2026-05-03', slot: 'matinee', multiplier: 1, status: 'done' },
          { id: uid(), date: '2026-05-20', slot: 'evening', multiplier: 2, status: 'planned' },
        ],
      },
    ],
    materials: [
      {
        id: uid(),
        isDemo: true,
        musicalName: '「示例」粉丝来信',
        materialName: '概念小卡',
        materialType: 'card',
        materialTypeCustom: '',
        acquiredDate: '2026-05-06',
        forExchange: true,
        exchangeStatus: 'in_progress',
        exchangeMemo:
          '交换渠道：小红书\n对方：@我不是Hikaru\n进度：等待周末面交。\n备注：大学路某柜子a10',
      },
    ],
    pendingItems: [
      {
        id: uid(),
        isDemo: true,
        musicalName: '「示例」在燃烧的黑暗中',
        rewardType: 'ost',
        rewardTypeCustom: '',
        periodStart: '2026-06-16',
        periodEnd: '2026-07-31',
        pickupLocation: '某剧场MD 柜台',
        memo: '需携带兑换券',
      },
    ],
    actors: [
      {
        id: uid(),
        isDemo: true,
        name: '「示例」演员B',
        avatar: null,
        showStats: [{ title: 'Beastie', count: 6 }],
        watchLogs: [{ id: uid(), date: '2026-05-12', showTitle: 'Beastie', count: 1 }],
        letterRecords: [
          { id: uid(), date: '2026-04-20', type: 'letter', showTitle: 'Beastie', location: '', memo: '简短问候与观剧感。' },
        ],
        lastWatchDate: '2026-05-12',
      },
      {
        id: uid(),
        isDemo: true,
        name: '「示例」演员A',
        avatar: null,
        showStats: [{ title: '粉丝来信', count: 12 }],
        watchLogs: [{ id: uid(), date: '2026-05-10', showTitle: '粉丝来信', count: 2 }],
        letterRecords: [
          { id: uid(), date: '2026-04-20', type: 'letter', showTitle: '粉丝来信', location: '下班路', memo: '简短问候与观剧感。' },
          { id: uid(), date: '2026-03-08', type: 'gift', showTitle: '粉丝来信', location: '下班路', memo: '营养品和零食' },
        ],
        lastWatchDate: '2026-05-10',
      },
    ],
  }
}
