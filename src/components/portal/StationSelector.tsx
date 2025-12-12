import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useStation, stations, StationType } from '@/contexts/StationContext';

const stationTextColors: Record<StationType, string> = {
  'radio88fm': 'text-station-88fm',
  'radio89maravilha': 'text-station-maravilha',
  'gtfnews': 'text-station-gtfnews',
};

export function StationSelector() {
  const { currentStation, setStation } = useStation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <span className={cn('text-sm font-bold', stationTextColors[currentStation.id])}>
            {currentStation.name}
          </span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="bg-card border-border z-50">
        {stations.map((station) => (
          <DropdownMenuItem
            key={station.id}
            onClick={() => setStation(station.id)}
            className={cn(
              'cursor-pointer',
              currentStation.id === station.id && 'bg-muted'
            )}
          >
            <span className={cn('font-semibold', stationTextColors[station.id])}>
              {station.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
