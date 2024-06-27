import { Container } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { groq } from 'next-sanity'
import { ParsedUrlQuery } from 'querystring'
import { Suspense } from 'react'

import Footer from '~/components/footer'
import WhatsAppButton from '~/components/utils/chat'
import LoadingBackdrop from '~/components/utils/loading'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { settingsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

interface Params extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    settings: any
    pages: any
  },
  Params
> = async ({ draftMode = false, params }) => {
  const slug = params?.slug.join('/') || ''
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const settings = await client.fetch(settingsQuery)
  const pagesQuery = groq`
*[_type == "pages" && slug.current == "${slug}"]{
  title,
  "slug": slug.current,
  navSetting,
  componentes[]->{
    _type,
   ...
  }
}
`
  const pages = await client.fetch(pagesQuery)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      settings,
      pages,
      slug: '',
    },
  }
}

export default function SlugPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <Container maxW={'1920px'} p={0}>
      {/* <Suspense fallback={<LoadingBackdrop isOpen />}>
        {props.settings && props.pages.length !== 0 && (
          <Nav
            data={props.settings[0].navbar}
            transparent={props.pages[0].navSetting}
          />
        )}
      </Suspense> */}
      {props.pages.length !== 0 &&
        props.pages[0].componentes.map((d, i) => (
          <Suspense fallback={<LoadingBackdrop isOpen />} key={i + d._type}>
            <ComponentRenderer component={d._type} data={d} />
          </Suspense>
        ))}
      <Suspense fallback={<LoadingBackdrop isOpen />}>
        {props.settings && <WhatsAppButton data={props.settings[0].whats} />}
        {props.settings && <Footer data={props.settings[0].footer} />}
      </Suspense>
    </Container>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const ComponentRenderer = ({ component, data }) => {
  const DynamicComponent = dynamic(
    () => import(`../components/componentsSanity/${component}`),
    {
      loading: () => <LoadingBackdrop isOpen />,
    },
  )
  // @ts-ignore
  return <DynamicComponent data={data} />
}
