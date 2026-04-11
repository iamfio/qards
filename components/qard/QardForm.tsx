'use client'

import { isURL } from '@/lib/utils'
import { ErrorMessage } from '@hookform/error-message'
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
  onClose(): void
  getQards(): Promise<void>
}

export default function QardForm({
  qardId,
  isEdit,
  accountName,
  accountLink,
  onClose,
  getQards,
}: QardProps) {
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


  async function onSubmit(data: FormData) {
    const response = await fetch('/api/qard/', {
      method: isEdit ? 'PUT' : 'POST',
      body: JSON.stringify({
        qardId: qardId,
        userId: session?.user?.id,
        accountName: data.accountName,
        accountLink: data.accountLink,
      }),
    })

    if (response.ok) {
      await getQards()
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
              <span className="font-light text-secondary">
                <ErrorMessage errors={errors} name="accountName" />
              </span>
            </label>
            <input
              {...register('accountName', {
                required: 'Required field',
              })}
              type="text"
              className="w-full max-w-xs input input-bordered"
              placeholder="Account Name"
            />
          </div>
          <div className="w-full max-w-xs form-control">
            <label htmlFor="accountLink" className="label">
              <span className="label-text">Account Link</span>
              <span className="font-light text-secondary">
                <ErrorMessage errors={errors} name="accountLink" />
              </span>
            </label>
            <input
              {...register('accountLink', {
                required: 'Required field',
                validate: (value) => isURL(value) || 'Invalid URL',
              })}
              type="text"
              className="w-full max-w-xs input input-bordered"
              placeholder="Account URL"
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
