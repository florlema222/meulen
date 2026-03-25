'use client'

import dynamic from 'next/dynamic'
import type { Acampe } from '@/lib/acampes'

const ExtensionMap = dynamic(() => import('@/components/ExtensionMap'), { ssr: false })

export default function ExtensionMapWrapper({ acampes }: { acampes: Acampe[] }) {
  return <ExtensionMap acampes={acampes} />
}
