'use client'

import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

type FormData = {
  accountName: string
  accountLink: string
}

const QardCreateForm = () => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const newQard = {
      userId: session?.user.id,
      accountName: data.accountName,
      accountLink: data.accountLink,
    }

    const response = await fetch('/api/qard', {
      method: 'POST',
      body: JSON.stringify(newQard),
    })

    if (response.ok) {
      const qard = await response.json()

      console.log(qard)
    }
  }

  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h2 className="card-title text-primary">New Qard</h2>

          <p className="font-light text-secondary">
            Please fill out the form to create new Qard
          </p>

          <div className="w-full max-w-xs form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Account Name</span>
            </label>
            <input
              type="text"
              {...register('accountName')}
              className="w-full max-w-xs input input-bordered"
              placeholder="Account Name"
            />
          </div>
          <div className="w-full max-w-xs form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Account Link</span>
            </label>
            <input
              type="text"
              {...register('accountLink')}
              className="w-full max-w-xs input input-bordered"
              placeholder="Account Link"
            />
          </div>
          <div className="justify-end card-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-secondary btn-outline">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default QardCreateForm
