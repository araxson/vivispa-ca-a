import React from 'react';
import { Badge, Button } from '@/components/ui';
import { X, MapPin, Filter, Search, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterItem {
  type: string;
  label: string;
  value: string;
  icon?: 'location' | 'category' | 'search' | 'tag';
}

interface FilterBadgesProps {
  activeFilters: FilterItem[];
  onClearFilter: (filterType: string) => void;
  onClearAll: () => void;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  variant?: 'default' | 'compact';
}

const iconMap = {
  location: MapPin,
  category: Filter,
  search: Search,
  tag: Tag,
};

export function FilterBadges({
  activeFilters,
  onClearFilter,
  onClearAll,
  className = '',
  showLabel = true,
  size = 'sm',
  variant = 'default'
}: FilterBadgesProps) {
  if (activeFilters.length === 0) return null;

  const badgeHeight = size === 'sm' ? 'h-7' : 'h-8';
  const badgePadding = size === 'sm' ? 'px-3 py-1' : 'px-4 py-1.5';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <div className={cn("flex flex-wrap items-center gap-2 pt-3 border-t border-border", className)}>
      {showLabel && variant === 'default' && (
        <span className={cn("text-muted-foreground font-medium", textSize)}>
          Active filters:
        </span>
      )}
      
      {/* Active Filter Badges */}
      {activeFilters.map((filter) => {
        const IconComponent = filter.icon ? iconMap[filter.icon] : null;
        
        return (
          <Badge 
            key={`${filter.type}-${filter.value}`}
            variant="secondary" 
            className={cn(
              badgeHeight,
              badgePadding,
              textSize,
              "font-medium bg-primary/10 text-primary border-primary/20",
              "hover:bg-primary/15 transition-colors cursor-pointer",
              "flex items-center gap-1.5"
            )}
            onClick={() => onClearFilter(filter.type)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClearFilter(filter.type);
              }
            }}
            aria-label={`Remove filter: ${filter.label}`}
          >
            {IconComponent && <IconComponent className={iconSize} />}
            <span>{filter.label}</span>
            <X className={cn(iconSize, "hover:text-destructive transition-colors")} />
          </Badge>
        );
      })}

      {/* Clear All Button */}
      <Button 
        variant="outline" 
        size="sm"
        onClick={onClearAll} 
        className={cn(
          badgeHeight,
          badgePadding,
          textSize,
          "font-medium",
          variant === 'compact' ? '' : 'ml-2',
          "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20",
          "transition-colors flex items-center gap-1.5"
        )}
        aria-label={`Clear all ${activeFilters.length} active filters`}
        type="button"
      >
        <X className={cn(iconSize)} aria-hidden="true" />
        {variant === 'compact' ? 'Clear' : 'Clear All'}
      </Button>
    </div>
  );
} 