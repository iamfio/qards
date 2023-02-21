'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

const AuthButton = () => {
  const { data: session } = useSession()

  return (
    <div>
      {!session && (
        <div>
          <button onClick={() => signIn()}>SIGN IN</button>
        </div>
      )}
      
      {session && (
        <div>
          <button onClick={() => signOut()}>SIGN OUT</button>

          <div>Hello {session.user?.name} ✌️</div>
        </div>
      )}
    </div>
  )
}

export default AuthButton
