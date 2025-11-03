import React, { useState, useRef, useEffect } from 'react';
import type { Masjid } from './types';
import { MASJIDS } from './constants';
import ListView from './components/ListView';
import MapView from './components/MapView';
import ViewToggle from './components/ViewToggle';
import MasjidCard from './components/MasjidCard';
import { SearchIcon } from './components/Icons';

interface SearchBarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, onSearchInputChange, onSearch, onKeyDown }) => (
  <div className="flex items-center gap-2">
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search by name or address..."
        value={searchInput}
        onChange={(e) => onSearchInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full py-2 pl-10 pr-4 text-white rounded-md bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-neutral-400"
      />
      <SearchIcon className="absolute w-5 h-5 top-2.5 left-3 text-neutral-400 pointer-events-none" />
    </div>
    <button
      onClick={onSearch}
      className="px-4 py-2 font-semibold text-green-950 transition-colors duration-200 rounded-md bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-900 focus:ring-amber-400"
      aria-label="Search"
    >
      Search
    </button>
  </div>
);

const MasjidPopup = ({ masjid, onClose }: { masjid: Masjid, onClose: () => void }) => (
  <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm" onClick={e => e.stopPropagation()}>
          <MasjidCard
            masjid={masjid}
            isSelected={true}
            onClick={() => {}}
            isPopup={true}
            onClose={onClose}
          />
      </div>
  </div>
);

const App: React.FC = () => {
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const filteredMasjids = MASJIDS.filter(masjid => {
    const query = searchQuery.toLowerCase();
    if (!query) {
      return true; // Show all if search query is empty
    }
    return (
      masjid.name.toLowerCase().includes(query) ||
      masjid.address.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (selectedMasjid && listRef.current) {
      const itemElement = itemRefs.current.get(selectedMasjid.id);
      if (itemElement) {
        // The behavior for scrolling is handled differently for mobile and desktop
        // For mobile, the view is 'list'
        if (view === 'list' || window.innerWidth >= 768 /* md breakpoint */) {
          const listContainer = listRef.current.parentElement;
          if (listContainer) {
            listContainer.scrollTo({
              top: itemElement.offsetTop - listContainer.offsetTop,
              behavior: 'smooth',
            });
          }
        }
      }
    }
  }, [selectedMasjid, view]);
  
  const handleSelectMasjid = (masjid: Masjid | null) => {
    setSelectedMasjid(masjid);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setSelectedMasjid(null); // Deselect masjid on new search
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans text-neutral-200 bg-green-950">
      <header className="flex items-center justify-center p-4 border-b shadow-lg bg-green-900 border-green-800">
        <h1 className="text-2xl font-bold tracking-wider text-amber-300">iqamahs</h1>
      </header>

      <div className="flex-1 md:grid md:grid-cols-3 xl:grid-cols-4 md:overflow-hidden">
        {/* Mobile View */}
        <main className="flex flex-col flex-1 h-full md:hidden">
          <div className="p-2 bg-green-900/80 backdrop-blur-sm">
            <SearchBar searchInput={searchInput} onSearchInputChange={setSearchInput} onSearch={handleSearch} onKeyDown={handleKeyDown} />
          </div>
          <ViewToggle view={view} setView={setView} />
          <div className="relative flex-1 overflow-hidden">
            {view === 'map' ? (
              <MapView masjids={filteredMasjids} selectedMasjid={selectedMasjid} onSelectMasjid={handleSelectMasjid} />
            ) : (
              <div className="h-full overflow-y-auto" ref={listRef}>
                <ListView
                  masjids={filteredMasjids}
                  selectedMasjid={selectedMasjid}
                  onSelectMasjid={handleSelectMasjid}
                  itemRefs={itemRefs}
                />
              </div>
            )}
            {view === 'map' && selectedMasjid && <MasjidPopup masjid={selectedMasjid} onClose={() => handleSelectMasjid(null)} />}
          </div>
        </main>
        
        {/* Desktop View: List on Left, Map on Right */}
        <aside className="hidden h-full md:flex md:flex-col md:col-span-1 xl:col-span-1 border-r border-green-800 bg-green-900">
          <div className="p-4 border-b border-green-800">
            <SearchBar searchInput={searchInput} onSearchInputChange={setSearchInput} onSearch={handleSearch} onKeyDown={handleKeyDown} />
          </div>
          <div className="flex-1 overflow-y-auto" ref={listRef}>
            <ListView
              masjids={filteredMasjids}
              selectedMasjid={selectedMasjid}
              onSelectMasjid={handleSelectMasjid}
              itemRefs={itemRefs}
            />
          </div>
        </aside>
        <main className="hidden h-full md:flex md:col-span-2 xl:col-span-3 relative">
          <MapView masjids={filteredMasjids} selectedMasjid={selectedMasjid} onSelectMasjid={handleSelectMasjid} />
        </main>
      </div>
    </div>
  );
};

export default App;