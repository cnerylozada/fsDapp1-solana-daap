import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Program } from '@coral-xyz/anchor'
import VOTING_CONTRACT from '@/contracts/voting/idl.json'
import { Voting } from '@/contracts/voting/type'
import { DashboardFeature } from '@/components/dashboard/dashboard-feature'

export default async function Home() {
  const keypair = Keypair.generate()

  const connection = new Connection(clusterApiUrl('devnet'))
  const playgroundWalletKey = new PublicKey('6yBA1xQPxQN7TT5eTMRYgk6zvJm8e9V5VrxcrqisJ7V8')

  const votingContractKey = new PublicKey('7PEQLXDuMP9Gbat1CFXJEgUSeaYtchLPP7sKkKFqMvUG')

  const info = await connection.getAccountInfo(votingContractKey)
  console.log(`info`, info)

  const votingProgram: Program<Voting> = new Program(VOTING_CONTRACT, { connection })

  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from('poll_account'), playgroundWalletKey.toBuffer(), Buffer.from('votacion 12:40')],
    votingContractKey,
  )
  const poll_account = await votingProgram.account.poll.fetch(pda)
  const candidate_pda_list = poll_account.candidatePdaList

  const candidate_list = await votingProgram.account.candidate.fetchMultiple(candidate_pda_list)
  // console.log('candidate_list', candidate_list)

  return <DashboardFeature />
}
