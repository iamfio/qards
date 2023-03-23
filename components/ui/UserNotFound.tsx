import Link from 'next/link'

const UserNotFound = () => (
  <div className="my-8">
    <div className="snap-mandatory snap-always snap-y">
      <div className="snap-start">
        <div className="min-h-screen hero bg-base-300">
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
    </div>
  </div>
)

export default UserNotFound