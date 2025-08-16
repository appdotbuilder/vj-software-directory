import { useState, useEffect, useCallback } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { SoftwareCard } from '@/components/SoftwareCard';
import { FilterPanel } from '@/components/FilterPanel';
import { LoadingGrid } from '@/components/LoadingGrid';
import { DemoData, demoSoftwareData } from '@/components/DemoData';
import type { VjSoftware, SearchVjSoftwareInput, OperatingSystem, PricingModel } from '../../server/src/schema';

function App() {
  const [software, setSoftware] = useState<VjSoftware[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOS, setSelectedOS] = useState<OperatingSystem[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<PricingModel[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Extract unique features from all software for filtering
  const availableFeatures = Array.from(
    new Set(software.flatMap((sw: VjSoftware) => sw.key_features))
  ).sort();

  const searchSoftware = useCallback(async () => {
    setIsLoading(true);
    try {
      const searchInput: SearchVjSoftwareInput = {
        query: searchQuery || undefined,
        supported_os: selectedOS.length > 0 ? selectedOS : undefined,
        pricing_model: selectedPricing.length > 0 ? selectedPricing : undefined,
        features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
      };

      const result = await trpc.searchVjSoftware.query(searchInput);
      setSoftware(result);
    } catch (error) {
      console.error('Failed to search software:', error);
      // Fallback to getting all software
      try {
        const allSoftware = await trpc.getAllVjSoftware.query();
        setSoftware(allSoftware);
      } catch (fallbackError) {
        console.error('Failed to load software:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedOS, selectedPricing, selectedFeatures]);

  // Load initial data
  useEffect(() => {
    searchSoftware();
  }, [searchSoftware]);

  const handleOSChange = (os: OperatingSystem, checked: boolean) => {
    if (checked) {
      setSelectedOS((prev: OperatingSystem[]) => [...prev, os]);
    } else {
      setSelectedOS((prev: OperatingSystem[]) => prev.filter((item: OperatingSystem) => item !== os));
    }
  };

  const handlePricingChange = (pricing: PricingModel, checked: boolean) => {
    if (checked) {
      setSelectedPricing((prev: PricingModel[]) => [...prev, pricing]);
    } else {
      setSelectedPricing((prev: PricingModel[]) => prev.filter((item: PricingModel) => item !== pricing));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures((prev: string[]) => [...prev, feature]);
    } else {
      setSelectedFeatures((prev: string[]) => prev.filter((item: string) => item !== feature));
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedOS([]);
    setSelectedPricing([]);
    setSelectedFeatures([]);
  };

  const loadDemoData = () => {
    setSoftware(demoSoftwareData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VJ Software Directory
            </h1>
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect visual jockeying software for your creative projects. 
            Search and filter by features, pricing, and platform compatibility to find your ideal VJ toolkit.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-10">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Search VJ software by name or description..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-4 text-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-100 rounded-xl bg-white/50 placeholder:text-gray-400"
            />
          </div>

          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFiltersOpen}
            onToggle={setIsFiltersOpen}
            selectedOS={selectedOS}
            selectedPricing={selectedPricing}
            selectedFeatures={selectedFeatures}
            availableFeatures={availableFeatures}
            onOSChange={handleOSChange}
            onPricingChange={handlePricingChange}
            onFeatureChange={handleFeatureChange}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                <>
                  <span className="text-purple-600">{software.length}</span> Software Found
                </>
              )}
            </h2>
          </div>
        </div>

        {/* Software Grid */}
        {isLoading ? (
          <LoadingGrid />
        ) : software.length === 0 ? (
          <div className="space-y-6">
            <DemoData onLoadDemo={loadDemoData} />
            <Card className="text-center py-20 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-gray-300">
              <CardContent>
                <div className="text-8xl mb-6">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No VJ Software Found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                  We couldn't find any VJ software matching your criteria. Try adjusting your search or clearing the filters to explore more options.
                </p>
                <Button 
                  onClick={clearFilters} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {software.map((sw: VjSoftware) => (
              <SoftwareCard key={sw.id} software={sw} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center py-8 border-t border-gray-200/50">
          <p className="text-gray-500 mb-2">
            ✨ VJ Software Directory - Empowering Visual Artists Worldwide
          </p>
          <p className="text-sm text-gray-400">
            Discover, compare, and choose the perfect VJ software for your creative vision
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;