import { PublicKey } from '@solana/web3.js'
import { votingProgram } from '@/contracts/voting/commons'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ pollAccountId: string }> }) {
  const { pollAccountId } = await params
  const getPubKey = () => {
    try {
      return new PublicKey(pollAccountId)
    } catch (error) {
      console.error(`Invalid public key`, error)
    }
  }
  const pollAccountKey = getPubKey()
  if (!pollAccountKey) return notFound()

  const pollAccount = await votingProgram.account.poll.fetch(pollAccountKey)
  const candidateAccountList = await votingProgram.account.candidate.fetchMultiple(pollAccount.candidatePdaList)

  return (
    <div>
      <div>
        <strong>Voting:</strong> {pollAccount.poll}
      </div>
      <div>
        <strong>Description:</strong> {pollAccount.description}
      </div>

      <div>
        <div>Candidates:</div>
        {candidateAccountList.map((_) => (
          <div key={_?.name}>{_?.name}</div>
        ))}
      </div>
    </div>
  )
}
