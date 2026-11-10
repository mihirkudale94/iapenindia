// Content copied from the live site: /courses/ (Courses page) and the ESPEN menu pages
// /espen-lll-courses/, /espen-membership/ and /espen-eligibility-for-t-lll/ (Espen.jsx).
// Images were downloaded to public/images/courses/.

const img = (name) => `/images/courses/${name}`;
const range = (count, build) => Array.from({ length: count }, (_, index) => build(index + 1));

export const certificateCourses = [
  {
    id: 'diabetes-care-education',
    title: 'Certificate Course in Diabetes Care and Education',
    duration: 'Six months',
    mode: 'Online / Distance learning',
    offeredBy: 'Nutrition & Diabetes India – a core group of IAPEN India',
    poster: img('ew-course.jpg'),
    posterAlt: 'Six months certificate course in Diabetes Care and Education poster',
    groups: [
      {
        heading: 'Course details',
        items: ['Modules: 4', 'Distance mode / online', 'Application based learning system'],
      },
      {
        heading: 'Course includes',
        items: [
          'Project work',
          'Manuscript preparation',
          'Journal submission',
          'Online examination',
        ],
      },
      {
        heading: 'Course modules',
        items: [
          'Introduction to Diabetes',
          'Diabetes Education',
          'Diabetes Management',
          'Diabetes Life Cycle',
        ],
      },
    ],
    fees: [
      { label: 'Non IAPEN members', amount: 'INR 12,650 + 18% GST' },
      { label: 'IAPEN members', amount: 'INR 11,650 + 18% GST' },
    ],
    eligibility:
      'Graduate in Nutrition or Nursing (BSc and above), Pharmacist (B Pharm or above), Bachelors of Physiotherapy, Occupational Therapy, Doctors, Nutrition Graduates.',
    contactEmail: 'iapendiabetes@gmail.com',
  },
  {
    id: 'lifestyle-management-hypertension',
    title: 'Certificate Course in Lifestyle Management and Hypertension',
    certifiedBy: 'IAPEN India Association for Parenteral and Enteral Nutrition',
    endorsedBy: 'International Society of Hypertension',
    partner: 'DocMode',
    poster: img('hypertension-course.jpg'),
    posterAlt: 'Certificate course in Lifestyle Management and Hypertension poster',
    modules: [
      { number: 1, title: 'Introduction to Hypertension', faculty: ['Prof. Gavin Lambert'] },
      {
        number: 2,
        title: 'Nutrition Therapy in Hypertension',
        faculty: ['Dr. Mansi Patil', 'Dr. Shilpa Verma'],
      },
      { number: 3, title: 'Physical Activity and Hypertension', faculty: ['Dr. Amrit Kaur'] },
      { number: 4, title: 'Stress Management', faculty: ['Dr. Mahesh Mitra'] },
      { number: 5, title: 'Substance Abuse and De-Addiction', faculty: ['Dr. Namrata Hange'] },
      {
        number: 6,
        title: 'Non-Pharmacological Management of Hypertension in Special Populations',
        faculty: ['Dr. Ravi Modali'],
      },
      { number: 7, title: 'Latest Guidelines and Tele-Medicine', faculty: ['Dr. Ching Siew Mooi'] },
    ],
    registrationUrl: 'https://iapen.docmode.org/view/lifestyle-management-and-hypertension/',
  },
];

export const espenLllCourses = [
  {
    id: 'lll-2024',
    badge: 'ICNC 2024 · Mumbai',
    title: 'ESPEN LLL Course 2024 – Sahara Star, Mumbai',
    paragraphs: [
      'Sharing stupendous success of the ESPEN LLL Course 2024 at Sahara Star, Mumbai @ICNC 2024. 😊',
      'We at IAPEN INDIA are humbled by all the smiles and positive feedbacks of satisfied learners and in gratitude of the eminent faculties Dr Perundurai Chinnaswamy Vijayakumar Sir, Biju Pottakkat Sir, Shivshankar Timmanpyati Sir, Prof Rocco Barazzoni, Prof Rémy Meier, Mansi Gupta Patil, Datta Patel, Bidita Shah, Dr Jayasshree Toddkar Madam, Dr Harish Ambekar for their support.',
      'IAPEN INDIA strives to continue this journey of contributing towards evidence based learnings.',
    ],
    images: range(14, (n) => ({
      src: img(`espen-lll-2024-${n}.jpg`),
      alt: `ESPEN LLL Course 2024, Mumbai – photo ${n}`,
    })),
  },
  {
    id: 'lll-2023',
    badge: 'ICNC 2023 · Chennai',
    title: 'Successful completion of the Physical ESPEN LLL Course',
    paragraphs: [
      'Successful completion of the Physical ESPEN LLL Course – a programme in Clinical Nutrition and Metabolism is based on an Educational Curriculum offering more than 120 training modules, created and peer-reviewed by recognized experts in the field during #ICNC2023 at Chennai.',
      'With super attendance of around 75 participants for each module, and with eminent International and National ESPEN faculties like Prof Remy Meier, Prof Rocco Barazzoni, Dr Veeradej Pisprasert, Dr Shilpa Varma, Dr Bidita Shah and also Dr P C Vijayakumar, Dr Biju Pottakat, Shivshankar Timmanpyati amongst few, this was a very well received and successful course.',
    ],
    images: range(14, (n) => ({
      src: img(`espen-lll-2023-${n}.jpg`),
      alt: `Physical ESPEN LLL Course 2023, Chennai – photo ${n}`,
    })),
  },
  {
    id: 'lll-2022',
    badge: '10–12 March 2022 · Virtual',
    title: 'ESPEN LLL Virtual Course',
    paragraphs: [
      'A successful ESPEN LLL virtual course conducted by IAPEN INDIA on 10, 11, 12th March 2022.',
      'Course Coordinator: Dr. Shilpa Varma',
    ],
    images: ['1.jpg', '2.png', '3.png', '4.jpg', '5.png', '6.jpg', '7.jpg'].map((file, index) => ({
      src: img(`espen-lll-2022-${file}`),
      alt: `ESPEN LLL Virtual Course 2022 – glimpse ${index + 1}`,
    })),
  },
];

