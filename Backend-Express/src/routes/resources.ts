import { Request, Response, Router } from 'express';

const router = Router();

// Ethiopian support resources - Comprehensive list
const RESOURCES = {
  en: {
    hotlines: [
      {
        id: 'awsad',
        name: 'Association for Women\'s Sanctuary and Development (AWSAD)',
        name_am: 'የሴቶች መሸሸጊያና ልማት ድርጅት (AWSAD)',
        description: 'Provides comprehensive support for women victims of violence including legal aid, counseling, and safe shelter',
        description_am: 'ለጥቃት ሰለባ ለሆኑ ሴቶች የህግ እርዳታ፣ አማካሪነት እና ደህንነቱ የተጠበቀ መጠለያን ጨምሮ አጠቃላይ ድጋፍ ይሰጣል',
        type: 'ngo',
        phone: '+251-111-562992',
        email: 'info@awsad.org.et',
        website: 'http://awsad.org.et',
        region: 'addis_ababa',
        services: ['Legal aid', 'Counseling', 'Safe shelter', 'Economic empowerment'],
        availability: '24/7'
      },
      {
        id: 'yenege-tesfa',
        name: 'Yenege Tesfa (Hope for Tomorrow)',
        name_am: 'የነገ ተስፋ',
        description: 'Offers psychosocial support and legal assistance to survivors of gender-based violence',
        description_am: 'ለጾታ ላይ የተመሰረተ ጥቃት ተጎጂዎች ስነ-ልቦናዊ ድጋፍ እና የህግ እርዳታ ይሰጣል',
        type: 'ngo',
        phone: '+251-930-001122',
        email: 'contact@yenegetesfa.org',
        website: 'http://yenegetesfa.org',
        region: 'addis_ababa',
        services: ['Psychosocial support', 'Legal assistance', 'Counseling'],
        availability: 'Mon-Fri 8AM-5PM'
      },
      {
        id: 'ewla',
        name: 'Ethiopian Women Lawyers Association (EWLA)',
        name_am: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        description: 'Leading organization providing free legal representation and advocacy for women',
        description_am: 'ለሴቶች ነፃ የህግ ውክልና እና ጥብቅና የሚሰጥ ቀዳሚ ድርጅት',
        type: 'legal_aid',
        phone: '+251-111-563355',
        email: 'ewla@ethionet.et',
        website: 'http://ewla.org.et',
        region: 'addis_ababa',
        services: ['Legal representation', 'Advocacy', 'Legal awareness'],
        availability: 'Mon-Fri 8:30AM-5:30PM'
      },
      {
        id: 'national-gbv-hotline',
        name: 'National GBV Hotline (8383)',
        name_am: 'ብሔራዊ የጾታ ጥቃት ስልክ መስመር (8383)',
        description: '24/7 toll-free emergency hotline for GBV survivors providing immediate support and referrals',
        description_am: '24/7 ነፃ የድንገተኛ ስልክ መስመር ለGBV ተጎጂዎች ፈጣን ድጋፍ እና አቅጣጫ ይሰጣል',
        type: 'helpline',
        phone: '8383',
        email: 'support@gbvhotline.et',
        website: null,
        region: 'all',
        services: ['24/7 support', 'Crisis intervention', 'Referrals'],
        availability: '24/7'
      },
      {
        id: 'agar-ethiopia',
        name: 'Agar Ethiopia Charitable Society',
        name_am: 'አጋር ኢትዮጵያ በጎ አድራጎት ድርጅት',
        description: 'Works to prevent and respond to GBV through community-based programs',
        description_am: 'በማህበረሰብ ላይ የተመሰረቱ ፕሮግራሞችን በመጠቀም ለGBV መከላከል እና ምላሽ ይሰጣል',
        type: 'ngo',
        phone: '+251-111-551122',
        email: 'info@agarethiopia.org',
        website: 'http://agarethiopia.org',
        region: 'addis_ababa',
        services: ['Prevention programs', 'Awareness campaigns', 'Community support'],
        availability: 'Mon-Fri 8AM-5PM'
      },
      {
        id: 'setaweet',
        name: 'Setaweet Movement',
        name_am: 'ሴታዊት እንቅስቃሴ',
        description: 'Feminist movement combating online and offline gender-based violence',
        description_am: 'የመስመር ላይ እና ከመስመር ውጭ ጾታን መሰረት ያደረገ ጥቃትን የሚታገል የሴቶች እንቅስቃሴ',
        type: 'ngo',
        phone: '+251-911-234567',
        email: 'hello@setaweet.com',
        website: 'https://setaweet.com',
        region: 'addis_ababa',
        services: ['Digital safety', 'Advocacy', 'Community building'],
        availability: 'Mon-Fri 9AM-6PM'
      }
    ],
    legal_resources: [
      {
        id: 'federal-police-cyber',
        name: 'Federal Police Cyber Crime Investigation Unit',
        name_am: 'የፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል',
        description: 'Official government unit for reporting and investigating cybercrimes',
        description_am: 'የሳይበር ወንጀሎችን ለሪፖርት እና ለምርመራ ኦፊሴላዊ የመንግስት ክፍል',
        type: 'legal_aid',
        phone: '+251-111-572355',
        email: 'cybercrime@ethiopianpolice.gov.et',
        website: 'http://ethiopianpolice.gov.et',
        region: 'addis_ababa',
        address: 'Federal Police Headquarters, Addis Ababa',
        services: ['Cybercrime reporting', 'Investigation', 'Digital forensics']
      },
      {
        id: 'mowsa',
        name: 'Ministry of Women and Social Affairs',
        name_am: 'የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር',
        description: 'Government ministry overseeing GBV prevention and response programs',
        description_am: 'የGBV መከላከል እና ምላሽ ፕሮግራሞችን የሚቆጣጠር የመንግስት ሚኒስቴር',
        type: 'legal_aid',
        phone: '+251-111-515179',
        email: 'info@mowa.gov.et',
        website: 'http://mowa.gov.et',
        region: 'addis_ababa',
        address: 'Addis Ababa, Ethiopia',
        services: ['GBV support', 'Policy advocacy', 'Victim compensation']
      },
      {
        id: 'attorney-general',
        name: 'Office of the Attorney General - Women & Children Affairs',
        name_am: 'የአቃቤ ህግ ጽ/ቤት - የሴቶች እና ህፃናት ጉዳይ',
        description: 'Prosecutes crimes against women and children including online abuse',
        description_am: 'የመስመር ላይ ጥቃትን ጨምሮ በሴቶች እና ህፃናት ላይ የሚፈፀሙ ወንጀሎችን ያስከሰሳል',
        type: 'legal_aid',
        phone: '+251-111-551234',
        email: 'wca@attorneygeneral.gov.et',
        website: 'http://ag.gov.et',
        region: 'addis_ababa',
        address: 'Addis Ababa, Ethiopia',
        services: ['Legal prosecution', 'Victim support', 'Legal advice']
      }
    ],
    online_resources: [
      {
        id: 'insa',
        name: 'Information Network Security Agency (INSA)',
        name_am: 'የመረጃ አውታረመረብ ደህንነት ኤጀንሲ',
        description: 'National cybersecurity agency providing resources and reporting mechanisms',
        description_am: 'ብሔራዊ የሳይበር ደህንነት ኤጀንሲ ግብዓቶችን እና የሪፖርት ማድረጊያ መንገዶችን ያቀርባል',
        type: 'ngo',
        phone: '+251-111-663344',
        email: 'info@insa.gov.et',
        website: 'https://www.insa.gov.et',
        region: 'all',
        services: ['Cybersecurity guidance', 'Incident reporting', 'Digital literacy']
      },
      {
        id: 'digital-rights-ethiopia',
        name: 'Digital Rights Ethiopia',
        name_am: 'ዲጂታል መብቶች ኢትዮጵያ',
        description: 'Advocacy group for digital rights and online safety in Ethiopia',
        description_am: 'በኢትዮጵያ ውስጥ ለዲጂታል መብቶች እና የመስመር ላይ ደህንነት የጥብቅና ቡድን',
        type: 'ngo',
        phone: '+251-911-998877',
        email: 'contact@digitalrightset.org',
        website: 'http://digitalrightset.org',
        region: 'all',
        services: ['Digital safety training', 'Legal advocacy', 'Research']
      }
    ]
  },
  am: {
    // Amharic version uses same data structure
    hotlines: [
      {
        id: 'awsad',
        name: 'የሴቶች መሸሸጊያና ልማት ድርጅት (AWSAD)',
        name_am: 'የሴቶች መሸሸጊያና ልማት ድርጅት (AWSAD)',
        description: 'ለጥቃት ሰለባ ለሆኑ ሴቶች የህግ እርዳታ፣ አማካሪነት እና ደህንነቱ የተጠበቀ መጠለያን ጨምሮ አጠቃላይ ድጋፍ ይሰጣል',
        description_am: 'ለጥቃት ሰለባ ለሆኑ ሴቶች የህግ እርዳታ፣ አማካሪነት እና ደህንነቱ የተጠበቀ መጠለያን ጨምሮ አጠቃላይ ድጋፍ ይሰጣል',
        type: 'ngo',
        phone: '+251-111-562992',
        email: 'info@awsad.org.et',
        website: 'http://awsad.org.et',
        region: 'addis_ababa',
        services: ['የህግ እርዳታ', 'አማካሪነት', 'ደህንነቱ የተጠበቀ መጠለያ', 'ኢኮኖሚያዊ ማብቃት'],
        availability: '24/7'
      },
      {
        id: 'yenege-tesfa',
        name: 'የነገ ተስፋ',
        name_am: 'የነገ ተስፋ',
        description: 'ለጾታ ላይ የተመሰረተ ጥቃት ተጎጂዎች ስነ-ልቦናዊ ድጋፍ እና የህግ እርዳታ ይሰጣል',
        description_am: 'ለጾታ ላይ የተመሰረተ ጥቃት ተጎጂዎች ስነ-ልቦናዊ ድጋፍ እና የህግ እርዳታ ይሰጣል',
        type: 'ngo',
        phone: '+251-930-001122',
        email: 'contact@yenegetesfa.org',
        website: 'http://yenegetesfa.org',
        region: 'addis_ababa',
        services: ['ስነ-ልቦናዊ ድጋፍ', 'የህግ እርዳታ', 'አማካሪነት'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት'
      },
      {
        id: 'ewla',
        name: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        name_am: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        description: 'ለሴቶች ነፃ የህግ ውክልና እና ጥብቅና የሚሰጥ ቀዳሚ ድርጅት',
        description_am: 'ለሴቶች ነፃ የህግ ውክልና እና ጥብቅና የሚሰጥ ቀዳሚ ድርጅት',
        type: 'legal_aid',
        phone: '+251-111-563355',
        email: 'ewla@ethionet.et',
        website: 'http://ewla.org.et',
        region: 'addis_ababa',
        services: ['የህግ ውክልና', 'ጥብቅና', 'የህግ ግንዛቤ'],
        availability: 'ሰኞ-አርብ 8:30ሰዓት-5:30ሰዓት'
      },
      {
        id: 'national-gbv-hotline',
        name: 'ብሔራዊ የጾታ ጥቃት ስልክ መስመር (8383)',
        name_am: 'ብሔራዊ የጾታ ጥቃት ስልክ መስመር (8383)',
        description: '24/7 ነፃ የድንገተኛ ስልክ መስመር ለGBV ተጎጂዎች ፈጣን ድጋፍ እና አቅጣጫ ይሰጣል',
        description_am: '24/7 ነፃ የድንገተኛ ስልክ መስመር ለGBV ተጎጂዎች ፈጣን ድጋፍ እና አቅጣጫ ይሰጣል',
        type: 'helpline',
        phone: '8383',
        email: 'support@gbvhotline.et',
        website: null,
        region: 'all',
        services: ['24/7 ድጋፍ', 'የቀውስ ጣልቃ ገብነት', 'አቅጣጫ'],
        availability: '24/7'
      },
      {
        id: 'agar-ethiopia',
        name: 'አጋር ኢትዮጵያ በጎ አድራጎት ድርጅት',
        name_am: 'አጋር ኢትዮጵያ በጎ አድራጎት ድርጅት',
        description: 'በማህበረሰብ ላይ የተመሰረቱ ፕሮግራሞችን በመጠቀም ለGBV መከላከል እና ምላሽ ይሰጣል',
        description_am: 'በማህበረሰብ ላይ የተመሰረቱ ፕሮግራሞችን በመጠቀም ለGBV መከላከል እና ምላሽ ይሰጣል',
        type: 'ngo',
        phone: '+251-111-551122',
        email: 'info@agarethiopia.org',
        website: 'http://agarethiopia.org',
        region: 'addis_ababa',
        services: ['የመከላከያ ፕሮግራሞች', 'የግንዛቤ ዘመቻዎች', 'የማህበረሰብ ድጋፍ'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት'
      },
      {
        id: 'setaweet',
        name: 'ሴታዊት እንቅስቃሴ',
        name_am: 'ሴታዊት እንቅስቃሴ',
        description: 'የመስመር ላይ እና ከመስመር ውጭ ጾታን መሰረት ያደረገ ጥቃትን የሚታገል የሴቶች እንቅስቃሴ',
        description_am: 'የመስመር ላይ እና ከመስመር ውጭ ጾታን መሰረት ያደረገ ጥቃትን የሚታገል የሴቶች እንቅስቃሴ',
        type: 'ngo',
        phone: '+251-911-234567',
        email: 'hello@setaweet.com',
        website: 'https://setaweet.com',
        region: 'addis_ababa',
        services: ['ዲጂታል ደህንነት', 'ጥብቅና', 'የማህበረሰብ ግንባታ'],
        availability: 'ሰኞ-አርብ 9ሰዓት-6ሰዓት'
      }
    ],
    legal_resources: [
      {
        id: 'federal-police-cyber',
        name: 'የፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል',
        name_am: 'የፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል',
        description: 'የሳይበር ወንጀሎችን ለሪፖርት እና ለምርመራ ኦፊሴላዊ የመንግስት ክፍል',
        description_am: 'የሳይበር ወንጀሎችን ለሪፖርት እና ለምርመራ ኦፊሴላዊ የመንግስት ክፍል',
        type: 'legal_aid',
        phone: '+251-111-572355',
        email: 'cybercrime@ethiopianpolice.gov.et',
        website: 'http://ethiopianpolice.gov.et',
        region: 'addis_ababa',
        address: 'የፌዴራል ፖሊስ ዋና መስሪያ ቤት፣ አዲስ አበባ',
        services: ['የሳይበር ወንጀል ሪፖርት', 'ምርመራ', 'ዲጂታል ፎረንሲክስ']
      },
      {
        id: 'mowsa',
        name: 'የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር',
        name_am: 'የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር',
        description: 'የGBV መከላከል እና ምላሽ ፕሮግራሞችን የሚቆጣጠር የመንግስት ሚኒስቴር',
        description_am: 'የGBV መከላከል እና ምላሽ ፕሮግራሞችን የሚቆጣጠር የመንግስት ሚኒስቴር',
        type: 'legal_aid',
        phone: '+251-111-515179',
        email: 'info@mowa.gov.et',
        website: 'http://mowa.gov.et',
        region: 'addis_ababa',
        address: 'አዲስ አበባ፣ ኢትዮጵያ',
        services: ['የGBV ድጋፍ', 'የፖሊሲ ጥብቅና', 'የተጎጂዎች ማካካሻ']
      },
      {
        id: 'attorney-general',
        name: 'የአቃቤ ህግ ጽ/ቤት - የሴቶች እና ህፃናት ጉዳይ',
        name_am: 'የአቃቤ ህግ ጽ/ቤት - የሴቶች እና ህፃናት ጉዳይ',
        description: 'የመስመር ላይ ጥቃትን ጨምሮ በሴቶች እና ህፃናት ላይ የሚፈፀሙ ወንጀሎችን ያስከሰሳል',
        description_am: 'የመስመር ላይ ጥቃትን ጨምሮ በሴቶች እና ህፃናት ላይ የሚፈፀሙ ወንጀሎችን ያስከሰሳል',
        type: 'legal_aid',
        phone: '+251-111-551234',
        email: 'wca@attorneygeneral.gov.et',
        website: 'http://ag.gov.et',
        region: 'addis_ababa',
        address: 'አዲስ አበባ፣ ኢትዮጵያ',
        services: ['የህግ ክስ', 'የተጎጂዎች ድጋፍ', 'የህግ ምክር']
      }
    ],
    online_resources: [
      {
        id: 'insa',
        name: 'የመረጃ አውታረመረብ ደህንነት ኤጀንሲ',
        name_am: 'የመረጃ አውታረመረብ ደህንነት ኤጀንሲ',
        description: 'ብሔራዊ የሳይበር ደህንነት ኤጀንሲ ግብዓቶችን እና የሪፖርት ማድረጊያ መንገዶችን ያቀርባል',
        description_am: 'ብሔራዊ የሳይበር ደህንነት ኤጀንሲ ግብዓቶችን እና የሪፖርት ማድረጊያ መንገዶችን ያቀርባል',
        type: 'ngo',
        phone: '+251-111-663344',
        email: 'info@insa.gov.et',
        website: 'https://www.insa.gov.et',
        region: 'all',
        services: ['የሳይበር ደህንነት መመሪያ', 'የክስተት ሪፖርት', 'ዲጂታል ማንበብና መፃፍ']
      },
      {
        id: 'digital-rights-ethiopia',
        name: 'ዲጂታል መብቶች ኢትዮጵያ',
        name_am: 'ዲጂታል መብቶች ኢትዮጵያ',
        description: 'በኢትዮጵያ ውስጥ ለዲጂታል መብቶች እና የመስመር ላይ ደህንነት የጥብቅና ቡድን',
        description_am: 'በኢትዮጵያ ውስጥ ለዲጂታል መብቶች እና የመስመር ላይ ደህንነት የጥብቅና ቡድን',
        type: 'ngo',
        phone: '+251-911-998877',
        email: 'contact@digitalrightset.org',
        website: 'http://digitalrightset.org',
        region: 'all',
        services: ['ዲጂታል ደህንነት ስልጠና', 'የህግ ጥብቅና', 'ምርምር']
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
