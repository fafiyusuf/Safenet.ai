import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

interface Report {
  id: string;
  created_at: string;
  platform_id: string;
  language: string;
  extracted_text: string;
  category: string;
  severity: number;
  risk_level: string;
  confidence: number;
  rationale: string;
  highlighted_phrases: string[];
  file_hash?: string;
}

const setupFonts = (doc: PDFKit.PDFDocument): boolean => {
  const possiblePaths = [
    path.join(process.cwd(), 'fonts'),
    path.join(__dirname, '../../fonts'),
    path.join(__dirname, '../fonts')
  ];

  for (const base of possiblePaths) {
    const regular = path.join(base, 'NotoSansEthiopic-Regular.ttf');
    const bold = path.join(base, 'NotoSansEthiopic-Bold.ttf');
    if (fs.existsSync(regular) && fs.existsSync(bold)) {
      doc.registerFont('Ethiopic', regular);
      doc.registerFont('Ethiopic-Bold', bold);
      return true;
    }
  }
  return false;
};

export const generateEvidencePDF = (report: Report): PassThrough => {
  const doc = new PDFDocument({ margin: 50, bufferPages: true });
  const stream = new PassThrough();
  doc.pipe(stream);

  const hasEthiopicFont = setupFonts(doc);
  const isEthiopicScript = ['am', 'ti'].includes(report.language) || /[\u1200-\u137F]/.test(report.extracted_text);

  // Set default body font
  if (hasEthiopicFont && isEthiopicScript) {
    doc.font('Ethiopic');
  } else {
    doc.font('Helvetica');
  }

  // Header Banner
  doc.rect(50, 40, 512, 4).fill('#047857');
  doc.moveDown(1.5);

  // Title
  if (hasEthiopicFont) doc.font('Ethiopic-Bold');
  else doc.font('Helvetica-Bold');
  doc.fillColor('#0f172a').fontSize(18).text('DIGITAL EVIDENCE DOCUMENTATION', { align: 'center' });
  
  if (hasEthiopicFont) doc.font('Ethiopic');
  else doc.font('Helvetica');
  doc.fillColor('#047857').fontSize(11).text('SafeNet.ai — Cryptographic Tamper-Evident Record', { align: 'center' });
  doc.moveDown(1.5);

  const langLabels: Record<string, string> = {
    en: 'English',
    am: 'Amharic (አማርኛ)',
    om: 'Afaan Oromoo',
    ti: 'Tigrinya (ትግርኛ)',
    so: 'Somali (Soomaali)',
  };

  // Metadata Card
  doc.roundedRect(50, doc.y, 512, 90, 6).fillAndStroke('#f8fafc', '#e2e8f0');
  const metaY = doc.y + 12;
  doc.fillColor('#334155').fontSize(10);
  doc.text(`Report ID: ${report.id}`, 65, metaY);
  doc.text(`Timestamp: ${new Date(report.created_at).toUTCString()}`, 65, metaY + 16);
  doc.text(`Platform: ${report.platform_id.toUpperCase()}`, 65, metaY + 32);
  doc.text(`Language: ${langLabels[report.language] || report.language}`, 65, metaY + 48);
  if (report.file_hash) {
    doc.fillColor('#047857').text(`SHA-256 Hash: ${report.file_hash}`, 65, metaY + 64);
  }
  doc.y = metaY + 90;
  doc.moveDown(1.5);

  // Classification Results
  if (hasEthiopicFont) doc.font('Ethiopic-Bold');
  else doc.font('Helvetica-Bold');
  doc.fillColor('#0f172a').fontSize(13).text('CLASSIFICATION ASSESSMENT');
  doc.moveDown(0.4);

  if (hasEthiopicFont) doc.font('Ethiopic');
  else doc.font('Helvetica');
  doc.fillColor('#334155').fontSize(10);
  doc.text(`Category: ${report.category.replace(/_/g, ' ').toUpperCase()}`);
  doc.text(`Severity Score: ${report.severity}/100`);
  doc.text(`Risk Level: ${report.risk_level.toUpperCase()}`);
  doc.text(`Confidence Rating: ${(report.confidence * 100).toFixed(1)}%`);
  doc.moveDown(1.2);

  // Analysis Rationale
  if (hasEthiopicFont) doc.font('Ethiopic-Bold');
  else doc.font('Helvetica-Bold');
  doc.fillColor('#0f172a').fontSize(13).text('ANALYSIS RATIONALE');
  doc.moveDown(0.4);

  if (hasEthiopicFont && isEthiopicScript) doc.font('Ethiopic');
  else doc.font('Helvetica');
  doc.fillColor('#334155').fontSize(10).text(report.rationale || 'No rationale provided.', { align: 'justify' });
  doc.moveDown(1.2);

  // Flagged Phrases
  if (report.highlighted_phrases && report.highlighted_phrases.length > 0) {
    if (hasEthiopicFont) doc.font('Ethiopic-Bold');
    else doc.font('Helvetica-Bold');
    doc.fillColor('#b91c1c').fontSize(12).text('FLAGGED PHRASES / INDICATORS');
    doc.moveDown(0.3);

    if (hasEthiopicFont && isEthiopicScript) doc.font('Ethiopic');
    else doc.font('Helvetica');
    doc.fillColor('#334155').fontSize(10);
    report.highlighted_phrases.forEach(phrase => {
      doc.text(`• ${phrase}`);
    });
    doc.moveDown(1.2);
  }

  // Extracted Evidence Content
  if (hasEthiopicFont) doc.font('Ethiopic-Bold');
  else doc.font('Helvetica-Bold');
  doc.fillColor('#0f172a').fontSize(13).text('EXTRACTED EVIDENCE CONTENT');
  doc.moveDown(0.4);

  doc.rect(50, doc.y, 512, 12).fill('#f1f5f9');
  doc.y += 4;

  if (hasEthiopicFont && isEthiopicScript) doc.font('Ethiopic');
  else doc.font('Helvetica');
  doc.fillColor('#1e293b').fontSize(9).text(report.extracted_text.substring(0, 3000), { align: 'justify' });
  doc.moveDown(2);

  // Chain of custody notice
  doc.roundedRect(50, doc.y, 512, 45, 4).fillAndStroke('#ecfdf5', '#a7f3d0');
  const footerBoxY = doc.y + 8;
  doc.fillColor('#065f46').fontSize(8);
  doc.text('CHAIN OF CUSTODY NOTICE: This forensic record is generated automatically by SafeNet.ai with SHA-256 cryptographic hashing to maintain evidence integrity under Ethiopian cyber law (Proclamation No. 958/2016).', 60, footerBoxY, { width: 492, align: 'center' });
  doc.text(`Generated on ${new Date().toISOString()}`, 60, footerBoxY + 22, { align: 'center' });

  doc.end();
  return stream;
};

