import Container from '../Container/Container';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>Footer</p>
        {'© '}
        <a
          color="inherit"
          href="https://github.com/swk23c8"
          target="_blank"
          rel="noopener noreferrer"
          className="copyrightLink"
        >
          by swk23c8
        </a>{' '}
        {new Date().getFullYear()}
      </Container>
    </footer>
  );
};

export default Footer;
