import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const poll = url.searchParams.get('poll')

  if (!poll) return NextResponse.json({ error: 'Invalid poll value' }, { status: 400 })

  const pollAccountList = await VOTING_PROGRAM.account.poll.all()
  const pollAccount = pollAccountList.find((_) => _.account.poll.toLowerCase() === poll.toLowerCase())

  if (!pollAccount) return NextResponse.json({ error: 'Invalid poll value' }, { status: 400 })

  const candidateAccountList = await VOTING_PROGRAM.account.candidate.fetchMultiple(
    pollAccount.account.candidatePdaList,
  )

  return NextResponse.json({ candidateList: candidateAccountList }, { status: 200 })
}
