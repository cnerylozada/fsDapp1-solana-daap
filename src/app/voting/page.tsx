import Link from 'next/link'
import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { ellipsify } from '@/lib/utils'
import { VotingDetails } from './_components/VotingDetails'
import { SOLSCAN_EXPLORER } from '@/contracts/commons'

export default async function Page() {
  const pollAccountList = await VOTING_PROGRAM.account.poll.all()
  const programId = VOTING_PROGRAM.programId.toString()

  return (
    <div className="space-y-4">
      <div>
        <div className="font-bold">
          Voting Contract:{' '}
          <Link
            href={`${SOLSCAN_EXPLORER}/${programId}?cluster=devnet`}
            target="_blank"
            className="text-blue-700 underline"
          >
            {ellipsify(programId)}
          </Link>
        </div>
      </div>

      <div>
        <Link href={`/voting/new`} className="p-2 bg-blue-100 rounded-md">
          Create new contract
        </Link>
      </div>

      <div className="space-y-4">
        {pollAccountList.map((_) => {
          const { account } = _
          const id = account.id.toString()

          return (
            <Link key={id} href={`voting/${id}`} className="block">
              <VotingDetails poll={account.poll} pollStart={account.pollStart} description={account.description} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
