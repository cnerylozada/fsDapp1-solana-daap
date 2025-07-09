/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/voting.json`.
 */
export type Voting = {
  address: '14iS414u4c7xpRiQrR5SGRR1cTQojgWLCXhCpoL5hC7C'
  metadata: {
    name: 'voting'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'initializeCandidate'
      discriminator: [210, 107, 118, 204, 255, 97, 112, 26]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'candidateAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 97, 110, 100, 105, 100, 97, 116, 101, 95, 97, 99, 99, 111, 117, 110, 116]
              },
              {
                kind: 'account'
                path: 'signer'
              },
              {
                kind: 'arg'
                path: 'name'
              },
            ]
          }
        },
        {
          name: 'pollAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [112, 111, 108, 108, 95, 97, 99, 99, 111, 117, 110, 116]
              },
              {
                kind: 'account'
                path: 'signer'
              },
              {
                kind: 'arg'
                path: 'poll'
              },
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'poll'
          type: 'string'
        },
        {
          name: 'name'
          type: 'string'
        },
      ]
    },
    {
      name: 'initializePoll'
      discriminator: [193, 22, 99, 197, 18, 33, 115, 117]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'pollAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [112, 111, 108, 108, 95, 97, 99, 99, 111, 117, 110, 116]
              },
              {
                kind: 'account'
                path: 'signer'
              },
              {
                kind: 'arg'
                path: 'poll'
              },
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'poll'
          type: 'string'
        },
        {
          name: 'description'
          type: 'string'
        },
        {
          name: 'pollEndInSeconds'
          type: 'u64'
        },
      ]
    },
    {
      name: 'vote'
      discriminator: [227, 110, 155, 23, 136, 126, 172, 25]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'candidateAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 97, 110, 100, 105, 100, 97, 116, 101, 95, 97, 99, 99, 111, 117, 110, 116]
              },
              {
                kind: 'account'
                path: 'signer'
              },
              {
                kind: 'arg'
                path: 'candidateName'
              },
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'candidateName'
          type: 'string'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'candidate'
      discriminator: [86, 69, 250, 96, 193, 10, 222, 123]
    },
    {
      name: 'poll'
      discriminator: [110, 234, 167, 188, 231, 136, 153, 111]
    },
  ]
  errors: [
    {
      code: 6000
      name: 'pollTooLong'
      msg: 'Poll name too long'
    },
    {
      code: 6001
      name: 'descriptionTooLong'
      msg: 'Poll name too long'
    },
  ]
  types: [
    {
      name: 'candidate'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'votes'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'poll'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'id'
            type: 'pubkey'
          },
          {
            name: 'poll'
            type: 'string'
          },
          {
            name: 'description'
            type: 'string'
          },
          {
            name: 'pollStart'
            type: 'u64'
          },
          {
            name: 'pollEnd'
            type: 'u64'
          },
          {
            name: 'candidateAmount'
            type: 'u64'
          },
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'candidatePdaList'
            type: {
              vec: 'pubkey'
            }
          },
        ]
      }
    },
  ]
}
