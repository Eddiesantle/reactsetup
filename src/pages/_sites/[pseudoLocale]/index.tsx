import Head from 'next/head'
import Image from "next/image"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import { GetStaticProps, GetStaticPaths } from 'next'

import Seo from '../../../components/Seo'

import styles from '../../../styles/Home.module.css'
import logoTwitter from '../../../assets/twitter-logo.png'

type AppProps = { pseudoLocale: string };

const Home: React.FC = ({ pseudoLocale }: AppProps) => {



  const { locales, locale, defaultLocale } = useRouter()
  const { publicRuntimeConfig: { sites, pseudoLocales } } = getConfig()




  const nextLocale = pseudoLocales.find(otherLocale => otherLocale !== pseudoLocale)
  const nextSiteNr = locale === 'amparo' ? 2 : 1

  const siteAndLocale = sites[locale] && sites[locale].locales[pseudoLocale]

  return (
    <div className={[styles.container, locale, pseudoLocale].join(' ')}>
      <Seo title={siteAndLocale ? `App multi-tenency - ${siteAndLocale.title}` : `Site not found: '${locale}</strong>`} description="Aplicação do conceito de whitelabel"/>

      <main className={styles.main}>
        <h1 className={styles.title}>{siteAndLocale ? siteAndLocale.title : `Site not found: '${locale}</strong>`}</h1>
        {siteAndLocale && (
          <p className={styles.description}>{siteAndLocale.description}</p>
        )}

        <h1>Olá mundo - hello</h1>
        <Image src={logoTwitter} alt="" width="50" height="50"/>


        <div className={styles.grid}>
          <a href={`http://multi${nextSiteNr}-domain.com:3301/${pseudoLocale}`} className={styles.card}>
            <h3>Switch site (<code>locale</code>)</h3>
            <p>Currently: <strong>{locale}</strong></p>
            <p>Go to: _site/domain {nextSiteNr}</p>
          </a>

          <Link href={`/${nextLocale}`}>
            <a className={styles.card}>
              <h3>Switch language (<code>pseudoLocale</code>)</h3>
              <p>Currently: <strong>{pseudoLocale}</strong></p>
              <p>Switch locale to: <strong>{nextLocale}</strong></p>
            </a>
          </Link>

          {/* <div className={styles.card}>
            <h3>Props</h3>
            <p>locale (useRouter): <code>{JSON.stringify({ locales, locale, defaultLocale }, null, 2)}</code></p>
            <p>pseudoLocale: <code>{JSON.stringify({ pseudoLocales, pseudoLocale }, null, 2)}</code></p>
          </div> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://github.com/tomsoderlund/nextjs-multi-domain-locale'
          target='_blank'
          rel='noopener noreferrer'
        >
          Get the source code
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
    // ...


    const data = [
        { params: { pseudoLocale : 'en' }, locale : 'amparo' },
        { params: { pseudoLocale : 'en' }, locale : 'mavicard' },
      ];

    const project = data.find((p) => p.locale === context.locale);

    if (!project) {
        return {
        notFound: true,
        };
    }

    return {
        props: {
            pseudoLocale: project.params.pseudoLocale
        },
        revalidate: 60 // Seconds. This refresh time could be longer depending on how often data changes.
    }
  }


export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

 //console.log(locales)

    const paths = [
        { params: { pseudoLocale: 'en' }, locale: 'amparo' },
        { params: { pseudoLocale: 'en' }, locale: 'mavicard' }
    ]

    // ...
    return {
        paths: paths,
        fallback: "blocking" // true -> build page if missing, false -> serve 404
      }

  }



  export default Home
