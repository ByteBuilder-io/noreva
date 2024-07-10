import { Container } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import Hero from '~/components/componentsSanity/Hero'
import MultipleTexts from '~/components/componentsSanity/MultipleTexts'
import Footer from '~/components/footer'
import WhatsAppButton from '~/components/utils/chat'
import LoadingBackdrop from '~/components/utils/loading'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { homeQuery, settingsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <Container maxW={'4000px'} p={0}>
      {/* <Suspense fallback={<LoadingBackdrop isOpen />}>
        {props.settings && (
          <Nav data={props.settings[0].navbar} transparent={true} />
        )}
      </Suspense> */}
      {props.home.length !== 0 &&
        props.home[0].componentes[0]._type === 'Hero' && (
          <Hero data={props.home[0].componentes[0]} />
        )}
      {props.home.length !== 0 &&
        props.home[0].componentes.map((d, i) => {
          if (i === 0) return
          return (
            <Suspense fallback={<LoadingBackdrop isOpen />} key={i + d._type}>
              <ComponentRenderer component={d._type} data={d} />
            </Suspense>
          )
        })}
      <Suspense fallback={<LoadingBackdrop isOpen />}>
        {props.settings && <WhatsAppButton data={props.settings[0].whats} />}
        {props.settings && <Footer data={props.settings[0].footer} />}
      </Suspense>
    </Container>
  )
}

const ComponentRenderer = ({ component, data }) => {
  const DynamicComponent = dynamic(
    () => import(`../components/componentsSanity/${component}`),
    {
      ssr: true,
      loading: () => <LoadingBackdrop isOpen />,
    },
  )
  // @ts-ignore
  return <DynamicComponent data={data} />
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    settings: any
    home: any
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const settings = await client.fetch(settingsQuery)
  const home = await client.fetch(homeQuery)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      settings,
      home,
    },
  }
}
