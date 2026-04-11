import { getFQDN } from "@/lib/utils";
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
  faPinterest,
  faVk,
  faFacebookF,
  faFlickr,
  faTelegram,
  faWhatsapp,
  IconDefinition,
  IconName,
} from "@fortawesome/free-brands-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconGeneric({ name }: { name: string }) {
  let i: IconDefinition = faQrcode;

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
    faPinterest,
    faVk,
    faFacebookF,
    faFlickr,
    faTelegram,
    faWhatsapp,
  ];

  icons.forEach((icon) => {
    if (icon.iconName === (getFQDN(name) as IconName)) {
      i = icon;
    }
  });

  return (
    <FontAwesomeIcon
      className="big-icon text-primary"
      icon={i}
    />
  );
}
