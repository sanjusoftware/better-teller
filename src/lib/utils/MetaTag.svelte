<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags';
  
    export let path: string = '';
    export let description: string = '';
    export let title: string = '';
    export let subtitle: string = '';
  
    let imgsrc: string = `https://dskbank.bg?title=${subtitle}`;
  
    let og_url: string = `https://dskbank.bg/${path}`;
  </script>
  
  <MetaTags
  {title}
  {description}
  openGraph={{
    type: 'website',
    url: `${og_url}`,
    title: `${title}`,
    description: `${description}`,
    images: [
      {
        url: imgsrc,
        width: 1200,
        height: 630,
        alt: `${title}`
      }
    ],
    siteName: 'DSK - Better Teller'
  }}
  />  