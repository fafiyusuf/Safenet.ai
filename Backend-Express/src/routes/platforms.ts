import { Request, Response, Router } from 'express';

const router = Router();

// Static platforms data
const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'social_media',
    reporting_url: 'https://www.facebook.com/help/reportlinks'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social_media',
    reporting_url: 'https://help.instagram.com/165828726894770'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'messaging',
    reporting_url: 'https://telegram.org/faq#q-there-39s-illegal-content-on-telegram-how-do-i-take-it-down'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'messaging',
    reporting_url: 'https://faq.whatsapp.com/general/security-and-privacy/how-to-report-spam-and-block-contacts'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    category: 'social_media',
    reporting_url: 'https://help.twitter.com/en/safety-and-security/report-abusive-behavior'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social_media',
    reporting_url: 'https://support.tiktok.com/en/safety-hc/report-a-problem'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    category: 'social_media',
    reporting_url: 'https://support.snapchat.com/en-US/a/report-abuse-in-app'
  },
  {
    id: 'email',
    name: 'Email',
    category: 'communication',
    reporting_url: null
  },
  {
    id: 'other',
    name: 'Other',
    category: 'other',
    reporting_url: null
  }
];

router.get('/', (req: Request, res: Response) => {
  res.json({ platforms: PLATFORMS });
});

export default router;