export const generateComplaintPDF = (report: Report, language: string = 'en'): PassThrough => {
  const doc = new PDFDocument({ margin: 50, bufferPages: true });
  const stream = new PassThrough();
  doc.pipe(stream);

  const hasEthiopicFont = setupFonts(doc);

  if (language === 'am' && hasEthiopicFont) {
    // Amharic Complaint
    doc.font('Ethiopic');
    doc.rect(50, 40, 512, 4).fill('#047857');
    doc.moveDown(1.5);

    doc.font('Ethiopic-Bold').fontSize(18).fillColor('#0f172a').text('የወንጀል ቅሬታ ማመልከቻ', { align: 'center' });
    doc.font('Ethiopic').fontSize(11).fillColor('#047857').text('በቴክኖሎጂ የተደገፈ የጾታ ጥቃት (TFGBV) ሪፖርት', { align: 'center' });
    doc.moveDown(1.5);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ለ: የፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል');
    doc.font('Ethiopic').fontSize(10).fillColor('#475569').text('አዲስ አበባ፣ ኢትዮጵያ');
    doc.moveDown(1);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('የክስተት ዝርዝር');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(10).fillColor('#334155');
    doc.text(`ቀን: ${new Date(report.created_at).toLocaleDateString()}`);
    doc.text(`መድረክ: ${report.platform_id.toUpperCase()}`);
    doc.text(`የጥቃት ዓይነት: ${report.category}`);
    doc.text(`የስጋት ደረጃ: ${report.risk_level === 'high' ? 'ከፍተኛ' : report.risk_level === 'medium' ? 'መካከለኛ' : 'ዝቅተኛ'}`);
    doc.moveDown(1);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ተፈጻሚ የኢትዮጵያ ህጎች');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(10).fillColor('#334155');
    doc.text('• የኮምፒውተር ወንጀል አዋጅ ቁጥር 958/2008');
    doc.text('  - አንቀጽ 13: በኮምፒውተር ስርዓት ማስፈራራት (እስከ 3 ዓመት እስራት)');
    doc.text('  - አንቀጽ 14: አስነዋሪ ይዘት ማሰራጨት (እስከ 5 ዓመት እስራት)');
    doc.text('• የጥላቻ ንግግርና የውሸት መረጃ መከላከል አዋጅ ቁጥር 1185/2012');
    doc.moveDown(1);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('የማስረጃ ይዘት ማጠቃለያ');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(9).fillColor('#1e293b');
    doc.text(report.extracted_text.substring(0, 1800), { align: 'justify' });
    doc.moveDown(1.5);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('የማስገባት ቦታዎች');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(10).fillColor('#334155');
    doc.text('1. የፌዴራል ፖሊስ የሳይበር ወንጀል ክፍል | ስልክ: +251-111-572355 / 991');
    doc.text('2. የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር | ስልክ: +251-111-515179 / 7711');
    doc.moveDown(2);

    doc.font('Ethiopic').fontSize(8).fillColor('#64748b').text(`ይህ ሰነድ በSafeNet.ai አማካኝነት የተዘጋጀ ነው | ${new Date().toISOString()}`, { align: 'center' });
  } else if (language === 'ti' && hasEthiopicFont) {
    // Tigrinya Complaint
    doc.font('Ethiopic');
    doc.rect(50, 40, 512, 4).fill('#047857');
    doc.moveDown(1.5);

    doc.font('Ethiopic-Bold').fontSize(18).fillColor('#0f172a').text('ናይ ገበን ጥርዓን ማመልከቻ', { align: 'center' });
    doc.font('Ethiopic').fontSize(11).fillColor('#047857').text('ብቴክኖሎጂ ዝተደገፈ መጥቃዕቲ ጾታ (TFGBV) ጸብጻብ', { align: 'center' });
    doc.moveDown(1.5);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ን: ፌደራል ፖሊስ ክፍሊ መርመራ ሳይበር ወንጀል');
    doc.font('Ethiopic').fontSize(10).fillColor('#475569').text('ኣዲስ ኣበባ፡ ኢትዮጵያ');
    doc.moveDown(1);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ዝርዝር ፍጻመ');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(10).fillColor('#334155');
    doc.text(`ዕለት: ${new Date(report.created_at).toLocaleDateString()}`);
    doc.text(`መድረኽ: ${report.platform_id.toUpperCase()}`);
    doc.text(`ዓይነት መጥቃዕቲ: ${report.category}`);
    doc.text(`ደረጃ ሓደጋ: ${report.risk_level === 'high' ? 'ላዕለዋይ' : report.risk_level === 'medium' ? 'ማእከላይ' : 'ትሑት'}`);
    doc.moveDown(1);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ተፈጸምቲ ሕግታት ኢትዮጵያ');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(10).fillColor('#334155');
    doc.text('• ኣዋጅ ኮምፒውተር ወንጀል ቍጽሪ 958/2008');
    doc.text('  - ዓንቀጽ 13: ብኮምፒውተር ስርዓት ምፍርራህ (ክሳብ 3 ዓመት ማእሰርቲ)');
    doc.text('  - ዓንቀጽ 14: ዜሕፍር ትሕዝቶ ምዝርጋሕ (ክሳብ 5 ዓመት ማእሰርቲ)');
    doc.text('• ኣዋጅ ምክልኻል ዘረባ ጽልእን ሓሶት ሓበሬታን ቍጽሪ 1185/2012');
    doc.moveDown(1);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ጽማቕ ትሕዝቶ መረዳእታ');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(9).fillColor('#1e293b');
    doc.text(report.extracted_text.substring(0, 1800), { align: 'justify' });
    doc.moveDown(1.5);

    doc.font('Ethiopic-Bold').fontSize(12).fillColor('#0f172a').text('ኣድራሻታት ሓበሬታን ምምልካትን');
    doc.moveDown(0.4);
    doc.font('Ethiopic').fontSize(10).fillColor('#334155');
    doc.text('1. ፌደራል ፖሊስ ክፍሊ ሳይበር ወንጀል | ስልኪ: +251-111-572355 / 991');
    doc.text('2. ሚኒስትሪ ደቂ ኣንስትዮን ማሕበራዊ ጉዳይን | ስልኪ: +251-111-515179 / 7711');
    doc.moveDown(2);

    doc.font('Ethiopic').fontSize(8).fillColor('#64748b').text(`እዚ ሰነድ ብSafeNet.ai ዝተዳለወ እዩ | ${new Date().toISOString()}`, { align: 'center' });
  } else if (language === 'om') {
    // Afaan Oromoo Complaint
    doc.font('Helvetica');
    doc.rect(50, 40, 512, 4).fill('#047857');
    doc.moveDown(1.5);

    doc.font('Helvetica-Bold').fontSize(18).fillColor('#0f172a').text('IYYANNOO YAKKA SAALAAFI SAAYIBARII', { align: 'center' });
    doc.font('Helvetica').fontSize(11).fillColor('#047857').text('Miidhaa Koorniyaa Teknooloojiitiin Deeggarame (TFGBV)', { align: 'center' });
    doc.moveDown(1.5);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('GARA: Poolisii Federaalaa Damee Qorannoo Yakka Saayibarii');
    doc.font('Helvetica').fontSize(10).fillColor('#475569').text('Finfinnee, Itoophiyaa');
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('BAL\'INA MIIDHAA');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text(`Guyyaa: ${new Date(report.created_at).toLocaleDateString()}`);
    doc.text(`Waltajjii: ${report.platform_id.toUpperCase()}`);
    doc.text(`Gosa Miidhaa: ${report.category}`);
    doc.text(`Sadarkaa Soddaa: ${report.risk_level.toUpperCase()}`);
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('SEEROTA ITOOPHIYAA REEFERANSII');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text('• Labsii Yakka Kompiitaraa Lakkoofsa 958/2008');
    doc.text('  - Keeyyata 13: Sirna Kompiitaraatiin Sodaachisuu (Hanga waggaa 3 hidhaa)');
    doc.text('  - Keeyyata 14: Qabiyyee Qaanfachiisaa Facaasuu (Hanga waggaa 5 hidhaa)');
    doc.text('• Labsii Ittisa Haasaa Jibbiinsaa fi Oduu Sobaa Lakkoofsa 1185/2012');
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('CUUNFAA RAGAA');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text(`Xiinxala: ${report.rationale}`);
    doc.moveDown(0.4);

    if (hasEthiopicFont && /[\u1200-\u137F]/.test(report.extracted_text)) {
      doc.font('Ethiopic');
    }
    doc.fontSize(9).fillColor('#1e293b').text(report.extracted_text.substring(0, 1800), { align: 'justify' });
    doc.moveDown(1.5);

    if (hasEthiopicFont) doc.font('Ethiopic-Bold');
    else doc.font('Helvetica-Bold');
    doc.fillColor('#0f172a').fontSize(12).text('QUUNNAMTII ARIFACHIISAA');
    doc.moveDown(0.4);

    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text('1. Poolisii Federaalaa Damee Saayibarii | Finfinnee | +251-111-572355 / 991');
    doc.text('2. Ministeera Dhimma Dubartootaa fi Hawaasummaa | +251-111-515179 / 7711');
    doc.text('3. EWLA (Dhaabbata Abbootii Seeraa Dubartootaa) | +251-111-553777');
    doc.moveDown(2);

    doc.fontSize(8).fillColor('#64748b').text(`Galmee Seeraa SafeNet.ai tiin qophaa'e | Gabaasa ${report.id}`, { align: 'center' });
  } else if (language === 'so') {
    // Somali Complaint
    doc.font('Helvetica');
    doc.rect(50, 40, 512, 4).fill('#047857');
    doc.moveDown(1.5);

    doc.font('Helvetica-Bold').fontSize(18).fillColor('#0f172a').text('CODSIGA DACWADA DAMBIYADA DIGITAL-KA', { align: 'center' });
    doc.font('Helvetica').fontSize(11).fillColor('#047857').text('Xadgudubka Jinsiga ee Tiknoolojiyadda Fududaysay (TFGBV)', { align: 'center' });
    doc.moveDown(1.5);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('KU: Qaybta Baarista Dambiyada Internetka ee Booliska Federaalka');
    doc.font('Helvetica').fontSize(10).fillColor('#475569').text('Addis Ababa, Itoobiya');
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('FAAHFAAHTA DHACDADA');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text(`Taariikhda: ${new Date(report.created_at).toLocaleDateString()}`);
    doc.text(`Madasha: ${report.platform_id.toUpperCase()}`);
    doc.text(`Nooca Xadgudubka: ${report.category}`);
    doc.text(`Heerka Halista: ${report.risk_level.toUpperCase()}`);
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('SHURUUCDA DASTUURIGA AH EE ITOOBIYA');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text('• Sharciga Dambiyada Kombiyuutarka Lambar 958/2016');
    doc.text('  - Qodobka 13: Cabsigelin iyadoo la adeegsanayo Kombiyuutar (ilaa 3 sano oo xabsi ah)');
    doc.text('  - Qodobka 14: Faafinta Nuxurka Anshaxxumada ah (ilaa 5 sano oo xabsi ah)');
    doc.text('• Sharciga Ka Hortagga Hadallada Nacaybka Lambar 1185/2020');
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('SOO KOOBIDDA CADDEYMAHA');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text(`Falanqaynta: ${report.rationale}`);
    doc.moveDown(0.4);

    if (hasEthiopicFont && /[\u1200-\u137F]/.test(report.extracted_text)) {
      doc.font('Ethiopic');
    }
    doc.fontSize(9).fillColor('#1e293b').text(report.extracted_text.substring(0, 1800), { align: 'justify' });
    doc.moveDown(1.5);

    if (hasEthiopicFont) doc.font('Ethiopic-Bold');
    else doc.font('Helvetica-Bold');
    doc.fillColor('#0f172a').fontSize(12).text('LAMBARADA DEGDEGGA AH EE XIRIIRKA');
    doc.moveDown(0.4);

    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text('1. Qaybta Cyber Crime ee Booliska Federaalka | +251-111-572355 / 991');
    doc.text('2. Wasaaradda Haweenka iyo Arrimaha Bulshada | +251-111-515179 / 7711');
    doc.text('3. Ururka Qareennada Haweenka Itoobiya (EWLA) | +251-111-553777');
    doc.moveDown(2);

    doc.fontSize(8).fillColor('#64748b').text(`Dukumentiga waxaa si toos ah u soo saaray SafeNet.ai | Warbixinta ${report.id}`, { align: 'center' });
  } else {
    // English Complaint
    doc.font('Helvetica');

    doc.rect(50, 40, 512, 4).fill('#047857');
    doc.moveDown(1.5);

    doc.font('Helvetica-Bold').fontSize(18).fillColor('#0f172a').text('FORMAL CRIMINAL COMPLAINT', { align: 'center' });
    doc.font('Helvetica').fontSize(11).fillColor('#047857').text('Technology-Facilitated Gender-Based Violence (TFGBV)', { align: 'center' });
    doc.moveDown(1.5);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('TO: Federal Police Cyber Crime Investigation Unit');
    doc.font('Helvetica').fontSize(10).fillColor('#475569').text('Federal Democratic Republic of Ethiopia, Addis Ababa');
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('INCIDENT DETAILS');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text(`Date of Incident: ${new Date(report.created_at).toLocaleDateString()}`);
    doc.text(`Platform/Medium: ${report.platform_id.toUpperCase()}`);
    doc.text(`Category of Abuse: ${report.category.replace(/_/g, ' ').toUpperCase()}`);
    doc.text(`Assessed Risk Level: ${report.risk_level.toUpperCase()}`);
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('APPLICABLE ETHIOPIAN LAWS');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text('• Computer Crime Proclamation No. 958/2016');
    doc.text('  - Article 13: Criminal Intimidation using Computer System');
    doc.text('  - Article 14: Dissemination of Obscene Content');
    doc.text('• Hate Speech & Disinformation Prevention Proclamation No. 1185/2020');
    doc.text('• The Criminal Code of the Federal Democratic Republic of Ethiopia (2004)');
    doc.moveDown(1);

    doc.font('Helvetica-Bold').fontSize(12).fillColor('#0f172a').text('EVIDENCE & ANALYSIS SUMMARY');
    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(10).fillColor('#334155');
    doc.text(`Analysis: ${report.rationale}`);
    doc.moveDown(0.4);

    if (hasEthiopicFont && /[\u1200-\u137F]/.test(report.extracted_text)) {
      doc.font('Ethiopic');
    }
    doc.fontSize(9).fillColor('#1e293b').text(report.extracted_text.substring(0, 1800), { align: 'justify' });
    doc.moveDown(1.5);

    if (hasEthiopicFont) doc.font('Ethiopic-Bold');
    else doc.font('Helvetica-Bold');
    doc.fillColor('#0f172a').fontSize(12).text('FILING & EMERGENCY CONTACTS');
    doc.moveDown(0.4);

    if (hasEthiopicFont) doc.font('Ethiopic');
    else doc.font('Helvetica');
    doc.fillColor('#334155').fontSize(10);
    doc.text('1. Federal Police Cyber Crime Investigation Unit | Addis Ababa | +251-111-572355 / 991');
    doc.text('2. Ministry of Women and Social Affairs (MoWSA) | Addis Ababa | +251-111-515179 / 7711');
    doc.text('3. EWLA (Ethiopian Women Lawyers Association) Legal Aid | +251-111-553777');
    doc.moveDown(2);

    doc.fontSize(8).fillColor('#64748b').text(`Automated Legal Documentation generated by SafeNet.ai | Report ${report.id}`, { align: 'center' });
  }

  doc.end();
  return stream;
};
