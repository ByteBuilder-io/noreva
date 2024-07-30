import 'mapbox-gl/dist/mapbox-gl.css'

import {
  Box,
  Container,
  Divider,
  Heading,
  ListItem,
  OrderedList,
  ScaleFade,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import mapboxgl from 'mapbox-gl'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import useIsInViewport from '~/hooks/useIsInViewport'

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children, value }) => {
      if (value.children[0].text === '') return <br />
      return <Text fontSize={'16px'}>{children}</Text>
    },
    h1: ({ children }) => {
      return <Heading size={{ base: 'xl', lg: '2xl' }}>{children}</Heading>
    },
    h2: ({ children }) => {
      return <Heading size={{ base: 'lg', lg: 'xl' }}>{children}</Heading>
    },
    h3: ({ children }) => {
      return <Heading size={{ base: 'md', lg: 'lg' }}>{children}</Heading>
    },
    h4: ({ children }) => {
      return <Heading size={{ base: 'sm', lg: 'md' }}>{children}</Heading>
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <Link
          style={{ textDecoration: 'underline black' }}
          href={value.href}
          rel={rel}
          target="_blank"
        >
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({ children }) => {
      return (
        <UnorderedList style={{ marginLeft: '20px' }}>{children}</UnorderedList>
      )
    },
    number: ({ children }) => {
      return (
        <OrderedList style={{ marginLeft: '20px' }}>{children}</OrderedList>
      )
    },
  },
  listItem: {
    bullet: ({ children }) => {
      return <ListItem>{children}</ListItem>
    },
    number: ({ children }) => {
      return <ListItem>{children}</ListItem>
    },
  },
}
const Map = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.4)
  console.log(data.points)

  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <ScaleFade initialScale={0.9} in={isInViewport}>
          {data.mapPosition ? (
            <RightMap data={data} />
          ) : (
            <LeftMap data={data} />
          )}
        </ScaleFade>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

const LeftMap = ({ data }: { data: any }) => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: 10, lg: 0 }}
    >
      <Box maxWidth={'35vw'}>
        <RenderMap
          cords={{ long: data.long, lat: data.lat }}
          point={data.points}
          nameDot={data.nameDot}
        />
      </Box>
      <Box
        maxW={700}
        minW={{ base: '', lg: 700 }}
        marginLeft={{ base: 0, lg: 10 }}
      >
        <PortableText value={data.text} components={components} />
      </Box>
    </Stack>
  )
}

const RightMap = ({ data }: { data: any }) => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: 10, lg: 0 }}
    >
      <Box
        maxW={700}
        minW={{ base: '', lg: 700 }}
        marginRight={{ base: 0, lg: 10 }}
      >
        <PortableText value={data.text} components={components} />
      </Box>
      <Box maxWidth={{ base: '100%', lg: '35vw' }}>
        <RenderMap
          cords={{ long: data.long, lat: data.lat }}
          point={data.points}
          nameDot={data.nameDot}
        />
      </Box>
    </Stack>
  )
}

const RenderMap = ({ cords, point, nameDot }) => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_SANITY_MAP_TOKEN || ''

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [Number(cords.lat), Number(cords.long)],
      zoom: 13.8,
      logoPosition: undefined, // Esto oculta el logo
      attributionControl: false, // Esto oculta los derechos de autor
    })
    let geojson
    if (point) {
      geojson = {
        type: 'FeatureCollection',
        features: point.map((e) => ({
          type: 'Feature',
          properties: {
            description: `<p class='title-popup'>${e.nameDot}</p>`,
          },
          geometry: {
            type: 'Point',
            coordinates: [Number(e.lat), Number(e.long)],
          },
        })),
      }
    }

    map.on('load', () => {
      // Add the data source for the points
      map.addSource('places', {
        type: 'geojson',
        data: geojson,
      })

      // Add a layer to display the points
      map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      })

      // Create a popup, but don't add it to the map yet
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })

      map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator
        map.getCanvas().style.cursor = 'pointer'

        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        // Populate the popup and set its coordinates
        // based on the feature found
        popup.setLngLat(coordinates).setHTML(description).addTo(map)
      })

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })

      // Add a marker for the main point with its popup always open
      const mainPopup = new mapboxgl.Popup({
        offset: 25,
        focusAfterOpen: false,
        closeOnClick: false,
      })
        .setHTML(
          `
            <p class='title-popup' style={{fontFamily: 'var(--chakra-fonts-heading)'}}>${nameDot}</p>
          `,
        )
        .setLngLat([Number(cords.lat), Number(cords.long)])
        .addTo(map)

      new mapboxgl.Marker({ color: '#b40219' })
        .setLngLat([Number(cords.lat), Number(cords.long)])
        .setPopup(mainPopup) // add popups
        .addTo(map)
        .togglePopup()
    })

    // Clean up on unmount
    return () => map.remove()
  }, [cords, point, nameDot])

  return <Box id="map" width={{ base: '', lg: '35vw' }} height="50vh" />
}

export default Map
