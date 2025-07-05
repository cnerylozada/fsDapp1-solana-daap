import Link from 'next/link'
import { votingProgram } from '@/contracts/voting/commons'

export default async function Page() {
  const pollAccountList = await votingProgram.account.poll.all()

  return (
    <div>
      <div className="space-y-4">
        {pollAccountList.map((_) => {
          const { account } = _
          const id = account.id.toString()
          return (
            <Link key={id} href={`voting/${id}`} className="block border rounded-md p-3">
              <div>
                <span className="font-bold">Poll:</span> {account.poll}
              </div>
              <div>
                <span className="font-bold">Description:</span> {account.description}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
