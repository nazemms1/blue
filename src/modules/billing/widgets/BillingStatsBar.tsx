import { SimpleGrid } from '@mantine/core'
import { IconFileText, IconChecks, IconPencil, IconArchive } from '@tabler/icons-react'
import type { BillingRecord } from '../model/types'
import { AppCard } from '@shared/components'

interface BillingStatsBarProps {
  articles: BillingRecord[]
}

export function BillingStatsBar({ articles }: BillingStatsBarProps) {
  const paid = articles.filter((a) => a.status === 'paid').length
  const pending = articles.filter((a) => a.status === 'pending').length
  const canceled = articles.filter((a) => a.status === 'canceled').length

  const stats = [
    { label: 'Total', value: articles.length, icon: <IconFileText size={20} />, color: 'blue' },
    { label: 'Paid', value: paid, icon: <IconChecks size={20} />, color: 'green' },
    { label: 'Pending', value: pending, icon: <IconPencil size={20} />, color: 'yellow' },
    { label: 'Canceled', value: canceled, icon: <IconArchive size={20} />, color: 'gray' },
  ]

  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} mb="xl">
      {stats.map((stat) => (
        <AppCard.Stat
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </SimpleGrid>
  )
}
