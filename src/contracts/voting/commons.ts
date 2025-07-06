import { clusterApiUrl, Connection } from '@solana/web3.js'
import { Voting } from './type'
import { Program } from '@coral-xyz/anchor'
import VOTING_IDL from '@/contracts/voting/idl.json'

export const connection = new Connection(clusterApiUrl('devnet'))
export const votingProgram: Program<Voting> = new Program(VOTING_IDL, { connection })
