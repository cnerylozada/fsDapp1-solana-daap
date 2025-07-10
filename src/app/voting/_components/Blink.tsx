'use client'
import { DIAL_BLINK } from '@/contracts/commons'
import Link from 'next/link'
import { toast } from 'sonner'

export const Blink = ({ pollAccountId }: { pollAccountId: string }) => {
  const DIALECT_BLINK = `${DIAL_BLINK}:https://www.fsdaap2portfolio.xyz/api/blinks/voting/${pollAccountId}`

  return (
    <div>
      <div>
        <strong>Blinks:</strong>{' '}
        <Link
          href={`https://www.youtube.com/watch?v=m_feBl0ROik`}
          target="_blank"
          className="text-sm underline text-blue-700"
        >
          What are blinks in solana? Click me!
        </Link>
      </div>
      <div>Share this link to perform voting!</div>
      <div className="space-x-4">
        <button
          className="p-2 bg-blue-100 rounded-md text-xs hover:bg-blue-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(DIALECT_BLINK)
            toast('Blink copied!')
          }}
        >
          Copy blink!
        </button>
        <Link href={DIALECT_BLINK} target="_blank" className="underline text-sm text-blue-700 inline-block">
          {DIALECT_BLINK.substring(0, 18)}...
          {DIALECT_BLINK.substring(DIALECT_BLINK.length - 18, DIALECT_BLINK.length)}
        </Link>
      </div>
      <div></div>
    </div>
  )
}
