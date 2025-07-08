'use client'
import { CONNECTION } from '@/contracts/commons'
import { VOTING_PROGRAM } from '@/contracts/voting/program'
import { BN } from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  poll: z.string().min(15).max(25),
  description: z.string().min(15).max(40),
  candidates: z.array(z.object({ name: z.string().min(5).max(15) })).length(2),
})
type SchemaType = z.infer<typeof schema>

export const CreatePoll = () => {
  const { sendTransaction, publicKey } = useWallet()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<SchemaType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      candidates: [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'candidates',
  })

  if (!publicKey) return <div>Connect your wallet to perform operations</div>

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    try {
      const initializePollTx = new Transaction()
      const initializePoll = await VOTING_PROGRAM.methods
        .initializePoll(data.poll, data.description, new BN(3600))
        .accounts({ signer: publicKey })
        .transaction()
      initializePollTx.add(initializePoll)
      const initializePollTxSignature = await sendTransaction(initializePollTx, CONNECTION)
      console.log(`initializePollTxSignature`, initializePollTxSignature)

      const initializeCandidateTx = new Transaction()
      const initializeCandidateList = await Promise.all(
        data.candidates.map((_) =>
          VOTING_PROGRAM.methods.initializeCandidate(data.poll, _.name).accounts({ signer: publicKey }).transaction(),
        ),
      )
      initializeCandidateList.map((_) => initializeCandidateTx.add(_))
      const initializeCandidateTxSignature = await sendTransaction(initializeCandidateTx, CONNECTION)
      console.log(`initializeCandidateTxSignature`, initializeCandidateTxSignature)
    } catch (error) {
      console.log(`error`, error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <div className="font-bold">Poll</div>
          <div>
            <input {...register('poll')} className="border" placeholder="Poll name" />
          </div>
          <div>{!!errors.poll && <div className="mt-1 text-sm text-red-700">{errors.poll.message}</div>}</div>
        </div>
        <div>
          <div>
            <input {...register('description')} className="border" placeholder="Description" />
          </div>
          <div>
            {!!errors.description && <div className="mt-1 text-sm text-red-700">{errors.description.message}</div>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="font-bold">Candidates</div>
            <div className="text-right">
              <button
                className="p-2 text-xs bg-blue-100 rounded-md cursor-pointer"
                type="button"
                onClick={() => {
                  append({
                    name: '',
                  })
                }}
              >
                Add new candidate
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex space-x-4">
                  <div>
                    <input className="border" placeholder="Candidate name" {...register(`candidates.${index}.name`)} />
                    {!!errors?.candidates?.[index]?.name && (
                      <div className="mt-1 text-sm text-red-700">{errors?.candidates?.[index]?.name?.message}</div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="py-1 px-2 text-xs bg-red-100 rounded-md cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      Remove field
                    </button>
                  </div>
                </div>
              )
            })}
            {!!errors?.candidates && <div className="mt-1 text-sm text-red-700">{errors?.candidates?.message}</div>}
          </div>
        </div>

        <div>
          <button
            className="p-2 bg-blue-100 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
            type="submit"
            disabled={!isValid}
          >
            Create new poll
          </button>
        </div>

        {/* {isPending && <div>Loading transaction ...</div>} */}
        {true && (
          <div>
            Check your transaction:{' '}
            {/* <Link
                href={`${SOLSCAN_EXPLORER}/${transactionHash}`}
                target="_blank"
                className="text-blue-700 text-sm underline"
              >
                Transaction Hash: {shortenHex(data.transactionHash)}
              </Link> */}
          </div>
        )}
        {/* {error && <div className="text-sm text-red-700">{error.message}</div>} */}
      </form>
    </div>
  )
}
