import { DashboardFeature } from '@/components/dashboard/dashboard-feature'

export default async function Home() {
  // const poll_account = await votingProgram.account.poll.fetch(pda)
  // const candidate_pda_list = poll_account.candidatePdaList

  // const candidate_list = await votingProgram.account.candidate.fetchMultiple(candidate_pda_list)
  // console.log('candidate_list', candidate_list)

  return <DashboardFeature />
}
