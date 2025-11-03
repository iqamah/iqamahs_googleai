import React, { useEffect, useRef } from 'react';
import type { Masjid } from '../types';
import { PlusIcon } from './Icons';

// FIX: Add minimal type definitions for Leaflet to resolve 'Cannot find namespace L' error.
// For a real app, you should install @types/leaflet.
declare namespace L {
  interface Point {
    x: number;
    y: number;
  }

  interface LatLngBounds {}

  interface Map {
    remove(): void;
    setView(center: [number, number], zoom: number): L.Map;
    on(event: string, callback: (e: any) => void): void;
    flyTo(latlng: any, zoom?: number): void;
    fitBounds(bounds: LatLngBounds, options?: any): L.Map;
    invalidateSize(): void;
  }

  interface Marker {
    addTo(map: L.Map): L.Marker;
    on(event: string, callback: (e: any) => void): void;
    setIcon(icon: any): void;
    setZIndexOffset(offset: number): void;
    getLatLng(): any;
    remove(): void;
  }

  function map(element: HTMLElement, options: any): L.Map;
  function tileLayer(url: string, options: any): { addTo: (map: L.Map) => void };
  namespace control {
    function zoom(options: any): { addTo: (map: L.Map) => void };
  }
  function marker(latlng: [number, number]): L.Marker;
  function divIcon(options: any): any;
  function point(x: number, y: number): Point;
  function latLngBounds(latlngs: [number, number][]): LatLngBounds;
  namespace DomEvent {
    function stopPropagation(e: any): void;
  }
}

interface MapViewProps {
  masjids: Masjid[];
  selectedMasjid: Masjid | null;
  onSelectMasjid: (masjid: Masjid | null) => void;
}

const createMasjidIcon = (isSelected: boolean) => {
  const size = isSelected ? 44 : 36;
  const anchor = isSelected ? 22 : 18;
  const pinColor = isSelected ? '#f59e0b' : '#065f46'; // amber-500 and green-800
  const dotColor = isSelected ? '#fcd34d' : '#10b981'; // amber-300 and emerald-500

  const iconHtml = `
    <div class="relative flex items-center justify-center cursor-pointer drop-shadow-lg">
      <svg
        viewBox="0 0 24 24"
        style="width: ${size}px; height: ${size}px; transition: all 0.2s ease-in-out; filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.2));"
      >
        <path
          fill="${pinColor}"
          stroke="#fff"
          stroke-width="0.5"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        />
        <circle cx="12" cy="9" r="2.5" fill="${dotColor}" />
      </svg>
      ${isSelected ? '<div class="absolute top-0 left-0 inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400"></div>' : ''}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: 'bg-transparent border-none',
    iconSize: [size, size],
    iconAnchor: [anchor, size],
  });
};

const MapView: React.FC<MapViewProps> = ({ masjids, selectedMasjid, onSelectMasjid }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false
      });
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;

      map.on('click', () => {
        onSelectMasjid(null);
      });
    }

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const displayedMarkerIds = new Set(masjids.map(m => m.id));

    // Remove markers that are no longer in the filtered list
    markersRef.current.forEach((marker, id) => {
      if (!displayedMarkerIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update markers from the filtered list
    masjids.forEach(masjid => {
      let marker = markersRef.current.get(masjid.id);
      
      if (!marker) {
        marker = L.marker([masjid.location.lat, masjid.location.lon]).addTo(map);
        marker.on('click', (e: any) => {
          L.DomEvent.stopPropagation(e);
          onSelectMasjid(masjid);
        });
        markersRef.current.set(masjid.id, marker);
      }
      
      const isSelected = selectedMasjid?.id === masjid.id;
      marker.setIcon(createMasjidIcon(isSelected));
      marker.setZIndexOffset(isSelected ? 1000 : 0);
    });

  }, [masjids, selectedMasjid, onSelectMasjid]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMasjid) return;

    const marker = markersRef.current.get(selectedMasjid.id);
    if (marker) {
      map.flyTo(marker.getLatLng(), 14);
    }
  }, [selectedMasjid]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || masjids.length === 0) return;
    
    // Don't auto-fit if a specific masjid is selected, let the other effect handle it.
    if (selectedMasjid) return;

    // Use a small timeout to ensure the map container has been sized by the browser,
    // especially in responsive layouts. This prevents fitBounds from failing on initial load.
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (masjids.length > 1) {
        const bounds = L.latLngBounds(masjids.map(m => [m.location.lat, m.location.lon]));
        map.fitBounds(bounds, { padding: L.point(50, 50) });
      } else if (masjids.length === 1) {
        map.flyTo([masjids[0].location.lat, masjids[0].location.lon], 13);
      }
    }, 100);

    return () => clearTimeout(timer);

  }, [masjids, selectedMasjid]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <button
        onClick={() => alert('Add New/Missing Praying Space button selected')}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors duration-200 rounded-md shadow-lg bg-green-800/80 text-amber-300 hover:bg-green-700/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-950 focus:ring-amber-400"
        aria-label="Add New or Missing Praying Space"
      >
        <PlusIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Add New/Missing Praying Space</span>
      </button>
    </div>
  );
};

export default MapView;