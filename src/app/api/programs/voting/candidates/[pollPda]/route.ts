import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { PublicKey } from '@solana/web3.js'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ pollPda: string }> }) {
  console.log(`asda`)
  const { pollPda } = await params

  let pollPdaKey: PublicKey
  try {
    pollPdaKey = new PublicKey(pollPda)
  } catch {
    return NextResponse.json({ error: 'Invalid account' }, { status: 400 })
  }

  const pollAccount = await VOTING_PROGRAM.account.poll.fetch(pollPdaKey)
  const candidateAccountList = await VOTING_PROGRAM.account.candidate.fetchMultiple(pollAccount.candidatePdaList)

  return NextResponse.json({ candidateList: candidateAccountList }, { status: 200 })
}
