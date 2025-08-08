import { useState, ChangeEvent, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { routing } from '@/i18n/routing';
import styles from './LocaleSwitcher.module.css';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const getFlagSrc = (locale: string) => {

    switch (locale) {
      case 'hy':
        return '/assets/svg/armenian.svg';
      case 'ru':
        return '/assets/svg/russian.svg';
      case 'en':
      default:
        return '/assets/svg/english.svg';
    }
  };

  const handleSelect = (locale: string) => {
    setSelectedLocale(locale);
    // setIsOpen(false);

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- See original comment
        { pathname, params },
        { locale }
      );
    });
  };


  console.log("isPendingisPending", isPending)

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src={getFlagSrc(selectedLocale)} alt="Flag" width={30} height={30} />
        {/* <span>{t('locale', { locale: selectedLocale })}</span> */}
      </button>

      {isOpen && (
        <div className={styles.options}>
          {routing.locales.map((locale, index) => (
            <div
              key={`${locale}_${index}`}
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleSelect(locale) }}
              className={styles.option}
            >
              <Image src={getFlagSrc(locale)} alt="Flag" width={30} height={30} />
              {/* <span>{t('locale', { locale })}</span> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
