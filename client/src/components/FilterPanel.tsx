import { Filter, X, Monitor, Apple, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { OperatingSystem, PricingModel } from '../../../server/src/schema';

interface FilterPanelProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  selectedOS: OperatingSystem[];
  selectedPricing: PricingModel[];
  selectedFeatures: string[];
  availableFeatures: string[];
  onOSChange: (os: OperatingSystem, checked: boolean) => void;
  onPricingChange: (pricing: PricingModel, checked: boolean) => void;
  onFeatureChange: (feature: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  isOpen,
  onToggle,
  selectedOS,
  selectedPricing,
  selectedFeatures,
  availableFeatures,
  onOSChange,
  onPricingChange,
  onFeatureChange,
  onClearFilters
}: FilterPanelProps) {
  const operatingSystems: OperatingSystem[] = ['Windows', 'macOS', 'Linux'];
  const pricingModels: PricingModel[] = ['Free', 'Paid', 'Subscription', 'Freemium'];

  const getOSIcon = (os: OperatingSystem) => {
    switch (os) {
      case 'Windows':
        return <Monitor className="w-4 h-4" />;
      case 'macOS':
        return <Apple className="w-4 h-4" />;
      case 'Linux':
        return <Zap className="w-4 h-4" />;
    }
  };

  const getPricingEmoji = (pricing: PricingModel) => {
    switch (pricing) {
      case 'Free':
        return '🆓';
      case 'Paid':
        return '💰';
      case 'Subscription':
        return '📅';
      case 'Freemium':
        return '🎯';
    }
  };

  const totalActiveFilters = selectedOS.length + selectedPricing.length + selectedFeatures.length;

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 ml-1">
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </CollapsibleTrigger>
        
        {totalActiveFilters > 0 && (
          <Button 
            onClick={onClearFilters} 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <CollapsibleContent className="mt-6">
        <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Operating System Filter */}
            <div>
              <Label className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                💻 Operating System
                {selectedOS.length > 0 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {selectedOS.length}
                  </Badge>
                )}
              </Label>
              <div className="space-y-3">
                {operatingSystems.map((os: OperatingSystem) => (
                  <div key={os} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={`os-${os}`}
                      checked={selectedOS.includes(os)}
                      onCheckedChange={(checked: boolean) => onOSChange(os, checked)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label 
                      htmlFor={`os-${os}`} 
                      className="flex items-center gap-2 cursor-pointer text-gray-700 group-hover:text-purple-700 transition-colors font-medium"
                    >
                      {getOSIcon(os)}
                      {os}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Model Filter */}
            <div>
              <Label className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                💵 Pricing Model
                {selectedPricing.length > 0 && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedPricing.length}
                  </Badge>
                )}
              </Label>
              <div className="space-y-3">
                {pricingModels.map((pricing: PricingModel) => (
                  <div key={pricing} className="flex items-center space-x-3 group">
                    <Checkbox
                      id={`pricing-${pricing}`}
                      checked={selectedPricing.includes(pricing)}
                      onCheckedChange={(checked: boolean) => onPricingChange(pricing, checked)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label 
                      htmlFor={`pricing-${pricing}`} 
                      className="flex items-center gap-2 cursor-pointer text-gray-700 group-hover:text-purple-700 transition-colors font-medium"
                    >
                      <span>{getPricingEmoji(pricing)}</span>
                      {pricing}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div>
              <Label className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                ⚡ Key Features
                {selectedFeatures.length > 0 && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {selectedFeatures.length}
                  </Badge>
                )}
              </Label>
              <div className="space-y-3 max-h-48 overflow-y-auto features-scroll pr-2">
                {availableFeatures.length === 0 ? (
                  <div className="text-sm text-gray-500 italic">
                    No features available yet
                  </div>
                ) : (
                  availableFeatures.map((feature: string) => (
                    <div key={feature} className="flex items-center space-x-3 group">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={(checked: boolean) => onFeatureChange(feature, checked)}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label 
                        htmlFor={`feature-${feature}`} 
                        className="cursor-pointer text-sm text-gray-700 group-hover:text-purple-700 transition-colors font-medium leading-tight"
                      >
                        {feature}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {totalActiveFilters > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Label className="text-sm font-bold text-gray-800 mb-3 block">
                🔍 Active Filters ({totalActiveFilters})
              </Label>
              <div className="flex flex-wrap gap-2">
                {selectedOS.map((os: OperatingSystem) => (
                  <Badge 
                    key={`active-os-${os}`} 
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                    onClick={() => onOSChange(os, false)}
                  >
                    {getOSIcon(os)}
                    <span className="ml-1">{os}</span>
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedPricing.map((pricing: PricingModel) => (
                  <Badge 
                    key={`active-pricing-${pricing}`} 
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                    onClick={() => onPricingChange(pricing, false)}
                  >
                    {getPricingEmoji(pricing)} {pricing}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedFeatures.slice(0, 5).map((feature: string) => (
                  <Badge 
                    key={`active-feature-${feature}`} 
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
                    onClick={() => onFeatureChange(feature, false)}
                  >
                    {feature}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedFeatures.length > 5 && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                    +{selectedFeatures.length - 5} more features
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}