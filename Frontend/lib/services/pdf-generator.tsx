import type { Report } from "../types"
import { PLATFORMS } from "../constants"

const categoryLabels: Record<string, { en: string; am: string }> = {
  harassment: { en: "Harassment", am: "ትንኮሳ" },
  threats: { en: "Threats", am: "ማስፈራሪያ" },
  stalking: { en: "Stalking", am: "ማሳደድ" },
  image_based_abuse: { en: "Image-Based Abuse", am: "በምስል ላይ የተመሰረተ ጥቃት" },
  hate_speech: { en: "Hate Speech", am: "የጥላቻ ንግግር" },
  sexual_content: { en: "Sexual Content", am: "ወሲባዊ ይዘት" },
  non_abusive: { en: "Non-Abusive", am: "ጥቃት ያልሆነ" },
}

export function generateEvidencePDF(report: Report): string {
  const platform = PLATFORMS.find((p) => p.id === report.platform_id)?.name || report.platform_id

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Evidence Document - ${report.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', system-ui, sans-serif; 
      line-height: 1.6; 
      color: #1e293b;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header { 
      border-bottom: 3px solid #0d9488; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    .header h1 { 
      color: #0d9488; 
      font-size: 24px;
      margin-bottom: 8px;
    }
    .header p { color: #64748b; font-size: 14px; }
    .section { margin-bottom: 24px; }
    .section-title { 
      font-size: 16px; 
      font-weight: 600; 
      color: #0f172a;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-grid { display: grid; grid-template-columns: 140px 1fr; gap: 8px 16px; }
    .info-label { color: #64748b; font-size: 14px; }
    .info-value { font-size: 14px; }
    .content-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      font-family: monospace;
      font-size: 13px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .hash-box {
      background: #fef3c7;
      border: 1px solid #fcd34d;
      border-radius: 8px;
      padding: 12px 16px;
      font-family: monospace;
      font-size: 12px;
      word-break: break-all;
    }
    .risk-high { color: #dc2626; font-weight: 600; }
    .risk-medium { color: #d97706; font-weight: 600; }
    .risk-low { color: #16a34a; font-weight: 600; }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
    .warning {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      font-size: 13px;
      color: #991b1b;
    }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SAFENET.AI - EVIDENCE DOCUMENT</h1>
    <p>Report ID: ${report.id}</p>
    <p>Generated: ${new Date().toISOString()}</p>
  </div>

  <div class="warning">
    <strong>CONFIDENTIAL:</strong> This document contains evidence of potential online abuse and may include disturbing content.
  </div>

  <div class="section">
    <h2 class="section-title">Report Information</h2>
    <div class="info-grid">
      <span class="info-label">Report ID:</span>
      <span class="info-value">${report.id}</span>
      
      <span class="info-label">Created:</span>
      <span class="info-value">${new Date(report.created_at).toLocaleString()}</span>
      
      <span class="info-label">Platform:</span>
      <span class="info-value">${platform}</span>
      
      <span class="info-label">Language:</span>
      <span class="info-value">${report.language === "am" ? "Amharic" : "English"}</span>
      
      <span class="info-label">Expires:</span>
      <span class="info-value">${new Date(report.expires_at).toLocaleString()}</span>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">AI Classification Results</h2>
    <div class="info-grid">
      <span class="info-label">Category:</span>
      <span class="info-value">${categoryLabels[report.category]?.en || report.category}</span>
      
      <span class="info-label">Severity:</span>
      <span class="info-value">${report.severity}/100</span>
      
      <span class="info-label">Risk Level:</span>
      <span class="info-value risk-${report.risk_level}">${report.risk_level.toUpperCase()}</span>
      
      <span class="info-label">Confidence:</span>
      <span class="info-value">${(report.confidence * 100).toFixed(1)}%</span>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Analysis Rationale</h2>
    <p>${report.rationale}</p>
  </div>

  ${
    report.highlighted_phrases.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Flagged Phrases</h2>
    <ul>
      ${report.highlighted_phrases.map((phrase) => `<li>${phrase}</li>`).join("")}
    </ul>
  </div>
  `
      : ""
  }

  <div class="section">
    <h2 class="section-title">Extracted Content</h2>
    <div class="content-box">${report.extracted_text}</div>
  </div>

  ${
    report.file_hash
      ? `
  <div class="section">
    <h2 class="section-title">File Integrity</h2>
    <div class="hash-box">
      <strong>SHA-256 Hash:</strong><br>
      ${report.file_hash}
    </div>
    <p style="margin-top: 8px; font-size: 12px; color: #64748b;">
      This hash can be used to verify the original file has not been modified.
    </p>
  </div>
  `
      : ""
  }

  <div class="footer">
    <p><strong>Chain of Custody Notice:</strong></p>
    <p>This document was automatically generated by Safenet.ai and contains a tamper-evident record of the reported content. The SHA-256 hash (if present) provides cryptographic verification of file integrity. This evidence package is intended for use in legal proceedings and support services.</p>
    <p style="margin-top: 12px;">Document generated at ${new Date().toISOString()}</p>
  </div>
</body>
</html>`
}

export function generateComplaintPDF(report: Report, language: "en" | "am" = "en"): string {
  const platform = PLATFORMS.find((p) => p.id === report.platform_id)?.name || report.platform_id
  const category = categoryLabels[report.category]?.[language] || report.category

  if (language === "am") {
    return generateAmharicComplaint(report, platform, category)
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legal Complaint - ${report.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Times New Roman', serif; 
      line-height: 1.8; 
      color: #1e293b;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      font-size: 14px;
    }
    .header { 
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 { 
      font-size: 18px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .header p { font-size: 14px; }
    .section { margin-bottom: 24px; }
    .section-title { 
      font-size: 14px; 
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .form-field {
      border-bottom: 1px solid #64748b;
      padding: 4px 0;
      margin-bottom: 16px;
    }
    .form-label {
      font-size: 12px;
      color: #64748b;
      display: block;
      margin-bottom: 4px;
    }
    .indent { margin-left: 24px; }
    .legal-ref {
      background: #f8fafc;
      border-left: 3px solid #0d9488;
      padding: 12px 16px;
      margin: 16px 0;
      font-size: 13px;
    }
    .signature-block {
      margin-top: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .signature-line {
      border-top: 1px solid #1e293b;
      padding-top: 8px;
      font-size: 12px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #64748b;
    }
    @media print {
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Formal Complaint of Technology-Facilitated Violence</h1>
    <p>Submitted to the Federal Democratic Republic of Ethiopia</p>
    <p>Ministry of Women and Social Affairs / Ethiopian Police Cyber Crime Unit</p>
  </div>

  <div class="section">
    <div class="section-title">I. Complainant Information</div>
    <div class="form-field">
      <span class="form-label">Full Name</span>
      <span>_______________________________________</span>
    </div>
    <div class="form-field">
      <span class="form-label">Address</span>
      <span>_______________________________________</span>
    </div>
    <div class="form-field">
      <span class="form-label">Phone Number</span>
      <span>_______________________________________</span>
    </div>
    <div class="form-field">
      <span class="form-label">Email (optional)</span>
      <span>_______________________________________</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">II. Incident Details</div>
    <p><strong>Date of Incident:</strong> ${new Date(report.created_at).toLocaleDateString()}</p>
    <p><strong>Platform/Medium:</strong> ${platform}</p>
    <p><strong>Type of Abuse:</strong> ${category}</p>
    <p><strong>Severity Assessment:</strong> ${report.severity}/100 (${report.risk_level.toUpperCase()} RISK)</p>
    
    <p style="margin-top: 16px;"><strong>Description of Incident:</strong></p>
    <p class="indent">
      On the above date, I was subjected to ${category.toLowerCase()} through the ${platform} platform. 
      The AI analysis determined this incident to be of ${report.risk_level} risk with a severity score of ${report.severity}/100.
      ${report.rationale}
    </p>
  </div>

  <div class="section">
    <div class="section-title">III. Evidence Reference</div>
    <p><strong>Report ID:</strong> ${report.id}</p>
    ${report.file_hash ? `<p><strong>File Hash (SHA-256):</strong> ${report.file_hash}</p>` : ""}
    <p><strong>Evidence Document:</strong> Attached separately</p>
  </div>

  <div class="section">
    <div class="section-title">IV. Applicable Laws</div>
    
    <div class="legal-ref">
      <strong>Computer Crime Proclamation No. 958/2016</strong><br>
      Article 13: Criminal intimidation using computer system - Up to 3 years imprisonment<br>
      Article 14: Dissemination of obscene content - Up to 5 years imprisonment<br>
      Article 16: Online defamation - Up to 2 years imprisonment
    </div>

    <div class="legal-ref">
      <strong>Hate Speech and Disinformation Prevention Proclamation No. 1185/2020</strong><br>
      Article 5: Prohibition of hate speech - Up to 3 years imprisonment<br>
      Article 6: Prohibition of disinformation - Up to 2 years imprisonment
    </div>

    <div class="legal-ref">
      <strong>Criminal Code of Ethiopia (2004)</strong><br>
      Article 613: Intimidation - Up to 3 years imprisonment<br>
      Article 620: Defamation - Up to 1 year imprisonment
    </div>
  </div>

  <div class="section">
    <div class="section-title">V. Request for Action</div>
    <p>I respectfully request that the appropriate authorities:</p>
    <ol class="indent" style="margin-top: 8px;">
      <li>Investigate this incident of technology-facilitated violence</li>
      <li>Identify and locate the perpetrator(s)</li>
      <li>Take appropriate legal action under the applicable laws</li>
      <li>Provide protection measures if deemed necessary</li>
    </ol>
  </div>

  <div class="section">
    <div class="section-title">VI. Filing Instructions</div>
    <p>This complaint may be filed at:</p>
    <ul class="indent" style="margin-top: 8px;">
      <li><strong>Federal Police Cyber Crime Investigation Unit</strong> - For criminal investigation</li>
      <li><strong>Ministry of Women and Social Affairs</strong> - For support services and referrals</li>
      <li><strong>Local Woreda Administration</strong> - For community-level intervention</li>
      <li><strong>Ethiopian Human Rights Commission</strong> - For human rights violations</li>
    </ul>
  </div>

  <div class="signature-block">
    <div>
      <div class="signature-line">Complainant Signature</div>
    </div>
    <div>
      <div class="signature-line">Date</div>
    </div>
  </div>

  <div class="footer">
    <p>This complaint template was generated by Safenet.ai based on automated analysis of reported content.</p>
    <p>Report ID: ${report.id} | Generated: ${new Date().toISOString()}</p>
  </div>
</body>
</html>`
}

function generateAmharicComplaint(report: Report, platform: string, category: string): string {
  return `<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>የህግ ቅሬታ - ${report.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Nyala', 'Abyssinica SIL', serif; 
      line-height: 2; 
      color: #1e293b;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      font-size: 14px;
    }
    .header { 
      text-align: center;
      margin-bottom: 40px;
    }
    .header h1 { 
      font-size: 20px;
      margin-bottom: 8px;
    }
    .section { margin-bottom: 24px; }
    .section-title { 
      font-size: 16px; 
      font-weight: bold;
      margin-bottom: 12px;
    }
    .form-field {
      border-bottom: 1px solid #64748b;
      padding: 4px 0;
      margin-bottom: 16px;
    }
    .form-label {
      font-size: 12px;
      color: #64748b;
      display: block;
      margin-bottom: 4px;
    }
    .indent { margin-right: 24px; }
    .legal-ref {
      background: #f8fafc;
      border-right: 3px solid #0d9488;
      padding: 12px 16px;
      margin: 16px 0;
      font-size: 13px;
    }
    .signature-block {
      margin-top: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
    .signature-line {
      border-top: 1px solid #1e293b;
      padding-top: 8px;
      font-size: 12px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>በቴክኖሎጂ የተደገፈ ጥቃት መደበኛ ቅሬታ</h1>
    <p>ለኢትዮጵያ ፌዴራላዊ ዴሞክራሲያዊ ሪፐብሊክ</p>
    <p>የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር / የኢትዮጵያ ፖሊስ የሳይበር ወንጀል ክፍል</p>
  </div>

  <div class="section">
    <div class="section-title">I. የአመልካች መረጃ</div>
    <div class="form-field">
      <span class="form-label">ሙሉ ስም</span>
      <span>_______________________________________</span>
    </div>
    <div class="form-field">
      <span class="form-label">አድራሻ</span>
      <span>_______________________________________</span>
    </div>
    <div class="form-field">
      <span class="form-label">ስልክ ቁጥር</span>
      <span>_______________________________________</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">II. የክስተት ዝርዝሮች</div>
    <p><strong>የክስተት ቀን:</strong> ${new Date(report.created_at).toLocaleDateString()}</p>
    <p><strong>መድረክ:</strong> ${platform}</p>
    <p><strong>የጥቃት አይነት:</strong> ${category}</p>
    <p><strong>የክብደት ግምገማ:</strong> ${report.severity}/100 (${report.risk_level === "high" ? "ከፍተኛ" : report.risk_level === "medium" ? "መካከለኛ" : "ዝቅተኛ"} አደጋ)</p>
  </div>

  <div class="section">
    <div class="section-title">III. ተፈጻሚ ህጎች</div>
    
    <div class="legal-ref">
      <strong>የኮምፒውተር ወንጀል አዋጅ ቁጥር 958/2008</strong><br>
      አንቀጽ 13: በኮምፒውተር ስርዓት ማስፈራራት - እስከ 3 ዓመት እስራት<br>
      አንቀጽ 14: አስነዋሪ ይዘት ማሰራጨት - እስከ 5 ዓመት እስራት
    </div>

    <div class="legal-ref">
      <strong>የጥላቻ ንግግርና የውሸት መረጃ መከላከል አዋጅ ቁጥር 1185/2012</strong><br>
      አንቀጽ 5: የጥላቻ ንግግር ክልከላ - እስከ 3 ዓመት እስራት
    </div>
  </div>

  <div class="section">
    <div class="section-title">IV. የሚጠየቅ እርምጃ</div>
    <p>ተገቢዎቹ ባለስልጣናት የሚከተሉትን እንዲያደርጉ በአክብሮት እጠይቃለሁ:</p>
    <ol class="indent" style="margin-top: 8px;">
      <li>ይህንን የቴክኖሎጂ ጥቃት ክስተት መመርመር</li>
      <li>ወንጀለኛ(ዎች)ን መለየትና ማግኘት</li>
      <li>በተፈጻሚ ህጎች መሰረት ተገቢ የህግ እርምጃ መውሰድ</li>
    </ol>
  </div>

  <div class="signature-block">
    <div>
      <div class="signature-line">የአመልካች ፊርማ</div>
    </div>
    <div>
      <div class="signature-line">ቀን</div>
    </div>
  </div>

  <div class="footer">
    <p>ይህ የቅሬታ ቅጽ በSafenet.ai በራስ-ሰር ትንተና ላይ ተመስርቶ ተዘጋጅቷል።</p>
    <p>የሪፖርት መታወቂያ: ${report.id}</p>
  </div>
</body>
</html>`
}
