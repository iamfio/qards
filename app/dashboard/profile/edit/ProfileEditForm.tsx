'use client'

import { User } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  username: string
  company: string
  jobRole: string
}

const ProfileEditForm = ({ user }: { user: User }) => {
  const router = useRouter()

  const [usernamePresent, setUsernamePresent] = useState<boolean>(false)

  useEffect(() => {
    if (user.username) {
      setUsernamePresent(true)
    }
  }, [user.username])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user.name || '',
      username: user.username || '',
      company: user.company || '',
      jobRole: user.jobRole || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    const userData = {
      id: user.id,
      name: data.name,
      username: data.username,
      company: data.company,
      jobRole: data.jobRole,
    }

    const response = await fetch(`/api/user`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })

    if (response.ok) {
      const user = await response.json()

      if (user.username) {
        setUsernamePresent(true)
      }

      router.push('/dashboard')
    }
  }

  return (
    <div className="w-[275px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-xs form-control">
          {!usernamePresent && (
            <div className="text-center shadow-lg alert alert-info">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0 w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <div>
                    Please notice, you can set your <strong>Username</strong>{' '}
                    just <strong>ONCE!</strong>{' '}
                  </div>
                  <div>So, choose wisely.</div>
                </div>
              </div>
            </div>
          )}
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            {...register('username')}
            className="w-full max-w-xs input input-bordered"
            placeholder="Username"
            disabled={usernamePresent}
          />
          {errors.username && <div>Username is required</div>}
        </div>
        <div className="w-full max-w-xs form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full max-w-xs input input-bordered"
            placeholder="Full Name"
          />
        </div>
        <div className="w-full max-w-xs form-control">
          <label htmlFor="company" className="label">
            <span className="label-text">Company</span>
          </label>
          <input
            type="text"
            {...register('company')}
            className="w-full max-w-xs input input-bordered"
            placeholder="Company"
          />
          {errors.company && <div>Company is required</div>}
        </div>
        <div className="w-full max-w-xs form-control">
          <label htmlFor="jobRole" className="label">
            <span className="label-text">Job Role</span>
          </label>
          <input
            type="text"
            {...register('jobRole')}
            className="w-full max-w-xs input input-bordered"
            placeholder="Job Role"
          />
        </div>

        <div className="">
          <button
            type="submit"
            className="my-2 btn btn-primary btn-block btn-outline"
          >
            Save
          </button>
        </div>
      </form>

      <button
        type="button"
        className="my-2 btn btn-secondary btn-block btn-outline"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </div>
  )
}

export default ProfileEditForm
