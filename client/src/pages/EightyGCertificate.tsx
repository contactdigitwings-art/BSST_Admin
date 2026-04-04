import { useMyMember } from "@/hooks/use-members";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, ShieldCheck, FileText, Eye } from "lucide-react";

export default function EightyGCertificate() {
  const { data: member, isLoading } = useMyMember();
  const pdfPath = "/80G Certificate.pdf";
  const pdfUrl = encodeURI(pdfPath);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!member) {
    return (
      <Card className="glass-panel border-0">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">Member Record Not Found</h3>
          <p className="text-slate-500 mt-2">Please apply for membership to access 80G certificate download.</p>
        </CardContent>
      </Card>
    );
  }

  if (!member.eightyGCertificateGenerated) {
    return (
      <Card className="glass-panel border-0">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">80G Certificate Not Available</h3>
          <p className="text-slate-500 mt-2">Your 80G eligibility is not yet active. Donate or contact admin to enable your certificate.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">80G Certificate</h1>
        <p className="text-muted-foreground mt-1">View and download your official 80G tax exemption certificate.</p>
      </div>

      {/* Certificate Preview Card */}
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Certificate Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-700">Certificate Eligible</span>
            </div>
            <p className="text-sm text-gray-600">
              Your 80G certificate is ready for viewing and download. This certificate allows tax deductions under Section 80G of the Income Tax Act.
            </p>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">80G Certificate Preview</span>
              </div>
              <div className="flex gap-2">
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="w-3 h-3" />
                    Open in New Tab
                  </Button>
                </a>
                <a href={pdfUrl} download="80G Certificate.pdf">
                  <Button size="sm" className="gap-1 bg-indigo-600 hover:bg-indigo-700">
                    <Download className="w-3 h-3" />
                    Download PDF
                  </Button>
                </a>
              </div>
            </div>
            <div className="h-[700px] w-full">
              <iframe
                title="80G Certificate Preview"
                src={pdfUrl}
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>

          {/* Download Options */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Direct Download</h4>
                <p className="text-sm text-gray-600 mb-3">Download the certificate directly to your device.</p>
                <a href={pdfUrl} download="80G Certificate.pdf">
                  <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">View in Browser</h4>
                <p className="text-sm text-gray-600 mb-3">Open the certificate in a new browser tab for full view.</p>
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="w-4 h-4" />
                    View in New Tab
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Certificate Information */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Certificate Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">URN:</span>
                <span className="ml-2 text-blue-700">AACTB3060FF20219</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Tax Benefit:</span>
                <span className="ml-2 text-blue-700">50% Tax Deduction</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Member ID:</span>
                <span className="ml-2 text-blue-700">{member.regNo}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Issue Date:</span>
                <span className="ml-2 text-blue-700">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground text-center">
            If the certificate does not render properly, ensure the file exists at <code className="bg-gray-100 px-1 rounded">/80G Certificate.pdf</code> in the public folder.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