export const espenBlockMembership = {
  formUrl: 'https://docs.google.com/forms/d/1Q43W1QKOPw8rty90Z-7kjFSPxIh52djOMsDq6BmKeXc/edit',
  email: 'pencommunication@iapenindia.org',
  fees: [
    {
      category: 'Junior members',
      detail: 'Under 35 years of age (born in 1987 or after, for the 2022 cycle)',
      amount: '₹5,000',
    },
    {
      category: 'Senior members',
      detail: 'Above 65 years of age (born in 1957 or before, for the 2022 cycle)',
      amount: '₹5,000',
    },
    { category: 'Regular members', detail: 'All other members', amount: '₹10,000' },
  ],
  notes: [
    'It is mandatory to be a member of IAPEN India to apply for block membership of ESPEN.',
    'The applications for block membership for ESPEN 2022 will be accepted till Jan 20, 2022.',
    'Kindly fill complete and correct details in the form; once submitted, no edits or cancellations will be possible.',
    'Kindly share the transaction details for the fees paid, so we can process your request further.',
  ],
};

export const tlllCriteria = {
  title:
    'IAPEN India eligibility criteria to request the President, IAPEN India for a Letter of Approval to apply for ESPEN T-LLL',
  sections: [
    {
      heading: '1. Mandatory criteria',
      items: [
        'IAPEN INDIA life membership.',
        'ESPEN Block membership for the last 3 years.',
        {
          text: 'Significant contribution to the IAPEN INDIA Association – uplifting the Association at national and international level, having fulfilled the following:',
          items: [
            'Being an office bearer of IAPEN INDIA for minimum 5 years at Chapter level or 2 years at National level, and having contributed substantially to the growth of IAPEN INDIA.',
            'Having conducted at least 5 workshops / seminars at Chapter level or Core Group level for IAPEN INDIA, or 1 National or International Conference for IAPEN INDIA.',
            'Having at least 2 successful publications in the IAPEN INDIA Journal – Journal of Nutrition Research.',
            'Contributed to increasing life membership for IAPEN INDIA by a minimum of 15 life members.',
          ],
        },
      ],
    },
    {
      heading: '2. Other criteria',
      intro: 'Preference will be given to:',
      items: [
        'Candidates who have passed the ESPEN Diploma, as they would have gone through the rigorous training of all required modules, both online and live courses.',
        'Minimum one in-person attendance at the ESPEN Congress.',
        'Having done at least one physical course conducted by ESPEN other than LLL internationally, reflecting keen interest in ESPEN academics.',
        'HOD, Department of Clinical / Therapeutic / Human Nutrition in a multi-speciality hospital, or those who have teaching experience (MSc, PhD, M Phil etc.).',
        'Any other inputs such as being on board to train the trainer – national or international organization, Editor, Board Member or Reviewer in any journal of Nutrition and Healthcare at national or international level.',
        'For mainstream medical professionals: those who have post-PG experience as a teacher or have been a non-TLLL teacher for ESPEN LLL live workshops.',
      ],
    },
    {
      heading: '3. Additional mandatory ESPEN criteria for T-LLL',
      items: [
        'An ESPEN member for the current year of application.',
        'Older than 35 years.',
        'Member of a national PEN society which is an ESPEN block member and ESPEN council member.',
        'Have successfully completed 3 LLL live courses / webinars (12 credits) and 3 online LLL topics (8 credits).',
      ],
    },
    {
      heading: '4. Documents needed for submission to ESPEN',
      items: [
        'Short CV summarizing your educational experience.',
        'Letter of recommendation signed by the chairman of the national PEN society.',
        'The duly filled ESPEN application form.',
        'The email of your confirmed registration to the ESPEN Congress where the TLLL course is organized.',
      ],
    },
  ],
  disclaimer: [
    'In agreement with IAPEN India, a T-LLL teacher whose application was approved by IAPEN India will not use the T-LLL to conduct any ESPEN LLL programs with any competing associations in India other than IAPEN INDIA, and only as approved by the NEC, IAPEN INDIA.',
    'The decision of the NEC and BOD, IAPEN INDIA with majority approval will be final and unquestionable.',
  ],
  applicationEmails: ['president@iapenindia.org', 'pencommunication@iapenindia.org'],
  queriesEmail: 'pencommunication@iapenindia.org',
  deadline: '31st May',
};
