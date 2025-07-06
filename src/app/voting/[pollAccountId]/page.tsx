import { PublicKey } from '@solana/web3.js'
import { votingProgram } from '@/contracts/voting/program'
import { notFound } from 'next/navigation'
import { VotingDetails } from '../_components/VotingDetails'
import { BN } from '@coral-xyz/anchor'

export default async function Page({ params }: { params: Promise<{ pollAccountId: string }> }) {
  const { pollAccountId } = await params
  const getPubKey = () => {
    try {
      return new PublicKey(pollAccountId)
    } catch (error) {
      console.error(`Invalid public key ${pollAccountId}`, error)
    }
  }
  const pollAccountKey = getPubKey()
  if (!pollAccountKey) return notFound()

  let pollAccount:
    | {
        id: PublicKey
        poll: string
        description: string
        pollStart: BN
        pollEnd: BN
        candidateAmount: BN
        bump: number
        candidatePdaList: PublicKey[]
      }
    | undefined = undefined

  try {
    pollAccount = await votingProgram.account.poll.fetch(pollAccountKey)
  } catch (error) {
    console.error(`Invalid public key ${pollAccountId}`, error)
  }
  if (!pollAccount) return notFound()

  const candidateAccountList = await votingProgram.account.candidate.fetchMultiple(pollAccount.candidatePdaList)

  return (
    <div className="space-y-4">
      <VotingDetails poll={pollAccount.poll} pollStart={pollAccount.pollStart} description={pollAccount.description} />

      <div>
        <div className="font-bold">Candidates:</div>
        {candidateAccountList.map((_) => (
          <div key={_?.name}>{_?.name}</div>
        ))}
      </div>

      <div>
        <div className="font-bold">Blink:</div>
      </div>
    </div>
  )
}
