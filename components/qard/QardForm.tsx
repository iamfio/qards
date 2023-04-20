'use client'

import { isURL } from '@/lib/utils'
import { Qard } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

type FormData = {
  accountName: string
  accountLink: string
}

type QardProps = {
  qardId?: string
  userId?: string
  isEdit?: boolean
  accountName?: Qard['accountName']
  accountLink?: Qard['accountLink']
  handleToggle?: any
  onClose(): void
  getQards(): Promise<void>
}

const QardForm: React.FC<QardProps> = ({
  qardId,
  isEdit,
  accountName,
  accountLink,
  onClose,
  getQards,
}) => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      accountName: accountName,
      accountLink: accountLink,
    },
  })

  const onSubmit = async (data: FormData) => {
    if (data.accountName.length === 0) {
      alert('Please enter valid Account Nave')
      return
    }

    if (!isURL(data.accountLink)) {
      alert('Invalid URL')
      return
    }

    const response = await fetch('/api/qard/', {
      method: isEdit ? 'PUT' : 'POST',
      body: JSON.stringify({
        qardId: qardId,
        userId: session?.user.id,
        accountName: data.accountName,
        accountLink: data.accountLink,
      }),
    })

    if (response.ok) {
      getQards()
      onClose()
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
