import Link from 'next/link'

export function DashboardFeature() {
  return (
    <div>
      <div className="mb-2">
        <Link
          href={'https://www.linkedin.com/in/cristian-nery-027b70180/'}
          target="_blank"
          className="underline text-blue-700"
        >
          Author: cristh nery web2/web3 developer
        </Link>
      </div>
      <div className="mb-4">
        <ul className="list-disc list-inside">
          <li>
            I would glad to reveice your feedback. You can find the smart contracts and dapp code in these repositories:
            <div>
              <div>
                <Link href={'https://github.com/cnerylozada/fsDapp1-solana-daap'} target="_blank" className="font-bold">
                  GITHUB: fsDapp1-solana-daap
                </Link>
              </div>
              <div>
                <Link
                  href={'https://github.com/cnerylozada/fsDapp1-solana-contracts'}
                  target="_blank"
                  className="font-bold"
                >
                  GITHUB: fsDapp1-solana-contracts
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <div>
          <Link href={'/voting'} className="block p-2 border rounded-md">
            Voting
          </Link>
        </div>
      </div>
    </div>
  )
}
