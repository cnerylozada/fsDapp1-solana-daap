import { Program } from '@coral-xyz/anchor'
import { ActionGetResponse, createActionHeaders } from '@solana/actions'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import VOTING_CONTRACT_IDL from '@/contracts/voting/idl.json'
import { Voting } from '@/contracts/voting/type'
import { NextResponse } from 'next/server'

const headers = createActionHeaders()

export async function GET(request: Request, { params }: { params: Promise<{ pollPda: string }> }) {
  const { pollPda } = await params

  let pollPdaKey: PublicKey
  try {
    pollPdaKey = new PublicKey(pollPda)
  } catch {
    return NextResponse.json({ error: 'Invalid account' }, { status: 400, headers })
  }

  const connection = new Connection(clusterApiUrl('devnet'))

  const votingProgram: Program<Voting> = new Program(VOTING_CONTRACT_IDL, { connection })

  const pollAccount = await votingProgram.account.poll.fetch(pollPdaKey)

  const payload: ActionGetResponse = {
    type: 'action',
    title: pollAccount.poll,
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIG8feZdv7SVG0RYdGFUy8FDf_wxddAruJQ&s',
    description: pollAccount.description,
    label: 'My label',
  }
  return NextResponse.json(payload, { headers })
}
