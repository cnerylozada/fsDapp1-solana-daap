import { Program } from '@coral-xyz/anchor'
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createActionHeaders,
  createPostResponse,
  LinkedAction,
} from '@solana/actions'
import { PublicKey, Transaction } from '@solana/web3.js'
import VOTING_CONTRACT_IDL from '@/contracts/voting/idl.json'
import { Voting } from '@/contracts/voting/type'
import { NextResponse } from 'next/server'
import { connection } from '@/contracts/commons'

const headers = createActionHeaders()

const votingProgram: Program<Voting> = new Program(VOTING_CONTRACT_IDL, { connection })

export async function GET(request: Request, { params }: { params: Promise<{ pollPda: string }> }) {
  const { pollPda } = await params

  let pollPdaKey: PublicKey
  try {
    pollPdaKey = new PublicKey(pollPda)
  } catch {
    return NextResponse.json({ error: 'Invalid account' }, { status: 400, headers })
  }

  try {
    const pollAccount = await votingProgram.account.poll.fetch(pollPdaKey)
    const candidateAccountList = await votingProgram.account.candidate.fetchMultiple(pollAccount.candidatePdaList)
    const candidateNameList = candidateAccountList.map((_) => _?.name)

    const actions: LinkedAction[] = candidateNameList.map((_) => {
      const requestUrl = new URL(request.url)
      const href = new URL(`/api/blinks/voting/${pollPda}?candidate=${_}`, requestUrl.origin).toString()
      return {
        label: `Vote for ${_}`,
        href,
        type: 'transaction',
      }
    })

    const payload: ActionGetResponse = {
      title: pollAccount.poll,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIG8feZdv7SVG0RYdGFUy8FDf_wxddAruJQ&s',
      description: pollAccount.description,
      label: 'Vote!',
      links: { actions },
    }
    return NextResponse.json(payload, { headers })
  } catch {
    return NextResponse.json(
      { error: 'Not found an account associated with given pollPda value' },
      { status: 404, headers },
    )
  }
}

export const OPTIONS = async () => Response.json(null, { headers })

export async function POST(request: Request) {
  const body: ActionPostRequest = await request.json()
  const url = new URL(request.url)
  const candidate = url.searchParams.get('candidate')

  const candidateAccountList = await votingProgram.account.candidate.all()
  const candidateNameList = candidateAccountList.map((_) => _.account.name)
  if (!candidate || !candidateNameList.includes(candidate))
    return NextResponse.json({ error: `Invalid candidate value` }, { status: 400, headers })

  let voter: PublicKey
  try {
    voter = new PublicKey(body.account)
  } catch {
    return NextResponse.json({ error: 'Invalid account' }, { status: 400, headers })
  }

  try {
    const transferSolInstruction = await votingProgram.methods.vote(candidate).accounts({ signer: voter }).instruction()
    const blockhash = await connection.getLatestBlockhash()
    const transaction = new Transaction({
      feePayer: voter,
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
    }).add(transferSolInstruction)

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `New vote for ${candidate}`,
        type: 'transaction',
      },
    })

    return NextResponse.json(payload, { headers })
  } catch (error) {
    console.log(`error`, error)
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      {
        status: 400,
        headers,
      },
    )
  }
}
