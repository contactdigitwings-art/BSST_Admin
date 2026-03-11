import { useMyMember } from "@/hooks/use-members";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Badge } from "lucide-react";

export default function AppointmentLetter() {
  const { data: member, isLoading } = useMyMember();

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  const handleDownloadLetter = () => {
    const element = document.getElementById("letter-content");
    if (!element) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Appointment Letter - ${member?.name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.8; color: #333; }
              .header { text-align: center; border-bottom: 3px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #4f46e5; }
              .date { text-align: right; margin-bottom: 30px; }
              .letter { text-align: justify; }
              .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; text-align: center; font-size: 12px; }
              .signature { margin-top: 50px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">NGO Management System</div>
              <p>Official Appointment Letter</p>
            </div>
            
            <div class="date">
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <p><strong>To,</strong></p>
            <p>${member?.name}</p>
            <p>${member?.email}</p>
            <p>Registration No: ${member?.regNo}</p>
            
            <p><strong>Subject: Appointment Letter - Member Confirmation</strong></p>
            
            <div class="letter">
              <p>Dear ${member?.name},</p>
              
              <p>This letter confirms your appointment and membership status with our organization. We are pleased to recognize your commitment and contribution to our mission.</p>
              
              <p><strong>Membership Details:</strong></p>
              <ul>
                <li>Registration Number: ${member?.regNo}</li>
                <li>Name: ${member?.name}</li>
                <li>Email: ${member?.email}</li>
                <li>Status: ${member?.status?.charAt(0).toUpperCase() + member?.status?.slice(1)}</li>
                <li>Appointment Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
              </ul>
              
              <p>As an official member, you are entitled to:</p>
              <ul>
                <li>Access to all member benefits and privileges</li>
                <li>Participation in organizational activities and events</li>
                <li>Official membership documentation</li>
                <li>Recognition as a valued member of our community</li>
              </ul>
              
              <p>We value your continued support and look forward to working with you towards our shared goals.</p>
              
              <p>If you have any questions or require further assistance, please do not hesitate to contact us.</p>
              
              <p>Best Regards,</p>
              
              <div class="signature">
                <p>__________________________</p>
                <p><strong>Administrative Officer</strong></p>
                <p>NGO Management System</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This is an official document issued by NGO Management System</p>
              <p>Date Issued: ${new Date().toLocaleDateString()}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Appointment Letter</h1>
        <p className="text-muted-foreground mt-1">Your official appointment letter confirming membership status.</p>
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
              <Badge className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">Appointment Letter Not Yet Generated</h3>
            <p className="text-slate-500 mt-2">Your appointment letter is pending generation by admin.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Letter Preview */}
          <Card id="letter-content" className="glass-panel border-0 overflow-hidden">
            <CardContent className="p-12 bg-white">
              <div className="text-center border-b-4 border-indigo-600 pb-6 mb-8">
                <h2 className="text-2xl font-bold text-indigo-600">NGO Management System</h2>
                <p className="text-gray-600">Official Appointment Letter</p>
              </div>

              <div className="text-right mb-8">
                <p><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <p className="mb-4"><strong>To,</strong></p>
              <p className="font-bold">{member.name}</p>
              <p className="text-gray-600">{member.email}</p>
              <p className="text-gray-600">Registration No: {member.regNo}</p>

              <p className="my-6"><strong>Subject: Appointment Letter - Member Confirmation</strong></p>

              <div className="space-y-4 text-justify">
                <p>Dear {member.name},</p>
                <p>This letter confirms your appointment and membership status with our organization. We are pleased to recognize your commitment and contribution to our mission.</p>

                <div className="my-6">
                  <p className="font-bold mb-3">Membership Details:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Registration Number: {member.regNo}</li>
                    <li>Name: {member.name}</li>
                    <li>Email: {member.email}</li>
                    <li>Status: {member.status?.charAt(0).toUpperCase() + member.status?.slice(1)}</li>
                  </ul>
                </div>

                <p>As an official member, you are entitled to all member benefits and privileges as per our organizational policies.</p>

                <p>We value your continued support and look forward to working with you towards our shared goals.</p>

                <p>Best Regards,</p>
              </div>

              <div className="mt-12 border-t pt-8 text-center">
                <p className="font-bold">__________________________</p>
                <p className="font-bold">Administrative Officer</p>
                <p className="text-gray-600">NGO Management System</p>
              </div>
            </CardContent>
          </Card>

          {/* Download Button */}
          <Button
            onClick={handleDownloadLetter}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl h-12 font-bold text-lg shadow-lg shadow-blue-500/25"
          >
            <Download className="w-5 h-5 mr-2" />
            Download & Print Letter
          </Button>

          <Card className="glass-panel border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-3">About Your Appointment Letter</h3>
              <p className="text-sm text-foreground mb-3">
                This is your official appointment letter confirming your membership status and eligibility for all member benefits.
              </p>
              <p className="text-sm text-muted-foreground">
                You can download and print this letter for official purposes, record keeping, or to present to relevant authorities.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
