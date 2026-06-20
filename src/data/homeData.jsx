import { Globe, Users, Award, Calendar } from 'lucide-react';

// Images
import heroClinicalNutrition from '../assets/hero_clinical_nutrition_new.png';
import heroNutritionCongress from '../assets/hero_nutrition_congress_new.png';
import heroEspenTraining from '../assets/hero_espen_training_new.png';

export const slidesData = [
  {
    title: 'Promoting Clinical Nutrition in India',
    ctaLink: '/membership',
    image: heroClinicalNutrition,
    objectPosition: 'center center',
  },
  {
    title: 'Indian Clinical Nutrition Congress 2026',
    ctaLink: '/events',
    image: heroNutritionCongress,
    objectPosition: 'center center',
  },
  {
    title: 'ESPEN Lifelong Learning (LLL) Courses',
    ctaLink: '/courses',
    image: heroEspenTraining,
    objectPosition: 'center 20%',
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
