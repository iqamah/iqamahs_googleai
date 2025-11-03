import React from 'react';
import type { Masjid } from '../types';
import MasjidCard from './MasjidCard';

interface ListViewProps {
  masjids: Masjid[];
  selectedMasjid: Masjid | null;
  onSelectMasjid: (masjid: Masjid) => void;
  itemRefs: React.MutableRefObject<Map<number, HTMLDivElement>>;
}

const ListView = React.forwardRef<HTMLDivElement, ListViewProps>(({ masjids, selectedMasjid, onSelectMasjid, itemRefs }, ref) => {
  return (
    <div ref={ref} className="bg-green-900">
      <div className="p-2 space-y-2 lg:p-0 lg:space-y-0">
        {masjids.map(masjid => (
          <MasjidCard
            key={masjid.id}
            masjid={masjid}
            isSelected={selectedMasjid?.id === masjid.id}
            onClick={() => onSelectMasjid(masjid)}
            ref={(el) => {
              if (el) {
                itemRefs.current.set(masjid.id, el);
              } else {
                itemRefs.current.delete(masjid.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default ListView;
