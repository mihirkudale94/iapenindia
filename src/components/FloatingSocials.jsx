import { Facebook, Twitter, Linkedin, Instagram, Youtube } from './SocialIcons';

const FloatingSocials = () => {
  return (
    <div className="floating-socials" aria-label="Social Media Links">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon facebook"
        aria-label="Facebook"
      >
        <Facebook size={20} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon twitter"
        aria-label="Twitter"
      >
        <Twitter size={20} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon linkedin"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon instagram"
        aria-label="Instagram"
      >
        <Instagram size={20} />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon youtube"
        aria-label="YouTube"
      >
        <Youtube size={20} />
      </a>
    </div>
  );
};

export default FloatingSocials;
