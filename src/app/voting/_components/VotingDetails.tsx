import { getDateAndTime } from '@/lib/utils'
import { BN } from '@coral-xyz/anchor'

export const VotingDetails = ({
  poll,
  pollStart,
  description,
}: {
  poll: string
  pollStart: BN
  description: string
}) => {
  return (
    <div className="border rounded-md p-3">
      <div>
        <span className="font-bold">Poll:</span> {poll}
      </div>
      <div>
        <span className="font-bold">Created at:</span> {getDateAndTime(`${pollStart}`)}
      </div>
      <div>
        <span className="font-bold">Description:</span> {description}
      </div>
    </div>
  )
}
