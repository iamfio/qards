'use client'
import { useQRCode } from 'next-qrcode'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

type QardProps = {
  accountName: string
  accountLink: string
}

const Qard = ({ accountName, accountLink }: QardProps) => {
  const { Canvas } = useQRCode()

  // TODO: pick right icon for right accountName
  const iconsList = [
    'AiOutlineGithub',
    'AiOutlineLinkedin',
    'AiOutlineInstagram',
    'AiOutlineFacebook',
    'AiOutlineGitlab',
    'FaXingSquare',
    'AiOutlineMedium',
  ]

  const capitalize = (account: string) =>
    account.charAt(0).toUpperCase() + account.slice(1)

  return (
    <>
      <div className="shadow-xl card w-52 bg-base-100">
        <figure className="px-10 pt-10">
          <Canvas
            text={accountLink}
            options={{
              level: 'H',
              margin: 1,
              scale: 4,
              width: 200,
              color: {
                dark: '#1e1e2e',
                light: '#fff',
              },
            }}
          />
        </figure>
        <div className="items-center text-center card-body">
          <h2 className="card-title">{capitalize(accountName)}</h2>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm btn-square btn-outline">
              <AiOutlineEdit />
            </button>

            <button className="btn btn-error btn-sm btn-square btn-outline">
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Qard
