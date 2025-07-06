import { votingProgram } from '@/contracts/voting/commons'
import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { CreatePoll } from './_components/CreatePoll'

export default async function Page() {
  const POLL_ACCOUNT_TAG = Buffer.from('poll_account')

  const walletKey = new PublicKey(`AKeJdxqP6MpFyhcFGUN79NTUwe2ntZNoGjw37UTbbFp`)
  const _poll = 'votacion 4:19'
  const [pollAccountPda] = PublicKey.findProgramAddressSync(
    [POLL_ACCOUNT_TAG, walletKey.toBuffer(), Buffer.from(_poll)],
    votingProgram.programId,
  )
  console.log(`pollAccountPda`, pollAccountPda.toString())

  //   const asd = await votingProgram.methods
  //     .initializePoll(_poll, 'description', new BN(3600))
  //     .accounts({ signer: walletKey })
  //     .rpc()

  return (
    <div>
      <div>New voting</div>
      <CreatePoll />
    </div>
  )
}
