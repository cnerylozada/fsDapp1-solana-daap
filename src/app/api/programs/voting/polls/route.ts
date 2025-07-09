import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { NextResponse } from 'next/server'

export async function GET() {
  const pollAccountList = await VOTING_PROGRAM.account.poll.all()

  return NextResponse.json({ polls: pollAccountList }, { status: 200 })
}
