import { StaticImageData } from "next/image"

export interface IAsset {
  mobile: string | StaticImageData
  tablet: string | StaticImageData
  desktop: string | StaticImageData
}
