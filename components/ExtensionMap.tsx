'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { Acampe } from '@/lib/acampes'

// Fix Leaflet default marker icon issue with bundlers
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Santa Fe province approximate center and bounds
const SANTA_FE_CENTER: [number, number] = [-30.7, -60.5]
const SANTA_FE_ZOOM = 7

export default function ExtensionMap({ acampes }: { acampes: Acampe[] }) {
  useEffect(() => {
    // Ensure Leaflet CSS is loaded
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl overflow-hidden shadow-lg border border-meulen-beige">
        <MapContainer
          center={SANTA_FE_CENTER}
          zoom={SANTA_FE_ZOOM}
          scrollWheelZoom={false}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {acampes.map((acampe) => (
            <Marker
              key={acampe.slug}
              position={[acampe.lat, acampe.lng]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="max-w-[250px]">
                  <h4 className="font-bold text-sm mb-1">{acampe.title}</h4>
                  {acampe.description && (
                    <p className="text-xs text-gray-600 mb-2">{acampe.description}</p>
                  )}
                  {acampe.photos && acampe.photos.length > 0 && acampe.photos[0] && (
                    <img
                      src={acampe.photos[0]}
                      alt={acampe.title}
                      className="w-full rounded"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {acampes.length === 0 && (
        <p className="text-center text-meulen-dark-brown/60 mt-4 text-sm">
          Las localidades visitadas aparecerán aquí una vez que se agreguen desde el panel de administración.
        </p>
      )}
    </div>
  )
}
