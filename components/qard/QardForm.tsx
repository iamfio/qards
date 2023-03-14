'use client'

import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

type FormData = {
  accountName: string
  accountLink: string
}

type QardProps = {
  qardId?: string
  userId?: string
  isEdit?: boolean
  accountName?: string
  accountLink?: string
  // handleToggle?: Dispatch<SetStateAction<boolean>>
  handleToggle?: any
  onClose(): void
}

const QardForm = ({
  userId,
  qardId,
  isEdit,
  handleToggle,
  accountName,
  accountLink,
  onClose,
}: QardProps) => {
  // const router = useRouter()
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      accountName: accountName ?? '',
      accountLink: accountLink ?? '',
    },
  })

  // TODO: Impl. PUT for known QardID (Edit Qard)
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

      // router.push('/dashboard/profile')
    }
  }

  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          <h2 className="card-title text-primary">
            {isEdit ? 'Edit' : 'New'} Qard
          </h2>

          <p className="font-light text-secondary">
            {isEdit
              ? 'Please alter existing data to edit the '
              : 'Please fill out the form to create new '}{' '}
            Qard
          </p>

          <div className="w-full max-w-xs form-control">
            <label htmlFor="accountName" className="label">
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
            <label htmlFor="accountLink" className="label">
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

            <button
              type="button"
              className="btn btn-secondary btn-outline"
              // onClick={() => redirect('/dashboard/qard/new')}
              // onClick={handleToggle}
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default QardForm
