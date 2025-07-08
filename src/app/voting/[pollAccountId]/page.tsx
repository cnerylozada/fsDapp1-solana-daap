import { PublicKey } from '@solana/web3.js'
import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { notFound } from 'next/navigation'
import { VotingDetails } from '../_components/VotingDetails'

export default async function Page({ params }: { params: Promise<{ pollAccountId: string }> }) {
  const { pollAccountId } = await params
  const getPubKey = (pollAccountId: string) => {
    try {
      return new PublicKey(pollAccountId)
    } catch (error) {
      console.error(`Invalid public key ${pollAccountId}`, error)
    }
  }
  const pollAccountKey = getPubKey(pollAccountId)
  if (!pollAccountKey) return notFound()

  try {
    const pollAccount = await VOTING_PROGRAM.account.poll.fetch(pollAccountKey)
    const candidateAccountList = await VOTING_PROGRAM.account.candidate.fetchMultiple(pollAccount.candidatePdaList)

    return (
      <div className="space-y-4">
        <VotingDetails
          poll={pollAccount.poll}
          pollStart={pollAccount.pollStart}
          description={pollAccount.description}
        />

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
  } catch (error) {
    console.error(`Invalid public key ${pollAccountId}`, error)
    return notFound()
  }
}
