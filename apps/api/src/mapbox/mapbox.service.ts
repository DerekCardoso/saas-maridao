import { Injectable, ServiceUnavailableException } from "@nestjs/common"

@Injectable()
export class MapboxService {
  async geocode(address: string) {
    const token = process.env.MAPBOX_ACCESS_TOKEN
    if (!token) throw new ServiceUnavailableException("Mapbox nao configurado.")

    const url = new URL(`https://api.mapbox.com/search/geocode/v6/forward`)
    url.searchParams.set("q", address)
    url.searchParams.set("country", "br")
    url.searchParams.set("limit", "1")
    url.searchParams.set("access_token", token)

    const response = await fetch(url)
    if (!response.ok) throw new ServiceUnavailableException("Falha ao localizar endereco.")

    const payload = (await response.json()) as {
      features?: Array<{ geometry: { coordinates: [number, number] } }>
    }
    const coordinates = payload.features?.[0]?.geometry.coordinates
    if (!coordinates) throw new ServiceUnavailableException("Endereco nao localizado.")

    return { longitude: coordinates[0], latitude: coordinates[1] }
  }
}
