import { CONNECTION } from '@/contracts/commons'
import { PublicKey } from '@solana/web3.js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { accountAddress } = await request.json()

  if (!accountAddress) return NextResponse.json({ error: 'Invalid accountAddress' }, { status: 400 })

  let accountKey: PublicKey
  try {
    accountKey = new PublicKey(accountAddress)
  } catch {
    return NextResponse.json({ error: 'Invalid accountAddress' }, { status: 400 })
  }

  const accountInfo = await CONNECTION.getAccountInfo(accountKey)
  if (!accountInfo) return NextResponse.json({ error: 'Account not found' }, { status: 404 })

  const isProgram = accountInfo?.executable
  const isPDA = PublicKey.isOnCurve(accountKey.toBuffer()) === false

  let accountType = 'wallet'
  if (isProgram) accountType = 'program'
  else if (isPDA) accountType = 'pda'

  const balance = await CONNECTION.getBalance(accountKey)
  return NextResponse.json(
    { type: accountType, accountInfo, balance },
    {
      status: 200,
    },
  )
}
