import Link from 'next/link'

const UserNotFound = (): JSX.Element => (
  <div className="my-52">
    <div className="h-full rounded-lg hero bg-base-200">
      <div className="text-center hero-content">
        <div className="w-96">
          <h1 className="text-5xl font-bold">🤷</h1>
          <p className="pt-8 pb-3 text-xl">User successfully not found!</p>
          <p className="pt-3 pb-8 text-xl">Please go back and try again.</p>
          <Link href="/" className="btn btn-outline btn-primary">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default UserNotFound
