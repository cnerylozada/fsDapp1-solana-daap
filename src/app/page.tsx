import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { DashboardFeature } from '@/components/dashboard/dashboard-feature'

export default async function Home() {
  const connection = new Connection(clusterApiUrl('devnet'))

  const votingContractKey = new PublicKey('7PEQLXDuMP9Gbat1CFXJEgUSeaYtchLPP7sKkKFqMvUG')

  const info = await connection.getAccountInfo(votingContractKey)
  console.log(`info`, info)

  // const poll_account = await votingProgram.account.poll.fetch(pda)
  // const candidate_pda_list = poll_account.candidatePdaList

  // const candidate_list = await votingProgram.account.candidate.fetchMultiple(candidate_pda_list)
  // console.log('candidate_list', candidate_list)

  return <DashboardFeature />
}
