import { Container, Stack, useBreakpointValue } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import ContentAnimation from '../utils/animation'

const BigText = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const [componentWidth, setComponentWidth] = useState(0)
  const fontSize = useBreakpointValue(
    { base: '1.25rem', lg: `${data.textSize}px` },
    { ssr: false },
  )

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const width = ref.current.getBoundingClientRect().width
        setComponentWidth(width)
      }
    }

    // Crear el ResizeObserver
    const resizeObserver = new ResizeObserver(handleResize)

    // Copia de ref.current
    const currentRef = ref.current

    // Observa el elemento actual
    if (currentRef) {
      resizeObserver.observe(currentRef)
    }

    // Maneja el tamaño inicial
    handleResize()

    // Limpia el observer cuando el componente se desmonta
    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      <Container m={'auto'} maxW={'1420px'} pt={'150px'} pb={'150px'}>
        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInViewport ? 1 : 0, y: isInViewport ? 0 : 50 }}
          transition={{ duration: 0.9 }}
        > */}
        {/* <PortableText value={data.text} components={components} /> */}
        <ContentAnimation
          fontSize={fontSize}
          maxWidth={componentWidth}
          text={data.text2}
          needAjust={true}
        />
        <Stack direction={'column'} spacing={5} pt={20}>
          <Stack
            direction={['column', 'row']}
            width={'full'}
            align={{ base: 'center', lg: 'center' }}
            justify={'center'}
            spacing={{ base: 10, lg: 20 }}
          >
            {data.columns.map((d, i) => {
              return (
                <Link href={d.link.url || '#'} target="_blank" key={d._key}>
                  <Image
                    src={urlForImage(d.image).url()}
                    alt={'image'}
                    width={200}
                    height={100}
                  />
                </Link>
              )
            })}
          </Stack>
        </Stack>
        {/* </motion.div> */}
      </Container>
    </div>
  )
}

export default BigText
