import { clusterApiUrl, Connection } from '@solana/web3.js'

export const CONNECTION = new Connection(clusterApiUrl('devnet'))
export const SOLSCAN_EXPLORER = `https://solscan.io/account`
export const DIAL_BLINK = 'https://dial.to/devnet?action=solana-action'
