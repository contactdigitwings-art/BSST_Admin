import { useMyMember } from "@/hooks/use-members";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, FileText } from "lucide-react";

const today = new Date();
const formattedDate = today.toLocaleDateString("en-IN", {
  year: "numeric", month: "long", day: "numeric",
});
const refNo = `BSST/APT/${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}`;

const LETTER_STYLES = `
  @page { margin: 0; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Times New Roman', Times, serif; background: white; }
  .page {
    width: 210mm; min-height: 297mm;
    padding: 0;
    display: flex; flex-direction: column;
    background: white;
  }
  /* ── TOP HEADER ── */
  .letterhead-top {
    border-bottom: 4px double #1a365d;
    padding: 18px 32px 14px;
    background: #fff;
  }
  .trust-name {
    font-size: 26px; font-weight: 900; letter-spacing: 3px;
    color: #1a365d; text-align: center; text-transform: uppercase;
  }
  .tagline {
    font-size: 11px; font-style: italic; color: #6b7280;
    text-align: center; margin-top: 2px; letter-spacing: 1px;
  }
  .reg-info {
    font-size: 9.5px; color: #374151; text-align: center;
    margin-top: 5px; line-height: 1.6;
  }
  .reg-info strong { color: #1a365d; }
  /* ── BODY ── */
  .body { padding: 24px 40px; flex: 1; }
  .ref-date-row {
    display: flex; justify-content: space-between;
    font-size: 11px; margin-bottom: 18px;
  }
  .doc-title {
    text-align: center; font-size: 16px; font-weight: 900;
    text-transform: uppercase; letter-spacing: 2px;
    text-decoration: underline; margin-bottom: 20px;
    color: #1a365d;
  }
  .salutation { font-size: 12px; margin-bottom: 10px; }
  .body-text { font-size: 12px; line-height: 1.9; text-align: justify; }
  .body-text p { margin-bottom: 14px; }
  .body-text ul { margin: 6px 0 14px 24px; }
  .body-text ul li { margin-bottom: 6px; font-size: 12px; }
  .notice-box {
    border: 1px solid #374151; padding: 10px 16px;
    margin: 16px 0; font-size: 11px; color: #374151;
    background: #f9f9f9;
  }
  .notice-box p { margin-bottom: 4px; }
  .closing { font-size: 12px; margin-top: 20px; line-height: 1.9; }
  .signature-block { margin-top: 36px; font-size: 12px; font-weight: bold; }
  .signature-block p { margin-bottom: 2px; }
  /* ── FOOTER ── */
  .letterhead-footer {
    border-top: 4px double #1a365d;
    padding: 10px 24px 12px;
    font-size: 9px;
    display: grid; grid-template-columns: 2fr 2.5fr 2fr;
    gap: 12px; background: #fff; color: #1f2937;
  }
  .footer-col-title {
    font-weight: 900; text-transform: uppercase;
    font-size: 8.5px; letter-spacing: 0.5px;
    border-bottom: 1px solid #1a365d; margin-bottom: 5px;
    padding-bottom: 2px; color: #1a365d;
  }
  .footer-col p { margin-bottom: 3px; line-height: 1.5; }
  .footer-col a { color: #1a365d; }
`;

