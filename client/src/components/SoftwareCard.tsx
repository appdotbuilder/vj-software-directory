import { Github, Globe, Youtube, Twitter, Instagram, Facebook, Monitor, Apple, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { VjSoftware, OperatingSystem, PricingModel } from '../../../server/src/schema';

interface SoftwareCardProps {
  software: VjSoftware;
}

export function SoftwareCard({ software }: SoftwareCardProps) {
  const getOSIcon = (os: OperatingSystem) => {
    switch (os) {
      case 'Windows':
        return <Monitor className="w-3 h-3" />;
      case 'macOS':
        return <Apple className="w-3 h-3" />;
      case 'Linux':
        return <Zap className="w-3 h-3" />;
    }
  };

  const getPricingColor = (pricing: PricingModel) => {
    switch (pricing) {
      case 'Free':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
      case 'Paid':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100';
      case 'Subscription':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100';
      case 'Freemium':
        return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100';
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return 'hover:text-red-600';
      case 'twitter':
        return 'hover:text-blue-400';
      case 'instagram':
        return 'hover:text-pink-600';
      case 'facebook':
        return 'hover:text-blue-600';
      default:
        return 'hover:text-gray-600';
    }
  };

  return (
    <Card className="group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          {software.icon_url ? (
            <img 
              src={software.icon_url} 
              alt={`${software.name} icon`}
              className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100 group-hover:border-purple-200 transition-colors"
            />
          ) : (
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {software.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
              {software.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={`${getPricingColor(software.pricing_model)} font-medium`}>
                {software.pricing_model}
              </Badge>
              {software.price_details && (
                <span className="text-xs text-gray-600 font-medium bg-gray-50 px-2 py-1 rounded-full">
                  {software.price_details}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <CardDescription className="text-gray-600 leading-relaxed text-sm">
          {software.description}
        </CardDescription>

        {/* Supported OS */}
        <div>
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
            Supported Platforms
          </Label>
          <div className="flex gap-2 flex-wrap">
            {software.supported_os.map((os: OperatingSystem) => (
              <Badge 
                key={os} 
                variant="outline" 
                className="text-xs font-medium bg-gray-50 hover:bg-gray-100 border-gray-200"
              >
                {getOSIcon(os)}
                <span className="ml-1.5">{os}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
            Key Features
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {software.key_features.slice(0, 5).map((feature: string) => (
              <Badge 
                key={feature} 
                className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200 hover:from-purple-200 hover:to-blue-200 transition-all"
              >
                {feature}
              </Badge>
            ))}
            {software.key_features.length > 5 && (
              <Badge 
                className="text-xs bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                title={software.key_features.slice(5).join(', ')}
              >
                +{software.key_features.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-b-lg pt-4 pb-4">
        {/* Links */}
        <div className="flex gap-1">
          {software.official_website && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white hover:shadow-md transition-all duration-200 hover:text-purple-600"
              asChild
            >
              <a 
                href={software.official_website} 
                target="_blank" 
                rel="noopener noreferrer"
                title="Official Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </Button>
          )}
          {software.github_url && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-white hover:shadow-md transition-all duration-200 hover:text-gray-900"
              asChild
            >
              <a 
                href={software.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
          )}
          {Object.entries(software.social_links).map(([platform, url]) => 
            url ? (
              <Button
                key={platform}
                variant="ghost"
                size="sm"
                className={`p-2 hover:bg-white hover:shadow-md transition-all duration-200 ${getSocialColor(platform)}`}
                asChild
              >
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile`}
                >
                  {getSocialIcon(platform)}
                </a>
              </Button>
            ) : null
          )}
        </div>

        <div className="text-xs text-gray-400 font-medium">
          Added {software.created_at.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </CardFooter>
    </Card>
  );
}