import { StaticImageData } from 'next/image'
import path from 'path'
import fs from 'fs'

export function nextJsImageToBase64(img: StaticImageData): string | null {
  const src = img.src.replace(/^\/\_next/, '.next')
  try {
    let imgExt = path.extname(src).slice(1)
    if (imgExt === 'jpg') {
      imgExt = 'jpeg'
    } else if (imgExt === 'svg') {
      imgExt += '+xml'
    }
    const file = fs.readFileSync(path.join(process.cwd(), src), 'base64')
    return `data:image/${imgExt};base64,${file}`
  } catch (error) {
    console.error('Error converting image to Base64:', error)
    return null
  }
}
