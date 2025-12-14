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
        description: 'Provides safe shelters, psychosocial support, legal aid, medical care and reintegration support for survivors of gender-based violence across Ethiopia',
        description_am: 'በኢትዮጵያ ውስጥ ለጾታ ላይ የተመሰረተ ጥቃት ተጎጂዎች ደህንነታቸው የተጠበቀ መጠለያ፣ ስነ-ልቦናዊ ድጋፍ፣ የህግ እርዳታ፣ የህክምና እንክብካቤ እና እንደገና ማቋቋም ይሰጣል',
        type: 'ngo',
        phone: '+251-116-672290',
        email: null,
        website: 'https://awsadethiopia.org/',
        region: 'all',
        services: ['Safe shelters', 'Psychosocial support', 'Legal aid', 'Medical care', 'Reintegration support'],
        availability: '24/7',
        locations: 'Addis Ababa (also branches in Adama, Hawassa, Dessie, Debre Birhan, Weldiya, Semera)'
      },
      {
        id: 'siiqqee',
        name: 'Siiqqee Women\'s Development Association (SWDA)',
        name_am: 'ሲቄ የሴቶች ልማት ድርጅት (SWDA)',
        description: 'Works on empowering women and girls, including advocacy on gender-based violence prevention and gender equality promotion alongside health and economic support programs',
        description_am: 'ሴቶችን እና ልጃገረዶችን ማብቃት፣ የጾታ ላይ የተመሰረተ ጥቃትን መከላከል እና የጾታ እኩልነት ማስፋፋት በጤና እና ኢኮኖሚያዊ ድጋፍ ፕሮግራሞች ላይ ይሰራል',
        type: 'ngo',
        phone: '+251-911-405509, +251-113-698134',
        email: 'info@siqqee.org',
        website: 'https://siiqqee.org/',
        region: 'oromia',
        services: ['GBV prevention advocacy', 'Gender equality promotion', 'Health support', 'Economic empowerment'],
        availability: 'Mon-Fri 8AM-5PM',
        locations: 'Addis Ababa (Nefas Silk Lafto Sub-city), Oromia region activities'
      },
      {
        id: 'ewdo',
        name: 'Ethiopian Women Development Organization (EWDO)',
        name_am: 'የኢትዮጵያ ሴቶች ልማት ድርጅት (EWDO)',
        description: 'Addresses gender-based violence including online/technology-facilitated abuse as part of broader gender justice programs and sexual and reproductive health rights',
        description_am: 'የመስመር ላይ/ቴክኖሎጂን መሰረት ያደረገ በደልን ጨምሮ የጾታ ላይ የተመሰረተ ጥቃትን በሰፊው የጾታ ፍትህ ፕሮግራሞች እና የወሲብ እና የመራቢያ ጤና መብቶች ላይ ይሰራል',
        type: 'ngo',
        phone: null,
        email: null,
        website: 'https://www.ewdoet.org/',
        region: 'addis_ababa',
        services: ['Online violence prevention', 'Gender justice', 'Sexual & reproductive health rights', 'GBV advocacy'],
        availability: 'Mon-Fri 8AM-5PM'
      },
      {
        id: 'ewla',
        name: 'Ethiopian Women Lawyers Association (EWLA)',
        name_am: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        description: 'Legal advocacy and support for women\'s rights, including legal assistance and representation related to gender-based violence issues',
        description_am: 'የሴቶችን መብት የህግ ድጋፍ እና ጥብቅና፣ ከጾታ ላይ የተመሰረቱ ጥቃት ጉዳዮች ጋር የተያያዙ የህግ እርዳታ እና ውክልና ይሰጣል',
        type: 'legal_aid',
        phone: null,
        email: null,
        website: 'http://www.ewla-et.org',
        region: 'addis_ababa',
        services: ['Legal representation', 'Legal advocacy', 'Women\'s rights support', 'GBV legal assistance'],
        availability: 'Mon-Fri 8:30AM-5:30PM'
      },
      {
        id: 'ywca',
        name: 'Young Women Christian Association (YWCA) Ethiopia',
        name_am: 'የወጣት ሴቶች ክርስቲያን ማህበር (YWCA) ኢትዮጵያ',
        description: 'Works on women\'s rights and empowerment, including addressing violence and harmful social practices against women',
        description_am: 'የሴቶች መብቶች እና ማብቃት፣ ሴቶችን በተመለከተ ጥቃትን እና ጎጂ ማህበራዊ ልማዶችን በመፍታት ላይ ይሰራል',
        type: 'ngo',
        phone: null,
        email: 'ywcaeth@gmail.com',
        website: 'http://www.ywcaeth.org',
        region: 'addis_ababa',
        services: ['Women\'s empowerment', 'Violence prevention', 'Rights advocacy'],
        availability: 'Mon-Fri 8AM-5PM'
      },
      {
        id: 'uewca',
        name: 'Union of Ethiopian Women Charitable Association (UEWCA)',
        name_am: 'የኢትዮጵያ ሴቶች የበጎ አድራጎት ማህበራት ህብረት (UEWCA)',
        description: 'A union of women\'s organizations in Ethiopia focusing on rights, including gender equity and GBV-related advocacy',
        description_am: 'የጾታ እኩልነት እና ከGBV ጋር የተያያዙ ጥብቅናዎችን ጨምሮ መብቶች ላይ ያተኮሩ የኢትዮጵያ የሴቶች ድርጅቶች ህብረት',
        type: 'ngo',
        phone: null,
        email: 'uewca@yahoo.com',
        website: 'http://www.uewca.org',
        region: 'addis_ababa',
        services: ['Women\'s rights', 'Gender equity advocacy', 'GBV prevention'],
        availability: 'Mon-Fri 8AM-5PM'
      },
      {
        id: 'elida',
        name: 'Empathy for Life Integrated Development Association (ELiDA)',
        name_am: 'ኤምፓቲ ፎር ላይፍ ተቀናጅ ልማት ማህበር (ELiDA)',
        description: 'Women-led, rights-focused organization working on gender equality, peacebuilding, and community empowerment with prevention and response to GBV/SGBV as thematic priority, especially in conflict-affected areas',
        description_am: 'በሴቶች የሚመራ፣ በመብት ላይ ያተኮረ ድርጅት በጾታ እኩልነት፣ ሰላም ግንባታ እና የማህበረሰብ ማብቃት ላይ የሚሰራ GBV/SGBV መከላከል እና ምላሽ በተለይ በግጭት ተጎዳ አካባቢዎች ላይ ቀዳሚ ትኩረት ይሰጣል',
        type: 'ngo',
        phone: '+251-911-377211',
        email: 'zinet@elidaethiopia.org',
        website: 'https://elidaethiopia.org/',
        region: 'all',
        services: ['GBV/SGBV prevention', 'Safe spaces/one-stop centers', 'Psychosocial advocacy', 'Peacebuilding', 'Online & offline violence prevention training'],
        availability: 'Mon-Fri 8AM-5PM',
        locations: 'Addis Ababa (Roosevelt Street, in front of African Union, Tsega Building 4th Floor), programs in Amhara, Afar, Oromia regions'
      },
      {
        id: 'national-gbv-hotline',
        name: 'National GBV Hotlines (7711, 6388, 8044)',
        name_am: 'ብሔራዊ የጾታ ጥቃት ስልክ መስመሮች (7711, 6388, 8044)',
        description: '24/7 emergency hotlines for GBV survivors providing immediate support and referrals',
        description_am: '24/7 የድንገተኛ ስልክ መስመሮች ለGBV ተጎጂዎች ፈጣን ድጋፍ እና አቅጣጫ ይሰጣሉ',
        type: 'helpline',
        phone: '7711, 6388, 8044',
        email: 'support@gbvhotline.et',
        website: null,
        region: 'all',
        services: ['24/7 support', 'Crisis intervention', 'Referrals'],
        availability: '24/7'
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
        description: 'በኢትዮጵያ ውስጥ ለጾታ ላይ የተመሰረተ ጥቃት ተጎጂዎች ደህንነታቸው የተጠበቀ መጠለያ፣ ስነ-ልቦናዊ ድጋፍ፣ የህግ እርዳታ፣ የህክምና እንክብካቤ እና እንደገና ማቋቋም ይሰጣል',
        description_am: 'በኢትዮጵያ ውስጥ ለጾታ ላይ የተመሰረተ ጥቃት ተጎጂዎች ደህንነታቸው የተጠበቀ መጠለያ፣ ስነ-ልቦናዊ ድጋፍ፣ የህግ እርዳታ፣ የህክምና እንክብካቤ እና እንደገና ማቋቋም ይሰጣል',
        type: 'ngo',
        phone: '+251-116-672290',
        email: null,
        website: 'https://awsadethiopia.org/',
        region: 'all',
        services: ['ደህንነቱ የተጠበቀ መጠለያ', 'ስነ-ልቦናዊ ድጋፍ', 'የህግ እርዳታ', 'የህክምና እንክብካቤ', 'እንደገና ማቋቋም'],
        availability: '24/7',
        locations: 'አዲስ አበባ (የቅርንጫፎች ቢሮዎች በአዳማ፣ ሀዋሳ፣ ደሴ፣ ደብረ ብርሃን፣ ወልዲያ፣ ሰመራ)'
      },
      {
        id: 'siiqqee',
        name: 'ሲቄ የሴቶች ልማት ድርጅት (SWDA)',
        name_am: 'ሲቄ የሴቶች ልማት ድርጅት (SWDA)',
        description: 'ሴቶችን እና ልጃገረዶችን ማብቃት፣ የጾታ ላይ የተመሰረተ ጥቃትን መከላከል እና የጾታ እኩልነት ማስፋፋት በጤና እና ኢኮኖሚያዊ ድጋፍ ፕሮግራሞች ላይ ይሰራል',
        description_am: 'ሴቶችን እና ልጃገረዶችን ማብቃት፣ የጾታ ላይ የተመሰረተ ጥቃትን መከላከል እና የጾታ እኩልነት ማስፋፋት በጤና እና ኢኮኖሚያዊ ድጋፍ ፕሮግራሞች ላይ ይሰራል',
        type: 'ngo',
        phone: '+251-911-405509, +251-113-698134',
        email: 'info@siqqee.org',
        website: 'https://siiqqee.org/',
        region: 'oromia',
        services: ['የGBV መከላከል ጥብቅና', 'የጾታ እኩልነት ማስፋፋት', 'የጤና ድጋፍ', 'ኢኮኖሚያዊ ማብቃት'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት',
        locations: 'አዲስ አበባ (ነፋስ ስልክ ላፍቶ ክፍለ ከተማ)፣ የኦሮሚያ ክልል እንቅስቃሴዎች'
      },
      {
        id: 'ewdo',
        name: 'የኢትዮጵያ ሴቶች ልማት ድርጅት (EWDO)',
        name_am: 'የኢትዮጵያ ሴቶች ልማት ድርጅት (EWDO)',
        description: 'የመስመር ላይ/ቴክኖሎጂን መሰረት ያደረገ በደልን ጨምሮ የጾታ ላይ የተመሰረተ ጥቃትን በሰፊው የጾታ ፍትህ ፕሮግራሞች እና የወሲብ እና የመራቢያ ጤና መብቶች ላይ ይሰራል',
        description_am: 'የመስመር ላይ/ቴክኖሎጂን መሰረት ያደረገ በደልን ጨምሮ የጾታ ላይ የተመሰረተ ጥቃትን በሰፊው የጾታ ፍትህ ፕሮግራሞች እና የወሲብ እና የመራቢያ ጤና መብቶች ላይ ይሰራል',
        type: 'ngo',
        phone: null,
        email: null,
        website: 'https://www.ewdoet.org/',
        region: 'addis_ababa',
        services: ['የመስመር ላይ ጥቃት መከላከል', 'የጾታ ፍትህ', 'የወሲብ እና መራቢያ ጤና መብቶች', 'የGBV ጥብቅና'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት'
      },
      {
        id: 'ewla',
        name: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        name_am: 'የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA)',
        description: 'የሴቶችን መብት የህግ ድጋፍ እና ጥብቅና፣ ከጾታ ላይ የተመሰረቱ ጥቃት ጉዳዮች ጋር የተያያዙ የህግ እርዳታ እና ውክልና ይሰጣል',
        description_am: 'የሴቶችን መብት የህግ ድጋፍ እና ጥብቅና፣ ከጾታ ላይ የተመሰረቱ ጥቃት ጉዳዮች ጋር የተያያዙ የህግ እርዳታ እና ውክልና ይሰጣል',
        type: 'legal_aid',
        phone: null,
        email: null,
        website: 'http://www.ewla-et.org',
        region: 'addis_ababa',
        services: ['የህግ ውክልና', 'የህግ ጥብቅና', 'የሴቶች መብት ድጋፍ', 'የGBV የህግ እርዳታ'],
        availability: 'ሰኞ-አርብ 8:30ሰዓት-5:30ሰዓት'
      },
      {
        id: 'ywca',
        name: 'የወጣት ሴቶች ክርስቲያን ማህበር (YWCA) ኢትዮጵያ',
        name_am: 'የወጣት ሴቶች ክርስቲያን ማህበር (YWCA) ኢትዮጵያ',
        description: 'የሴቶች መብቶች እና ማብቃት፣ ሴቶችን በተመለከተ ጥቃትን እና ጎጂ ማህበራዊ ልማዶችን በመፍታት ላይ ይሰራል',
        description_am: 'የሴቶች መብቶች እና ማብቃት፣ ሴቶችን በተመለከተ ጥቃትን እና ጎጂ ማህበራዊ ልማዶችን በመፍታት ላይ ይሰራል',
        type: 'ngo',
        phone: null,
        email: 'ywcaeth@gmail.com',
        website: 'http://www.ywcaeth.org',
        region: 'addis_ababa',
        services: ['የሴቶች ማብቃት', 'ጥቃት መከላከል', 'የመብት ጥብቅና'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት'
      },
      {
        id: 'uewca',
        name: 'የኢትዮጵያ ሴቶች የበጎ አድራጎት ማህበራት ህብረት (UEWCA)',
        name_am: 'የኢትዮጵያ ሴቶች የበጎ አድራጎት ማህበራት ህብረት (UEWCA)',
        description: 'የጾታ እኩልነት እና ከGBV ጋር የተያያዙ ጥብቅናዎችን ጨምሮ መብቶች ላይ ያተኮሩ የኢትዮጵያ የሴቶች ድርጅቶች ህብረት',
        description_am: 'የጾታ እኩልነት እና ከGBV ጋር የተያያዙ ጥብቅናዎችን ጨምሮ መብቶች ላይ ያተኮሩ የኢትዮጵያ የሴቶች ድርጅቶች ህብረት',
        type: 'ngo',
        phone: null,
        email: 'uewca@yahoo.com',
        website: 'http://www.uewca.org',
        region: 'addis_ababa',
        services: ['የሴቶች መብቶች', 'የጾታ እኩልነት ጥብቅና', 'የGBV መከላከል'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት'
      },
      {
        id: 'elida',
        name: 'ኤምፓቲ ፎር ላይፍ ተቀናጅ ልማት ማህበር (ELiDA)',
        name_am: 'ኤምፓቲ ፎር ላይፍ ተቀናጅ ልማት ማህበር (ELiDA)',
        description: 'በሴቶች የሚመራ፣ በመብት ላይ ያተኮረ ድርጅት በጾታ እኩልነት፣ ሰላም ግንባታ እና የማህበረሰብ ማብቃት ላይ የሚሰራ GBV/SGBV መከላከል እና ምላሽ በተለይ በግጭት ተጎዳ አካባቢዎች ላይ ቀዳሚ ትኩረት ይሰጣል',
        description_am: 'በሴቶች የሚመራ፣ በመብት ላይ ያተኮረ ድርጅት በጾታ እኩልነት፣ ሰላም ግንባታ እና የማህበረሰብ ማብቃት ላይ የሚሰራ GBV/SGBV መከላከል እና ምላሽ በተለይ በግጭት ተጎዳ አካባቢዎች ላይ ቀዳሚ ትኩረት ይሰጣል',
        type: 'ngo',
        phone: '+251-911-377211',
        email: 'zinet@elidaethiopia.org',
        website: 'https://elidaethiopia.org/',
        region: 'all',
        services: ['የGBV/SGBV መከላከል', 'ደህንነቱ የተጠበቀ ቦታዎች/አንድ-ማቆሚያ ማዕከላት', 'ስነ-ልቦናዊ ጥብቅና', 'ሰላም ግንባታ', 'የመስመር ላይ እና ከመስመር ውጪ ጥቃት መከላከል ስልጠና'],
        availability: 'ሰኞ-አርብ 8ሰዓት-5ሰዓት',
        locations: 'አዲስ አበባ (ሩዝቬልት መንገድ፣ የአፍሪካ ህብረት ፊት ለፊት፣ ጸጋ ህንጻ 4ኛ ፎቅ)፣ በአማራ፣ ዓፋር፣ ኦሮሚያ ክልሎች ፕሮግራሞች'
      },
      {
        id: 'national-gbv-hotline',
        name: 'ብሔራዊ የጾታ ጥቃት ስልክ መስመሮች (7711, 6388, 8044)',
        name_am: 'ብሔራዊ የጾታ ጥቃት ስልክ መስመሮች (7711, 6388, 8044)',
        description: '24/7 የድንገተኛ ስልክ መስመሮች ለGBV ተጎጂዎች ፈጣን ድጋፍ እና አቅጣጫ ይሰጣሉ',
        description_am: '24/7 የድንገተኛ ስልክ መስመሮች ለGBV ተጎጂዎች ፈጣን ድጋፍ እና አቅጣጫ ይሰጣሉ',
        type: 'helpline',
        phone: '7711, 6388, 8044',
        email: 'support@gbvhotline.et',
        website: null,
        region: 'all',
        services: ['24/7 ድጋፍ', 'የቀውስ ጣልቃ ገብነት', 'አቅጣጫ'],
        availability: '24/7'
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