function buildLetterHTML(member: any) {
  const detail = member?.detail || "";
  const area = (() => {
    const m = detail.match(/Area:\s*([^|]+)/);
    return m ? m[1].trim() : "Volunteer / Member";
  })();

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Appointment Letter – ${member?.name}</title>
  <style>${LETTER_STYLES}</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="letterhead-top">
    <div class="trust-name">Bharti Sewa Sadan Trust</div>
    <div class="tagline">Work for cause not for applause...</div>
    <div class="reg-info">
      <strong>Trust Registration Number:</strong> 15 &nbsp;|&nbsp;
      (Registered U/t Registration Act 21 of 1882, Government of Bihar)<br/>
      <strong>Trust Darpan Id:</strong> BR/2017/0161719 &nbsp;|&nbsp;
      (A Unit of NITI Aayog, Government of India)
    </div>
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="ref-date-row">
      <span><strong>Ref.:</strong> ${refNo}</span>
      <span><strong>Date:</strong> ${formattedDate}</span>
    </div>

    <div class="doc-title">Job Offer / Appointment Letter</div>

    <p class="salutation"><strong>Mr/Mrs/Ms ${member?.fullName},</strong></p>

    <div class="body-text">
      <p>
        We are pleased to offer you the position of <strong>${member?.position || 'Member'}</strong> at
        <strong>BHARTI SEWA SADAN TRUST</strong>. This refers to your application
        and subsequent review with us. We believe your skills and commitment make
        you an excellent fit and a valuable addition to our organization. We look
        forward to welcoming you to our team.
      </p>

      <p>
        Your appointment will be effective from <strong>${formattedDate}</strong>.
        Your Registration Number is <strong>${member?.regNo}</strong>.
      </p>

      <p>
        As part of your role with <strong>BHARTI SEWA SADAN TRUST</strong>, your key
        responsibilities will be as follows:
      </p>
      <ul>
        <li>Active participation in the Trust's social welfare and outreach programmes.</li>
        <li>Supporting healthcare, education, and community development initiatives.</li>
        <li>Adhering to the Trust's Code of Conduct and Confidentiality Agreement.</li>
        <li>Reporting progress to your designated supervisor on a regular basis.</li>
      </ul>

      <p>
        We congratulate you on your appointment and wish you a long and successful
        journey with us. We are confident that your contribution will take us further
        in our mission towards becoming a world-class social welfare organization. We
        assure you of our full support for your professional development and growth.
      </p>

      <p>
        Please review the enclosed documents, including the Trust Bylaws and any
        applicable agreements, and let us know if you have any questions or concerns.
        To accept this offer, please sign and return a copy of this letter at your
        earliest convenience.
      </p>
    </div>

    <div class="notice-box">
      <p>* Rules as per Trust Bylaws / Committee are applicable.</p>
      <p>* Trust is currently recruiting for free.</p>
      <p># After that we request that you can send a little donation to support our cause.</p>
    </div>

    <div class="closing">
      <p>Thanking you,</p>
      <p>From</p>
      <p><em>Always at your service</em></p>
    </div>

    <div class="signature-block">
      <p style="margin-top:40px">__________________________</p>
      <p>DR RAM NARAYAN BHARTI</p>
      <p>FOUNDER CUM PRESIDENT</p>
      <p>BHARTI SEWA SADAN TRUST</p>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="letterhead-footer">
    <div class="footer-col">
      <div class="footer-col-title">Reg. Address</div>
      <p>Shivpuri, Ward No-9</p>
      <p>P.O. Araria Dist, Araria</p>
      <p>Pin: 854311, Bihar, INDIA</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Contact</div>
      <p>E-mail: bhartisewasadantrsut@gmail.com</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bsstbihar@gmail.com</p>
      <p>Web: www.bsst.org.in</p>
      <p>Mob / WhatsApp: 7782833655 &nbsp;|&nbsp; 8825340183</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Other Registrations</div>
      <p>12A &nbsp;:&nbsp; AACTB3060FE20206</p>
      <p>80G &nbsp;:&nbsp; AACTB3060FF20219</p>
      <p>CSR &nbsp;:&nbsp; CSR00010028</p>
      <p>FCRA:&nbsp; 031050011</p>
      <p>LEI &nbsp;&nbsp;:&nbsp; 984500BE2B82A1D66405</p>
    </div>
  </div>

</div>
</body>
</html>`;
}

export default function AppointmentLetter() {
  const { data: member, isLoading } = useMyMember();

  const handlePrint = () => {
    const html = buildLetterHTML(member);
    const w = window.open("", "_blank", "width=900,height=700");
    if (w) {
      w.document.write(html);
      w.document.close();
      w.onload = () => w.print();
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const area = (() => {
    const detail = member?.projectArea || "";
    return detail || "Volunteer / Member";
  })();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Appointment Letter</h1>
        <p className="text-muted-foreground mt-1">Official appointment letter issued by Bharti Sewa Sadan Trust.</p>
      </div>

      {!member ? (
        <Card className="glass-panel border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No Membership Record</h3>
            <p className="text-slate-500 mt-2">Your appointment letter is only available after membership is verified.</p>
          </CardContent>
        </Card>
      ) : !member.appointmentLetterGenerated ? (
        <Card className="glass-panel border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">Appointment Letter Not Yet Generated</h3>
            <p className="text-slate-500 mt-2">Your appointment letter is pending generation by admin. Please wait for your membership to be verified.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* ── LETTER PREVIEW ── */}
          <Card className="glass-panel border-0 overflow-hidden shadow-xl">
            <CardContent className="p-0 bg-white">
              {/* HEADER */}
              <div className="border-b-2 border-double border-[#1a365d] px-6 py-3 text-center">
                <h2 className="text-lg font-black tracking-widest text-[#1a365d] uppercase">
                  Bharti Sewa Sadan Trust
                </h2>
                <p className="text-[10px] italic text-gray-500 mt-0.5">Work for cause not for applause...</p>
                <p className="text-[10px] text-gray-600 mt-1 leading-snug">
                  <span className="font-semibold">Trust Registration Number:</span> 15 &nbsp;|&nbsp;
                  (Registered U/t Registration Act 21 of 1882, Government of Bihar)
                </p>
                <p className="text-[10px] text-gray-600">
                  <span className="font-semibold">Trust Darpan Id:</span> BR/2017/0161719 &nbsp;|&nbsp;
                  (A Unit of NITI Aayog, Government of India)
                </p>
              </div>

              {/* BODY */}
              <div className="px-8 py-5">
                <div className="flex justify-between text-xs mb-4">
                  <span><strong>Ref.:</strong> {refNo}</span>
                  <span><strong>Date:</strong> {formattedDate}</span>
                </div>

                <h3 className="text-center text-xs font-black uppercase tracking-widest underline text-[#1a365d] mb-4">
                  Job Offer / Appointment Letter
                </h3>

                <p className="font-bold text-xs mb-3">Mr/Mrs/Ms {member.fullName},</p>

                <div className="space-y-2.5 text-[11px] text-gray-800 text-justify leading-relaxed">
                  <p>
                    We are pleased to offer you the position of <strong>{area}</strong> at{" "}
                    <strong>BHARTI SEWA SADAN TRUST</strong>. This refers to your application and
                    subsequent review with us. We believe your skills and commitment make you an
                    excellent fit and a valuable addition to our organization.
                  </p>

                  <p>
                    Your appointment will be effective from <strong>{formattedDate}</strong>.
                    Your Registration Number is <strong>{member.regNo}</strong>.
                  </p>

                  <p>Key responsibilities:</p>
                  <ul className="list-disc list-inside pl-3 space-y-0.5">
                    <li>Active participation in the Trust's social welfare and outreach programmes.</li>
                    <li>Supporting healthcare, education, and community development initiatives.</li>
                    <li>Adhering to the Trust's Code of Conduct and Confidentiality Agreement.</li>
                    <li>Reporting progress to your designated supervisor on a regular basis.</li>
                  </ul>

                  <p>
                    We congratulate you on your appointment and wish you a long and successful
                    journey. We assure you of our full support for your professional development.
                  </p>
                </div>

                {/* Notice Box */}
                <div className="border border-gray-400 bg-gray-50 rounded px-4 py-2 my-4 text-[10px] text-gray-700 space-y-0.5">
                  <p>* Rules as per Trust Bylaws / Committee are applicable.</p>
                  <p>* Trust is currently recruiting for free.</p>
                  <p># We request a small donation to support our cause.</p>
                </div>

                {/* Closing & Signature */}
                <div className="text-[11px] space-y-0.5">
                  <p>Thanking you,</p>
                  <p>From</p>
                  <p className="italic">Always at your service</p>
                </div>
                <div className="mt-8 text-[11px] font-bold space-y-0.5">
                  <p className="text-gray-400">__________________________</p>
                  <p>DR RAM NARAYAN BHARTI</p>
                  <p>FOUNDER CUM PRESIDENT</p>
                  <p>BHARTI SEWA SADAN TRUST</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t-2 border-double border-[#1a365d] grid grid-cols-3 gap-3 px-5 py-3 text-[9px] text-gray-700 bg-gray-50">
                <div>
                  <p className="font-black uppercase text-[8px] tracking-widest text-[#1a365d] border-b border-[#1a365d] pb-0.5 mb-1.5">Reg. Address</p>
                  <p>Shivpuri, Ward No-9</p>
                  <p>P.O. Araria Dist, Araria</p>
                  <p>Pin: 854311, Bihar, INDIA</p>
                </div>
                <div>
                  <p className="font-black uppercase text-[8px] tracking-widest text-[#1a365d] border-b border-[#1a365d] pb-0.5 mb-1.5">Contact</p>
                  <p>bhartisewasadantrsut@gmail.com</p>
                  <p>bsstbihar@gmail.com</p>
                  <p>www.bsst.org.in</p>
                  <p>📞 7782833655 | 8825340183</p>
                </div>
                <div>
                  <p className="font-black uppercase text-[8px] tracking-widest text-[#1a365d] border-b border-[#1a365d] pb-0.5 mb-1.5">Other Registrations</p>
                  <p>12A : AACTB3060FE20206</p>
                  <p>80G : AACTB3060FF20219</p>
                  <p>CSR : CSR00010028</p>
                  <p>FCRA: 031050011</p>
                  <p>LEI : 984500BE2B82A1D66405</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Print Button */}
          <Button
            onClick={handlePrint}
            className="w-full bg-gradient-to-r from-[#1a365d] to-indigo-700 hover:from-[#152b4e] hover:to-indigo-800 text-white rounded-xl h-12 font-bold text-lg shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download / Print Appointment Letter
          </Button>

          <Card className="glass-panel border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">About This Letter</h3>
              <p className="text-sm text-muted-foreground">
                This is an official appointment letter issued by <strong>Bharti Sewa Sadan Trust</strong> on
                official letterhead. You can print or download it for official use, record keeping, or to
                present to relevant authorities. It includes the trust's registration details, your membership
                role, and is signed by the Founder-President.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
