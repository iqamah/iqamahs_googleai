import React from 'react';
import { MapIcon, ListIcon } from './Icons';

interface ViewToggleProps {
  view: 'map' | 'list';
  setView: (view: 'map' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  const baseClasses = "flex-1 flex items-center justify-center p-3 text-sm font-medium transition-colors duration-200";
  const activeClasses = "bg-green-800 text-amber-300";
  const inactiveClasses = "bg-green-900 text-neutral-400 hover:bg-green-800/50";
  
  return (
    <div className="flex w-full bg-green-900">
      <button
        onClick={() => setView('map')}
        className={`${baseClasses} ${view === 'map' ? activeClasses : inactiveClasses}`}
      >
        <MapIcon className="w-5 h-5 mr-2" />
        Map View
      </button>
      <button
        onClick={() => setView('list')}
        className={`${baseClasses} ${view === 'list' ? activeClasses : inactiveClasses}`}
      >
        <ListIcon className="w-5 h-5 mr-2" />
        List View
      </button>
    </div>
  );
};

export default ViewToggle;