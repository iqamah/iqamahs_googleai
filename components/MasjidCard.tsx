import React from 'react';
import type { Masjid } from '../types';
import { ClockIcon, MosqueIcon, MapIcon as LocationMarkerIcon, DirectionsIcon, ReportIcon, CloseIcon } from './Icons';

interface MasjidCardProps {
  masjid: Masjid;
  isSelected: boolean;
  onClick: () => void;
  isPopup?: boolean;
  onClose?: () => void;
}

const MasjidCard = React.forwardRef<HTMLDivElement, MasjidCardProps>(({ masjid, isSelected, onClick, isPopup = false, onClose }, ref) => {
  const cardBaseClasses = "p-4 transition-all duration-300 rounded-lg";
  const cardStateClasses = isSelected
    ? 'bg-green-800 ring-2 ring-amber-400'
    : 'bg-green-900 hover:bg-green-800/60';
  const popupClasses = isPopup ? 'shadow-2xl relative' : 'border-b border-green-800/50 rounded-none';

  const prayerEntries = Object.entries(masjid.prayerTimes);
  const firstRowPrayers = prayerEntries.slice(0, 3);
  const secondRowPrayers = prayerEntries.slice(3);

  return (
    <div
      ref={ref}
      className={`${cardBaseClasses} ${cardStateClasses} ${!isPopup ? popupClasses : ''} ${isPopup ? popupClasses : ''}`}
      onClick={!isPopup ? onClick : undefined}
    >
      {isPopup && onClose && (
        <button 
          onClick={onClose} 
          className="absolute z-10 p-1 transition-colors duration-200 rounded-full top-2 right-2 text-neutral-400 hover:bg-green-700/50 hover:text-white"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      )}
      <div className={!isPopup ? 'cursor-pointer' : ''} onClick={onClick}>
        <h3 className="mb-3 text-xl font-bold text-amber-300">{masjid.name}</h3>

        <div className="flex items-start mb-4 text-sm text-neutral-300">
          <LocationMarkerIcon className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 -ml-1 text-neutral-400" />
          <span>{masjid.address}</span>
        </div>
        
        <div className="mb-4">
          <h4 className="flex items-center mb-2 text-sm font-semibold tracking-wider uppercase text-neutral-400">
            <ClockIcon className="w-4 h-4 mr-2" />
            Daily Prayers (Iqamah)
          </h4>
          
          {/* View for sm and lg screens (5 columns) */}
          <div className="hidden gap-2 text-sm sm:grid sm:grid-cols-5 md:hidden lg:grid">
            {prayerEntries.map(([name, time]) => (
              <div key={name} className="p-2 text-center rounded-md bg-green-900/70 ring-1 ring-green-700/60">
                <div className="font-semibold text-neutral-300">{name}</div>
                <div className="text-amber-400">{time}</div>
              </div>
            ))}
          </div>

          {/* View for mobile and md screens (3 columns with centered second row) */}
          <div className="sm:hidden md:block lg:hidden">
            <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-2">
                    {firstRowPrayers.map(([name, time]) => (
                        <div key={name} className="p-2 text-center rounded-md bg-green-900/70 ring-1 ring-green-700/60">
                            <div className="font-semibold text-neutral-300">{name}</div>
                            <div className="text-amber-400">{time}</div>
                        </div>
                    ))}
                </div>
                {secondRowPrayers.length > 0 && (
                    <div className="flex justify-center gap-2">
                        {secondRowPrayers.map(([name, time]) => (
                            <div key={name} className="w-1/3 p-2 text-center rounded-md bg-green-900/70 ring-1 ring-green-700/60">
                                <div className="font-semibold text-neutral-300">{name}</div>
                                <div className="text-amber-400">{time}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        </div>

        <div>
          <h4 className="flex items-center mb-2 text-sm font-semibold tracking-wider uppercase text-neutral-400">
            <MosqueIcon className="w-4 h-4 mr-2" />
            Jumuah
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {masjid.jumuahTimes.map((time, index) => (
              <div key={index} className="px-3 py-1 text-sm font-medium bg-amber-500/20 text-amber-300 rounded-full">
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 pt-4 mt-4 border-t border-green-700/50">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(masjid.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold tracking-wide transition-colors duration-200 rounded-full ring-1 ring-inset ring-amber-500/30 bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <DirectionsIcon className="w-4 h-4 mr-1.5" />
          Get Directions
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert('Report Updates button selected');
          }}
          className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold tracking-wide transition-colors duration-200 rounded-full ring-1 ring-inset ring-red-500/30 bg-red-500/20 text-red-300 hover:bg-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <ReportIcon className="w-4 h-4 mr-1.5" />
          Report Updates
        </button>
      </div>
    </div>
  );
});


export default MasjidCard;