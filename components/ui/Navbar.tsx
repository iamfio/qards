'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import AuthButton from './AuthButton'

type NavbarProps = {
  user: Session['user']
}

const Navbar = ({ user }: NavbarProps): JSX.Element => {
  return (
    <div className="shadow-md navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl normal-case btn btn-ghost">
          <span className="text-xxl text-primary">Q</span>a
          <span className="text-xl text-primary">R</span>ds
        </a>
      </div>

      <div className="flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.image || ''} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                </Link>
              </li>

              <li>
                <a onClick={() => signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        )}
        {!user && <AuthButton />}
      </div>
    </div>
  )
}

export default Navbar
