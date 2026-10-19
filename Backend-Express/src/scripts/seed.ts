/**
 * Seed script: creates default admin user and sample evidence reports
 * Run: pnpm exec ts-node src/scripts/seed.ts
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../../.env') });

import { query, initializeDatabase } from '../utils/database';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin_1234';
const ADMIN_EMAIL = 'admin@safenet.ai';

const SEED_REPORTS = [
  {
    id: crypto.randomUUID(),
    platform_id: 'telegram',
    language: 'am',
    extracted_text: 'አስቸኳይ: ፎቶዬን ካልሰጠሽ ማህበረሰቡ ሁሉ ያያቸዋል። ዛሬ ምሽት ነው ጊዜህ',
    category: 'threats',
    severity: 92,
    risk_level: 'high',
    confidence: 0.97,
    rationale: 'Explicit non-consensual image threat with deadline coercion. Direct TFGBV under Proc. 958/2016 Art. 14.',
    highlighted_phrases: JSON.stringify(['አስቸኳይ', 'ፎቶዬን ካልሰጠሽ']),
    advice: 'ወዲያውኑ ለፖሊስ 991 ወይም GBV 7711 ሪፖርት ያድርጉ።',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'facebook',
    language: 'en',
    extracted_text: 'I know where you live and where you work. I have been watching you every day since you blocked me.',
    category: 'stalking',
    severity: 88,
    risk_level: 'high',
    confidence: 0.95,
    rationale: 'Physical surveillance threat combined with location monitoring and coercive surveillance language.',
    highlighted_phrases: JSON.stringify(['I know where you live', 'I have been watching you']),
    advice: 'Document immediately and contact police. Consider a protection order.',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'tiktok',
    language: 'om',
    extracted_text: 'Suuraa qaama saalaa naaf ergi yokaan iccitii kee hundaan saaxila sita godha',
    category: 'image_based_abuse',
    severity: 95,
    risk_level: 'high',
    confidence: 0.98,
    rationale: 'Explicit sextortion threat. Non-consensual image sharing coercion under Ethiopian Cybercrime Proclamation.',
    highlighted_phrases: JSON.stringify(['Suuraa qaama saalaa', 'saaxila sita godha']),
    advice: 'Bilbila bilisaa GBV 7711 bilbilaa. Ragaa hunda qabadhu.',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'instagram',
    language: 'am',
    extracted_text: 'ጊጁ ሴት ነሽ። ሰዎቹ ሁሉ ስትፈርቱ ሳያዩ ቤቴ ትደርሻለሽ።',
    category: 'harassment',
    severity: 65,
    risk_level: 'medium',
    confidence: 0.83,
    rationale: 'Gender-based humiliation and implied physical threat.',
    highlighted_phrases: JSON.stringify(['ጊጁ ሴት ነሽ', 'ቤቴ ትደርሻለሽ']),
    advice: 'ማህበራዊ ሚዲያ ሪፖርት ያድርጉ። የሚያስፈልግ ከሆነ ፖሊስ ያነጋግሩ።',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'twitter',
    language: 'en',
    extracted_text: 'Exposing this corrupt woman who fakes her credentials. Her address is [REDACTED]. Retweet to spread.',
    category: 'stalking',
    severity: 78,
    risk_level: 'high',
    confidence: 0.91,
    rationale: 'Doxing with personal address exposure coordinated through social media amplification.',
    highlighted_phrases: JSON.stringify(['Her address is', 'Retweet to spread']),
    advice: 'Contact platform trust and safety team immediately. Report to Cyber Crime Investigation Unit.',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'telegram',
    language: 'ti',
    extracted_text: 'ስእሊ ዘይደልዩ ናብ ስድራቤትካ ክሰደሎም እየ። ሕጂ ናተይ ምኻን ኣቋርጽ',
    category: 'image_based_abuse',
    severity: 90,
    risk_level: 'high',
    confidence: 0.96,
    rationale: 'Non-consensual image threat targeting family members — severe coercion tactic.',
    highlighted_phrases: JSON.stringify(['ስእሊ ዘይደልዩ', 'ናብ ስድራቤትካ']),
    advice: 'ናብ ፖሊስ 991 ብቕልጡፍ ሪፖርት ግበር። ናብ EWLA ሕጋዊ ሓገዝ ሕተት።',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'facebook',
    language: 'so',
    extracted_text: 'Sawirradaada waxaan u diriyaa dadka aad garanayso haddaan rabin inaad ii hesho lacagta',
    category: 'image_based_abuse',
    severity: 89,
    risk_level: 'high',
    confidence: 0.94,
    rationale: 'Financial extortion with non-consensual image threat.',
    highlighted_phrases: JSON.stringify(['Sawirradaada waxaan u diriyaa', 'lacagta']),
    advice: 'Wac 7711 si degdeg ah. Ku keydi caddeymaha.',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'telegram',
    language: 'en',
    extracted_text: 'This message appears to be a normal conversation asking about meeting times.',
    category: 'non_abusive',
    severity: 5,
    risk_level: 'low',
    confidence: 0.91,
    rationale: 'No abuse indicators detected. Conversational message about scheduling.',
    highlighted_phrases: JSON.stringify([]),
    advice: 'No immediate action required.',
    is_conversational: true,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'whatsapp',
    language: 'am',
    extracted_text: 'አሁን ቤት ደርሸሻለሁ። ካልወጣሽ ሳይሆን ቤቱን አቃጥላለሁ',
    category: 'threats',
    severity: 97,
    risk_level: 'high',
    confidence: 0.99,
    rationale: 'Immediate physical threat with arson intent — life-threatening emergency.',
    highlighted_phrases: JSON.stringify(['ቤቱን አቃጥላለሁ', 'ካልወጣሽ']),
    advice: 'ወዲያውኑ 991 ደውሉ! ቤቱን ወጡ።',
    is_conversational: false,
  },
  {
    id: crypto.randomUUID(),
    platform_id: 'instagram',
    language: 'en',
    extracted_text: 'She is immoral. Look at her photos. Tag all your friends. Let the whole city know who she is.',
    category: 'hate_speech',
    severity: 72,
    risk_level: 'medium',
    confidence: 0.87,
    rationale: 'Coordinated misogynistic defamation campaign with sexual slurs and call for amplification.',
    highlighted_phrases: JSON.stringify(['Let the whole city know']),
    advice: 'Report to platform. Document and preserve evidence for defamation case.',
    is_conversational: false,
  },
];

async function seedDatabase() {
  console.log('🌱 Starting SafeNet.ai database seed...\n');

  await initializeDatabase();
  console.log('✅ Tables initialized');

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await query(`
    INSERT INTO admins (username, password_hash, email)
    VALUES ($1, $2, $3)
    ON CONFLICT (username) DO UPDATE 
    SET password_hash = $2, email = $3
  `, [ADMIN_USERNAME, passwordHash, ADMIN_EMAIL]);

  console.log('\n👤 Admin user upserted:');
  console.log('   Username: ' + ADMIN_USERNAME);
  console.log('   Password: ' + ADMIN_PASSWORD);
  console.log('   Email:    ' + ADMIN_EMAIL);

  const existing = await query('SELECT COUNT(*) as count FROM reports');
  const count = parseInt(existing.rows[0].count);
  console.log('\n📊 Current reports in DB: ' + count);

  if (count < 8) {
    console.log('📥 Inserting seed reports...');
    let inserted = 0;

    for (const report of SEED_REPORTS) {
      const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      try {
        await query(`
          INSERT INTO reports (
            id, created_at, expires_at, platform_id, language,
            extracted_text, category, severity, risk_level,
            confidence, rationale, highlighted_phrases, advice, is_conversational, anonymous
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,true)
          ON CONFLICT (id) DO NOTHING
        `, [
          report.id, createdAt, expiresAt, report.platform_id, report.language,
          report.extracted_text, report.category, report.severity, report.risk_level,
          report.confidence, report.rationale, report.highlighted_phrases,
          report.advice, report.is_conversational
        ]);
        inserted++;
        console.log('   ✅ [' + report.category.toUpperCase() + '] ' + report.language.toUpperCase() + ' — ' + report.platform_id);
      } catch (e: any) {
        console.log('   ⚠️  Skipped: ' + e.message.slice(0, 60));
      }
    }

    console.log('\n✅ Inserted ' + inserted + ' sample reports');
  } else {
    console.log('ℹ️  Reports already seeded — skipping');
  }

  console.log('\n🎉 Seed complete!');
  console.log('   Admin login: http://localhost:3000/admin/login');
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
