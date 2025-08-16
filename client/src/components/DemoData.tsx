import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import type { VjSoftware, OperatingSystem, PricingModel } from '../../../server/src/schema';

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

// Demo data for development purposes
export const demoSoftwareData: VjSoftware[] = [
  {
    id: 1,
    name: 'TouchDesigner',
    icon_url: 'https://vjun.io/img/software_icons/touchdesigner.png',
    description: 'Node-based visual programming language for real-time interactive multimedia content.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['Real-time 3D', 'Visual Programming', 'MIDI Control', 'DMX Integration', 'Python Scripting', 'NDI', 'Spout', 'Syphon', 'OSC'],
    pricing_model: 'Freemium' as PricingModel,
    price_details: 'Free non-commercial, $600 commercial license',
    official_website: 'https://derivative.ca',
    github_url: null,
    social_links: {
      youtube: 'https://youtube.com/@derivative',
      twitter: 'https://twitter.com/derivative',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-01-15'),
    updated_at: new Date('2023-12-01')
  },
  {
    id: 2,
    name: 'Resolume Arena',
    icon_url: 'https://vjun.io/img/software_icons/resolume.png',
    description: 'Professional VJ software for live performances and installations with advanced mapping features.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['Video Mapping', 'Audio Reactive', 'Live Input', 'MIDI', 'OSC', 'Advanced Effects', 'NDI', 'Spout', 'Syphon'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '€799 Arena',
    official_website: 'https://resolume.com',
    github_url: null,
    social_links: {
      youtube: 'https://youtube.com/@resolume',
      twitter: 'https://twitter.com/resolume',
      instagram: 'https://instagram.com/resolume',
      facebook: 'https://facebook.com/resolume'
    },
    created_at: new Date('2023-02-10'),
    updated_at: new Date('2023-11-15')
  },
  {
    id: 3,
    name: 'MadMapper',
    icon_url: 'https://vjun.io/img/software_icons/madmapper.png',
    description: 'Video mapping software with intuitive interface for projection mapping projects.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['3D Mapping', 'LED Control', 'Material Editor', 'Spout', 'Syphon', 'DMX Integration', 'NDI'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '€349 Standard',
    official_website: 'https://madmapper.com',
    github_url: null,
    social_links: {
      youtube: 'https://youtube.com/@madmapper',
      twitter: 'https://twitter.com/madmapper',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-03-05'),
    updated_at: new Date('2023-10-20')
  },
  {
    id: 4,
    name: 'Processing',
    icon_url: null,
    description: 'Free programming language and environment for creating visual arts and interactive media.',
    supported_os: ['Windows', 'macOS', 'Linux'] as OperatingSystem[],
    key_features: ['Creative Coding', 'Open Source', 'Java-based', '2D/3D Graphics', 'Large Community'],
    pricing_model: 'Free' as PricingModel,
    price_details: null,
    official_website: 'https://processing.org',
    github_url: 'https://github.com/processing/processing',
    social_links: {
      youtube: null,
      twitter: 'https://twitter.com/processingOrg',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-12-10')
  },
  {
    id: 5,
    name: 'VDMX5',
    icon_url: 'https://vjun.io/img/software_icons/vdmx.png',
    description: 'Modular VJ software with a focus on real-time video synthesis and performance.',
    supported_os: ['macOS'] as OperatingSystem[],
    key_features: ['Modular Interface', 'ISF Shaders', 'Audio Analysis', 'MIDI Control', 'Quartz Composer', 'Syphon', 'Spout', 'NDI', 'OSC'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '$349',
    official_website: 'https://vidvox.net',
    github_url: null,
    social_links: {
      youtube: 'https://youtube.com/@vidvox',
      twitter: 'https://twitter.com/vidvox',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-02-20'),
    updated_at: new Date('2023-11-30')
  },
  {
    id: 6,
    name: 'Kodelife',
    icon_url: 'https://vjun.io/img/software_icons/kodelife.png',
    description: 'Real-time GPU shader editor for creating stunning visual effects and live coding performances.',
    supported_os: ['Windows', 'macOS', 'Linux'] as OperatingSystem[],
    key_features: ['Live Coding', 'GLSL Shaders', 'Audio Reactive', 'VR Support', 'OSC Control', 'Spout', 'Syphon'],
    pricing_model: 'Freemium' as PricingModel,
    price_details: 'Free with Pro upgrade $15/month',
    official_website: 'https://hexler.net/kodelife',
    github_url: null,
    social_links: {
      youtube: null,
      twitter: 'https://twitter.com/hexler',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-04-12'),
    updated_at: new Date('2023-12-05')
  },
  {
    id: 7,
    name: 'Resolume Avenue',
    icon_url: 'https://vjun.io/img/software_icons/resolume.png',
    description: 'VJ software for live video mixing, featuring real-time effects and audio analysis. A streamlined version of Arena.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['Video Mixing', 'Real-time Effects', 'Audio Reactive', 'MIDI', 'OSC', 'Spout', 'Syphon', 'NDI'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '€299 Avenue',
    official_website: 'https://resolume.com',
    github_url: null,
    social_links: {
      youtube: 'https://youtube.com/@resolume',
      twitter: 'https://twitter.com/resolume',
      instagram: 'https://instagram.com/resolume',
      facebook: 'https://facebook.com/resolume'
    },
    created_at: new Date('2023-02-15'),
    updated_at: new Date('2023-11-20')
  },
  {
    id: 8,
    name: 'HeavyM',
    icon_url: 'https://vjun.io/img/software_icons/heavym.png',
    description: 'User-friendly projection mapping software for creating stunning visual shows with intuitive features and built-in effects.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['Projection Mapping', 'Built-in effects', 'Audio Reactive', 'MIDI', 'OSC', 'Syphon', 'Spout'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '€299 Live, €599 Pro',
    official_website: 'https://heavym.net',
    github_url: null,
    social_links: {
      youtube: 'https://www.youtube.com/@HeavyMapp',
      twitter: 'https://twitter.com/HeavyMapp',
      instagram: 'https://www.instagram.com/heavym_app/',
      facebook: 'https://www.facebook.com/heavymapp'
    },
    created_at: new Date('2023-05-01'),
    updated_at: new Date('2023-12-15')
  },
  {
    id: 9,
    name: 'MixEmergency',
    icon_url: 'https://vjun.io/img/software_icons/mixemergency.png',
    description: 'Powerful video mixing software for macOS, integrated with Serato DJ Pro, offering real-time video effects and transitions.',
    supported_os: ['macOS'] as OperatingSystem[],
    key_features: ['Video Mixing', 'Serato DJ Integration', 'Real-time Effects', 'Syphon', 'NDI', 'Audio Analysis'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '$249',
    official_website: 'https://inklen.com/mixemergency/',
    github_url: null,
    social_links: {
      youtube: 'https://www.youtube.com/@inklensoftware',
      twitter: null,
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-06-01'),
    updated_at: new Date('2023-12-01')
  },
  {
    id: 10,
    name: 'Isadora',
    icon_url: 'https://vjun.io/img/software_icons/isadora.png',
    description: 'Flexible, node-based media server and visual programming environment for interactive art, live performance, and theatre.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['Node-based programming', 'Interactive media', 'Live performance', 'MIDI', 'OSC', 'Spout', 'Syphon', 'DMX'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '$250 Core, $475 Play, $700 Prime',
    official_website: 'https://troikatronix.com/',
    github_url: null,
    social_links: {
      youtube: 'https://www.youtube.com/@TroikaTronix',
      twitter: 'https://twitter.com/TroikaTronix',
      instagram: null,
      facebook: 'https://www.facebook.com/TroikaTronix'
    },
    created_at: new Date('2023-07-01'),
    updated_at: new Date('2023-12-05')
  },
  {
    id: 11,
    name: 'Vuo',
    icon_url: 'https://vjun.io/img/software_icons/vuo.png',
    description: 'Visual programming environment for creating interactive media, motion graphics, and prototypes. It works with real-time audio and video inputs.',
    supported_os: ['macOS'] as OperatingSystem[],
    key_features: ['Visual programming', 'Real-time', 'Motion graphics', 'Interactive', 'MIDI', 'OSC', 'Syphon', 'Spout'],
    pricing_model: 'Paid' as PricingModel,
    price_details: '$299 Standard, $499 Pro',
    official_website: 'https://vuo.org/',
    github_url: null,
    social_links: {
      youtube: 'https://www.youtube.com/@VuoCommunity',
      twitter: 'https://twitter.com/vuo',
      instagram: null,
      facebook: 'https://www.facebook.com/VuoApp'
    },
    created_at: new Date('2023-08-01'),
    updated_at: new Date('2023-12-10')
  },
  {
    id: 12,
    name: 'NestDrop',
    icon_url: null,
    description: 'Windows-only application that creates psychedelic visuals using MilkDrop presets and Syphon/Spout input/output.',
    supported_os: ['Windows'] as OperatingSystem[],
    key_features: ['MilkDrop presets', 'Psychedelic visuals', 'Spout', 'Syphon', 'Audio Reactive'],
    pricing_model: 'Free' as PricingModel,
    price_details: null,
    official_website: 'https://nestimmersion.ca/nestdrop.html',
    github_url: null,
    social_links: {
      youtube: null,
      twitter: null,
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-09-01'),
    updated_at: new Date('2023-12-15')
  },
  {
    id: 13,
    name: 'Hydra',
    icon_url: 'https://vjun.io/img/software_icons/hydra.png',
    description: 'Live coding environment for creating visuals with JavaScript, running directly in the browser. Designed for real-time video synthesis.',
    supported_os: ['Windows', 'macOS', 'Linux'] as OperatingSystem[],
    key_features: ['Live Coding', 'JavaScript', 'Web-based', 'Video Synthesis', 'OSC', 'MIDI'],
    pricing_model: 'Free' as PricingModel,
    price_details: null,
    official_website: 'https://hydra.ojack.xyz/',
    github_url: 'https://github.com/ojack/hydra',
    social_links: {
      youtube: null,
      twitter: 'https://twitter.com/ojack_',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-10-01'),
    updated_at: new Date('2023-12-20')
  },
  {
    id: 14,
    name: 'Max/MSP/Jitter',
    icon_url: 'https://vjun.io/img/software_icons/max_msp_jitter.png',
    description: 'Visual programming language for music and multimedia. Jitter extends Max with real-time video, 3D graphics, and matrix data processing.',
    supported_os: ['Windows', 'macOS'] as OperatingSystem[],
    key_features: ['Visual Programming', 'Real-time Video', '3D Graphics', 'MIDI', 'OSC', 'Spout', 'Syphon', 'NDI', 'Audio Processing'],
    pricing_model: 'Subscription' as PricingModel,
    price_details: '$9.99/month or $399 one-time',
    official_website: 'https://cycling74.com/',
    github_url: null,
    social_links: {
      youtube: 'https://www.youtube.com/@cycling74tv',
      twitter: 'https://twitter.com/cycling74',
      instagram: null,
      facebook: 'https://www.facebook.com/cycling74'
    },
    created_at: new Date('2023-11-01'),
    updated_at: new Date('2023-12-25')
  },
  {
    id: 15,
    name: 'VVVV',
    icon_url: 'https://vjun.io/img/software_icons/vvvv.png',
    description: 'Visual programming environment for real-time motion graphics, video, and creative coding. Often used for interactive installations.',
    supported_os: ['Windows'] as OperatingSystem[],
    key_features: ['Visual Programming', 'Real-time Graphics', 'Interactive Installations', 'MIDI', 'OSC', 'Spout', 'NDI'],
    pricing_model: 'Freemium' as PricingModel,
    price_details: 'Free Non-Commercial, Paid Commercial',
    official_website: 'https://vvvv.org/',
    github_url: 'https://github.com/vvvv',
    social_links: {
      youtube: 'https://www.youtube.com/@vvvvcommunity',
      twitter: 'https://twitter.com/vvvv_org',
      instagram: null,
      facebook: null
    },
    created_at: new Date('2023-12-01'),
    updated_at: new Date('2023-12-30')
  }
];