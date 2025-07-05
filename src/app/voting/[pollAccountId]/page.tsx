import { PublicKey } from '@solana/web3.js'
import { votingProgram } from '@/contracts/voting/commons'

export default async function Page({ params }: { params: Promise<{ pollAccountId: string }> }) {
  const { pollAccountId } = await params
  const pollAccountKey = new PublicKey(pollAccountId)

  const pollAccount = await votingProgram.account.poll.fetch(pollAccountKey)
  const candidateAccountList = await votingProgram.account.candidate.fetchMultiple(pollAccount.candidatePdaList)

  console.log(`candidateAccountList`, candidateAccountList)

  return (
    <div>
      <div>Voting: asd</div>
      <div>Candidates: asd</div>
    </div>
  )
}
