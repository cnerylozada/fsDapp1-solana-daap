'use client'
import { connection } from '@/contracts/voting/commons'
import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

export const CreatePoll = () => {
  const { sendTransaction, publicKey } = useWallet()

  return (
    <div>
      <div>CreatePoll</div>

      <button
        onClick={async () => {
          if (publicKey) {
            const transaction = new Transaction()

            const toPubkey = new PublicKey(`CJVvnwfGKpWLfWZxbCc5KyyTHiebfgQQj4m7cYN6mV3E`)
            const sendSolInstruction = SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey,
              lamports: 0.01 * LAMPORTS_PER_SOL,
            })
            transaction.add(sendSolInstruction)

            const signature = await sendTransaction(transaction, connection)
            console.log(`Transaction signature: ${signature}`)
          }
        }}
      >
        Create
      </button>
    </div>
  )
}
