import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="p-6 space-y-4 bg-white shadow-lg">
          {/* Header with icon and title */}
          <div className="flex items-center space-x-4">
            <Skeleton className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-200 to-blue-200 shimmer" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4 shimmer" />
              <Skeleton className="h-4 w-1/2 shimmer" />
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full shimmer" />
            <Skeleton className="h-4 w-full shimmer" />
            <Skeleton className="h-4 w-2/3 shimmer" />
          </div>
          
          {/* OS badges */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full shimmer" />
            <Skeleton className="h-6 w-20 rounded-full shimmer" />
            <Skeleton className="h-6 w-14 rounded-full shimmer" />
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full shimmer" />
            <Skeleton className="h-6 w-24 rounded-full shimmer" />
            <Skeleton className="h-6 w-16 rounded-full shimmer" />
            <Skeleton className="h-6 w-18 rounded-full shimmer" />
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex gap-1">
              <Skeleton className="h-8 w-8 rounded shimmer" />
              <Skeleton className="h-8 w-8 rounded shimmer" />
              <Skeleton className="h-8 w-8 rounded shimmer" />
            </div>
            <Skeleton className="h-4 w-20 shimmer" />
          </div>
        </Card>
      ))}
    </div>
  );
}