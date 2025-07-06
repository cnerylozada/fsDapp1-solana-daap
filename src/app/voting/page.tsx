import Link from 'next/link'
import { votingProgram } from '@/contracts/voting/program'
import { ellipsify } from '@/lib/utils'
import { VotingDetails } from './_components/VotingDetails'

export default async function Page() {
  const pollAccountList = await votingProgram.account.poll.all()
  const programId = votingProgram.programId.toString()

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="font-bold">
          Voting Contract:{' '}
          <Link
            href={`https://solscan.io/account/${programId}?cluster=devnet`}
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
        {pollAccountList.reverse().map((_) => {
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
