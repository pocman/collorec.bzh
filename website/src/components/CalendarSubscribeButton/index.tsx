import {type ReactNode, useEffect, useState} from 'react';
import QRCode from 'qrcode';
import styles from './styles.module.css';

type CalendarSubscribeButtonProps = {
  buttonLabel: string;
  webcalUrl: string;
  qrFileName: string;
};

function CalendarSubscribeButton({buttonLabel, webcalUrl, qrFileName}: CalendarSubscribeButtonProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!isOpen || qrDataUrl) {
      return;
    }

    void QRCode.toDataURL(webcalUrl, {
      width: 960,
      margin: 1,
      color: {
        dark: '#1f2f39',
        light: '#ffffff',
      },
    })
      .then((dataUrl) => {
        setQrDataUrl(dataUrl);
      })
      .catch(() => {
        setErrorMessage('Impossible de generer le QR code pour le moment.');
      });
  }, [isOpen, qrDataUrl, webcalUrl]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.subscribeButtonGroup}>
        <a className={`button button--primary button--lg ${styles.subscribeMainButton}`} href={webcalUrl}>
          <span>{buttonLabel}</span>
        </a>
        <button
          type="button"
          className={`button button--primary button--lg ${styles.subscribeDropdownButton}`}
          onClick={() => setIsOpen(true)}
          aria-label={`Afficher le QR code pour ${buttonLabel}`}>
          <span aria-hidden="true" className={styles.icon}>▾</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={`QR code pour ${buttonLabel}`} onClick={closeModal}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Fermer">
              ×
            </button>

            <h3 className={styles.modalTitle}>{buttonLabel}</h3>
            <p className={styles.modalDescription}>Scannez ce QR code pour ouvrir l'abonnement webcal.</p>

            {errorMessage ? (
              <p className={styles.errorText}>{errorMessage}</p>
            ) : qrDataUrl ? (
              <>
                <img src={qrDataUrl} alt={`QR code abonnement calendrier: ${buttonLabel}`} className={styles.qrImage} />
                <div className={styles.modalActions}>
                  <a className="button button--primary button--lg" href={webcalUrl}>
                    S'abonner via webcal
                  </a>
                  <a className="button button--secondary button--lg" href={qrDataUrl} download={qrFileName}>
                    Télécharger le QR code
                  </a>
                </div>
              </>
            ) : (
              <p className={styles.loadingText}>Génération du QR code...</p>
            )}

            <p className={styles.webcalLinkWrap}>
              Lien direct : <a href={webcalUrl}>{webcalUrl}</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CalendarSubscribeButton;