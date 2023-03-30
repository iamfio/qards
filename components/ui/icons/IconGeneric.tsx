import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faFacebook, faTwitter, IconDefinition, faDiscord, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faBarcode } from '@fortawesome/free-solid-svg-icons'

const IconGeneric = ({ name }: { name: string }) => {

  let i: IconDefinition = faBarcode;

  // TO DO: handle edge cases like github repo with the name linkedin, linledin.de,  anything .de or so
  if (name.includes('github.com')) {
    i = faGithub;
  } else if (name.includes('linkedin.com')) {
    i = faLinkedin;
  } else if (name.includes('facebook.com')) {
    i = faFacebook;
  } else if (name.includes('twitter.com')) {
    i = faTwitter;
  } else if (name.includes('instagram.com')) {
    i = faInstagram;
  } else if (name.includes('discord.com')) {
    i = faDiscord;
  } else if (name.includes('soundcloud.com')) {
    i = faSoundcloud;
  } 

  return (
    // <div className="w-12 bg-blue-100 rounded-full text-neutral-focus">
    //   <span className="text-xl">{name}</span>
    // </div>
    <div className="w-12 rounded-full">
      <FontAwesomeIcon className="big-icon" icon={i} />
    </div>
  )
}

export default IconGeneric
