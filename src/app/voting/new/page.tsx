import Link from 'next/link'
import { CreatePoll } from './_components/CreatePoll'

export default async function Page() {
  return (
    <div className="space-y-4">
      <div className="text-right">
        <Link href={`./`} className="text-blue-700">
          Go back
        </Link>
      </div>
      <div className="font-bold">CreatePoll</div>
      <CreatePoll />
    </div>
  )
}
