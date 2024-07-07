import { useEffect, useState, CSSProperties } from 'react'
import { getFileAsset } from '@sanity/asset-utils'
import { Box, Image, useBreakpoint, IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { urlForImage } from '~/lib/sanity.image'
import Nav from '../nav'

const Hero = ({ data }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isFixed, setIsFixed] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const breakpoint = useBreakpoint({ ssr: true })

  useEffect(() => {
    const url = getFileAsset(
      breakpoint !== 'base'
        ? data.video.asset._ref
        : data.videoMobile.asset._ref,
      {
        projectId: 'elbvgo99', // Reemplaza con tu ID de proyecto
        dataset: 'production', // Reemplaza con tu dataset
      },
    ).url
    setVideoUrl(url)
  }, [breakpoint, data.video.asset._ref, data.videoMobile.asset._ref])

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const maxScroll = 650 // Ajustado para que la transición ocurra más tarde
    setIsFixed(scrollY >= maxScroll)
  }, [scrollY])

  const getTitleStyle = (): CSSProperties => {
    const maxScroll = 650 // Ajustado para que la transición ocurra más tarde
    const scale = Math.max(1 - scrollY / maxScroll, 0.5)
    const translateY = Math.max(scrollY / 2, 0) // Ajustado para que el título se mueva hacia arriba

    return {
      transform: isFixed
        ? 'translate(-50%, 0) scale(0.5)'
        : `translate(-50%, -${translateY}px) scale(${scale})`, // Ajustado para mover el título hacia arriba
      transition: 'transform 0.3s ease',
      position: isFixed ? 'fixed' : 'absolute',
      top: isFixed ? 0 : 'auto',
      bottom: isFixed ? 'auto' : 0,
      left: '50%',
      transformOrigin: 'center center',
      zIndex: 1,
    }
  }

  return (
    <Box
      position="relative"
      width="full"
      height={{ base: '90vh', lg: '100vh' }}
      overflow="hidden"
    >
      <video
        src={videoUrl}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      {!isFixed && (
        <Image
          src={urlForImage(data.image).url()}
          alt={data.title}
          style={getTitleStyle()}
        />
      )}
      {isFixed && (
        <>
          <Nav logo={urlForImage(data.image).url()} />
        </>
      )}
    </Box>
  )
}

export default Hero
