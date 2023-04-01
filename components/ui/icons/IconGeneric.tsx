import { getFQDN } from '@/lib/utils'
import {
  faBitbucket,
  faCodepen,
  faDeviantart,
  faDiscord,
  faFacebook,
  faGithub,
  faGitlab,
  faInstagram,
  faLinkedin,
  faSoundcloud,
  faTwitter,
  IconDefinition,
  IconName,
} from '@fortawesome/free-brands-svg-icons'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconGeneric = ({ name }: { name: string }) => {
  let i: IconDefinition = faQrcode

  const icons: IconDefinition[] = [
    faGithub,
    faGitlab,
    faBitbucket,
    faCodepen,
    faDeviantart,
    faInstagram,
    faLinkedin,
    faFacebook,
    faTwitter,
    faDiscord,
    faSoundcloud,
  ]

  icons.map((icon) => {
    icon.iconName === (getFQDN(name) as IconName) && (i = icon)
  })

  return <FontAwesomeIcon className="big-icon" icon={i} />
}

export default IconGeneric
