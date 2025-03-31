import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  )
}