import { Voting } from './type'
import { Program } from '@coral-xyz/anchor'
import VOTING_IDL from '@/contracts/voting/idl.json'
import { CONNECTION } from '../commons'

export const VOTING_PROGRAM: Program<Voting> = new Program(VOTING_IDL, { connection: CONNECTION })
