import '@/styles/globals.css';
import StartupOfferPopup from '@/components/StartupOfferPopup';

export default function App({ Component, pageProps }) {
  const content = pageProps.content;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <Component {...pageProps} />
      {content && (
        <StartupOfferPopup offer={content.startupOffer} contact={content.contact} />
      )}
    </>
  );
}
