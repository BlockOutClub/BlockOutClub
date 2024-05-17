import { Facebook, Instagram, X } from '@components/svgs/socials';

type Props = {
  platform: string;
};

export const SocialIcon: React.FC<Props> = (props) => {
  switch (props.platform.toLowerCase()) {
    case 'instagram':
      return <Instagram />;
    case 'twitter':
      return <X />;
    case 'facebook':
      return <Facebook />;
    default:
      return null;
  }
};
