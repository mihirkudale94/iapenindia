import { Globe, Users, Award, Calendar } from 'lucide-react';

export const slidesData = [
  {
    eyebrow: 'Advancing clinical nutrition',
    title: 'Better nutrition. Better outcomes.',
    description:
      'Uniting healthcare professionals to move evidence-based nutrition from knowledge into everyday clinical practice.',
    ctaLabel: 'Discover IAPEN India',
    ctaLink: '/membership',
    image: '/images/events/icnc-2022-2.jpeg',
    objectPosition: 'center 42%',
  },
  {
    eyebrow: 'Indian Clinical Nutrition Congress',
    title: 'Where the field moves forward.',
    description:
      'A national platform for ideas, collaboration and the people shaping the future of nutrition care in India.',
    ctaLabel: 'Explore our events',
    ctaLink: '/events',
    image: '/images/events/icnc-2022-1.jpeg',
    objectPosition: 'center 48%',
  },
  {
    eyebrow: 'Education without boundaries',
    title: 'Knowledge that changes care.',
    description:
      'Learn with clinical leaders through courses, congresses and lifelong professional development.',
    ctaLabel: 'Explore education',
    ctaLink: '/courses',
    image: '/images/events/icnc-2022-8.jpeg',
    objectPosition: 'center 32%',
  },
];

export const statsData = [
  { value: '35+', numeric: 35, suffix: '+', label: 'Active Chapters', icon: <Globe size={24} /> },
  {
    value: '17+',
    numeric: 17,
    suffix: '+',
    label: 'Clinical Core Groups',
    icon: <Users size={24} />,
  },
  {
    value: '5000+',
    numeric: 5000,
    suffix: '+',
    label: 'Registered Professionals',
    icon: <Award size={24} />,
  },
  {
    value: '25+',
    numeric: 25,
    suffix: '+',
    label: 'Educational CNEs Yearly',
    icon: <Calendar size={24} />,
  },
];
