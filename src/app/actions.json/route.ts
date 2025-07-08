import { createActionHeaders, type ActionsJson } from '@solana/actions'

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: '/now',
        apiPath: '/api/blinks/voting/*',
      },
    ],
  }

  return Response.json(payload, {
    headers: createActionHeaders(),
  })
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET
