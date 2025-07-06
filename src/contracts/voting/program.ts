import { Voting } from './type'
import { Program } from '@coral-xyz/anchor'
import VOTING_IDL from '@/contracts/voting/idl.json'
import { connection } from '../commons'

export const votingProgram: Program<Voting> = new Program(VOTING_IDL, { connection })
