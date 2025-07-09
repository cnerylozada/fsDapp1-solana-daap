import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { PublicKey } from '@solana/web3.js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const pollPda = url.searchParams.get('pollPda')

  if (!pollPda) return NextResponse.json({ error: 'Invalid pollPda value' }, { status: 400 })

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
