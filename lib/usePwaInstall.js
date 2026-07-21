import { useEffect, useState, useCallback } from 'react';

// Handles the Android/Chrome native install prompt, iOS detection (which
// has no programmatic install API and needs manual "Add to Home Screen"
// instructions), and hides everything if already running standalone.
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent || '';
    setIsIos(/iphone|ipad|ipod/i.test(ua));

    const standaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
    const iosStandalone = window.navigator.standalone === true;
    setIsStandalone(standaloneMedia || iosStandalone);

    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

    const onInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };
    window.addEventListener('appinstalled', onInstalled);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  // canInstall: Android/Chrome has a native prompt ready, OR it's iOS
  // Safari (which never fires beforeinstallprompt but can still install
  // manually via Share -> Add to Home Screen).
  const canInstall = !isStandalone && (Boolean(deferredPrompt) || isIos);

  return { canInstall, isIos, isStandalone, promptInstall };
}
