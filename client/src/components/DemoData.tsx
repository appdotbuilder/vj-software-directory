import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface DemoDataProps {
  onLoadDemo: () => void;
}

export function DemoData({ onLoadDemo }: DemoDataProps) {
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <AlertTriangle className="w-5 h-5" />
          Demo Mode
        </CardTitle>
        <CardDescription className="text-amber-700">
          The backend is currently using placeholder data. Click below to load sample VJ software entries for demonstration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onLoadDemo}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          Load Demo Data
        </Button>
      </CardContent>
    </Card>
  );
}

import type { VjSoftware, OperatingSystem, PricingModel } from '../../../server/src/schema';

// Demo data for development purposes
export const demoSoftwareData: VjSoftware[] = [
  {
    id: 1,
    name: "TouchDesigner",
    icon_url: null,
    description: "Node-based visual programming language for real-time interactive multimedia content",
    supported_os: ["Windows", "macOS"] as OperatingSystem[],
    key_features: ["Real-time 3D", "Visual Programming", "MIDI Control", "DMX Integration", "Python Scripting"],
    pricing_model: "Paid" as PricingModel,
    price_details: "$600 Commercial License",
    official_website: "https://derivative.ca",
    github_url: null,
    social_links: {
      youtube: "https://youtube.com/@derivative",
      twitter: "https://twitter.com/derivative",
      instagram: null,
      facebook: null
    },
    created_at: new Date("2023-01-15"),
    updated_at: new Date("2023-12-01")
  },
  {
    id: 2,
    name: "Resolume Arena",
    icon_url: null,
    description: "Professional VJ software for live performances and installations with advanced mapping features",
    supported_os: ["Windows", "macOS"] as OperatingSystem[],
    key_features: ["Video Mapping", "Audio Reactive", "Live Input", "MIDI/OSC Control", "Advanced Effects"],
    pricing_model: "Paid" as PricingModel,
    price_details: "€399 one-time",
    official_website: "https://resolume.com",
    github_url: null,
    social_links: {
      youtube: "https://youtube.com/@resolume",
      twitter: null,
      instagram: "https://instagram.com/resolume",
      facebook: "https://facebook.com/resolume"
    },
    created_at: new Date("2023-02-10"),
    updated_at: new Date("2023-11-15")
  },
  {
    id: 3,
    name: "MadMapper",
    icon_url: null,
    description: "Video mapping software with intuitive interface for projection mapping projects",
    supported_os: ["Windows", "macOS"] as OperatingSystem[],
    key_features: ["3D Mapping", "LED Control", "Material Editor", "Spout/Syphon", "DMX Integration"],
    pricing_model: "Paid" as PricingModel,
    price_details: "€349 Standard",
    official_website: "https://madmapper.com",
    github_url: null,
    social_links: {
      youtube: "https://youtube.com/@madmapper",
      twitter: "https://twitter.com/madmapper",
      instagram: null,
      facebook: null
    },
    created_at: new Date("2023-03-05"),
    updated_at: new Date("2023-10-20")
  },
  {
    id: 4,
    name: "Processing",
    icon_url: null,
    description: "Free programming language and environment for creating visual arts and interactive media",
    supported_os: ["Windows", "macOS", "Linux"] as OperatingSystem[],
    key_features: ["Creative Coding", "Open Source", "Java-based", "2D/3D Graphics", "Large Community"],
    pricing_model: "Free" as PricingModel,
    price_details: null,
    official_website: "https://processing.org",
    github_url: "https://github.com/processing/processing",
    social_links: {
      youtube: null,
      twitter: "https://twitter.com/processingOrg",
      instagram: null,
      facebook: null
    },
    created_at: new Date("2023-01-01"),
    updated_at: new Date("2023-12-10")
  },
  {
    id: 5,
    name: "VDMX5",
    icon_url: null,
    description: "Modular VJ software with a focus on real-time video synthesis and performance",
    supported_os: ["macOS"] as OperatingSystem[],
    key_features: ["Modular Interface", "ISF Shaders", "Audio Analysis", "MIDI Control", "Quartz Composer"],
    pricing_model: "Paid" as PricingModel,
    price_details: "$349",
    official_website: "https://vidvox.net",
    github_url: null,
    social_links: {
      youtube: "https://youtube.com/@vidvox",
      twitter: "https://twitter.com/vidvox",
      instagram: null,
      facebook: null
    },
    created_at: new Date("2023-02-20"),
    updated_at: new Date("2023-11-30")
  },
  {
    id: 6,
    name: "Kodelife",
    icon_url: null,
    description: "Real-time GPU shader editor for creating stunning visual effects and live coding performances",
    supported_os: ["Windows", "macOS", "Linux"] as OperatingSystem[],
    key_features: ["Live Coding", "GLSL Shaders", "Audio Reactive", "VR Support", "OSC Control"],
    pricing_model: "Freemium" as PricingModel,
    price_details: "Free with Pro upgrade $15/month",
    official_website: "https://hexler.net/kodelife",
    github_url: null,
    social_links: {
      youtube: null,
      twitter: "https://twitter.com/hexler",
      instagram: null,
      facebook: null
    },
    created_at: new Date("2023-04-12"),
    updated_at: new Date("2023-12-05")
  }
];