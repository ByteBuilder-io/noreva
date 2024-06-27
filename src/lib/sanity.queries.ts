import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

import { getClient } from './sanity.client'

export const settingsQuery = groq`
*[_type == "settings"]{
  footer{
    ...
  },
  navbar{
    logo,
    seo,
    links[]{
      title,
      "slug": singleLink.url->slug.current,
      image
    },
    banner
  },
  whats{
    ...
  }
}
`

export const homeQuery = groq`
*[_type == "home"]{
  title,
  "slug": slug.current,
  componentes[]->{
    _type,
   ...
  }
}
`

export const fetchPageSlug = async (refId) => {
  const client = getClient(undefined)
  const query = `*[_id == "${refId}"]{slug}`
  const result = await client.fetch(query)
  return result[0]?.slug?.current
}
