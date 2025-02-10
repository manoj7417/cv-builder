'use client'
import { FB_PIXEL_ID } from '../utils/fbPixel'

export default function FacebookPixelNoscript() {
  return (
    <noscript>
      <img 
        height="1" 
        width="1" 
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
        onError={(e) => {
          e.target.style.display = 'none';
          console.debug('Facebook Pixel image blocked by client');
        }}
      />
    </noscript>
  )
} 