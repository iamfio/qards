'use client'

import { signIn, useSession } from 'next-auth/react'

const AuthButton: React.FC = () => {
  const { data: session } = useSession()

  return (
    <div>
      {!session && (
        <div>
          <button
            onClick={() => {
              signIn()
            }}
            className="btn btn-sm btn-outline btn-primary"
          >
            SIGN IN / SIGN UP
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthButton
