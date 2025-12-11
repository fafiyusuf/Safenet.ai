import { Request, Response, Router } from 'express';

const router = Router();

// Ethiopian support resources
const RESOURCES = {
  en: {
    hotlines: [
      {
        name: 'Association for Women\'s Sanctuary and Development (AWSAD)',
        phone: '+251-111-562992',
        services: ['Legal aid', 'Counseling', 'Safe shelter'],
        availability: '24/7'
      },
      {
        name: 'Yenege Tesfa',
        phone: '+251-930-001122',
        services: ['Psychosocial support', 'Legal assistance'],
        availability: 'Mon-Fri 8AM-5PM'
      },
      {
        name: 'Ethiopian Women Lawyers Association (EWLA)',
        phone: '+251-111-563355',
        services: ['Legal representation', 'Advocacy'],
        availability: 'Mon-Fri 8:30AM-5:30PM'
      }
    ],
    legal_resources: [
      {
        title: 'Federal Police Cyber Crime Unit',
        contact: '+251-111-572355',
        address: 'Addis Ababa, Ethiopia',
        services: ['Cybercrime reporting', 'Investigation']
      },
      {
        title: 'Ministry of Women and Social Affairs',
        contact: '+251-111-515179',
        address: 'Addis Ababa, Ethiopia',
        services: ['GBV support', 'Policy advocacy']
      }
    ],
    online_resources: [
      {
        title: 'National Cyber Security Strategy',
        url: 'https://www.insa.gov.et',
        description: 'Ethiopia\'s cybersecurity framework'
      }
    ]
  },
  am: {
    hotlines: [
      {
        name: 'የሴቶች መሸሸጊያና ልማት ድርጅት (AWSAD)',
        phone: '+251-111-562992',
        services: ['የህግ እርዳታ', 'አማካሪነት', 'ደህንነቱ የተጠበቀ መጠለያ'],
        availability: '24/7'
      },
      {
        name: 'የነገ ተስፋ',
        phone: '+251-930-001122',
        services: ['ስነ-ልቦናዊ ድጋፍ', 'የህግ እርዳታ'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት'
      },
      {
        name: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        phone: '+251-111-563355',
        services: ['የህግ ውክልና', 'ጥብቅና'],
        availability: 'ሰኞ-አርብ 8:30ሰዓት-5:30ሰዓት'
      }
    ],
    legal_resources: [
      {
        title: 'የፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል',
        contact: '+251-111-572355',
        address: 'አዲስ አበባ፣ ኢትዮጵያ',
        services: ['የሳይበር ወንጀል ሪፖርት', 'ምርመራ']
      },
      {
        title: 'የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር',
        contact: '+251-111-515179',
        address: 'አዲስ አበባ፣ ኢትዮጵያ',
        services: ['በጾታ ላይ የተመሰረተ ጥቃት ድጋፍ', 'ፖሊሲ ጥብቅና']
      }
    ],
    online_resources: [
      {
        title: 'ብሄራዊ የሳይበር ደህንነት ስትራቴጂ',
        url: 'https://www.insa.gov.et',
        description: 'የኢትዮጵያ የሳይበር ደህንነት ማዕቀፍ'
      }
    ]
  }
};

router.get('/', (req: Request, res: Response) => {
  const language = (req.query.language as string) || 'en';
  const resources = RESOURCES[language as keyof typeof RESOURCES] || RESOURCES.en;
  
  res.json(resources);
});

export default router;
