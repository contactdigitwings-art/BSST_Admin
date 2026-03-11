import { useMyMember } from "@/hooks/use-members";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Badge } from "lucide-react";

export default function IDCard() {
  const { data: member, isLoading } = useMyMember();

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  const handleDownloadIDCard = () => {
    const element = document.getElementById("id-card-content");
    if (!element) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.fillStyle = "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)";
      ctx.fillRect(0, 0, 500, 300);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "left";
      ctx.fillText("NGO ID CARD", 30, 50);
      
      ctx.font = "bold 18px Arial";
      ctx.fillText(member?.name || "", 30, 100);
      
      ctx.font = "14px Arial";
      ctx.fillStyle = "#e0e0e0";
      ctx.fillText(`Reg No: ${member?.regNo || ""}`, 30, 140);
      ctx.fillText(`Email: ${member?.email || ""}`, 30, 170);
      ctx.fillText(`Status: ${member?.status || ""}`, 30, 200);
      
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `ID-Card-${member?.regNo}.png`;
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Your ID Card</h1>
        <p className="text-muted-foreground mt-1">Download and print your official NGO membership ID card.</p>
      </div>

      {!member ? (
        <Card className="glass-panel border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No Membership Record</h3>
            <p className="text-slate-500 mt-2">Your ID card is only available after membership is verified. Please check your application status.</p>
          </CardContent>
        </Card>
      ) : !member.idCardGenerated ? (
        <Card className="glass-panel border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Badge className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">ID Card Not Yet Generated</h3>
            <p className="text-slate-500 mt-2">Your ID card is pending generation by admin. Please check back soon.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* ID Card Preview */}
          <Card className="glass-panel border-0 overflow-hidden">
            <div id="id-card-content" className="bg-gradient-to-r from-indigo-600 to-purple-600 p-12 text-white h-96 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold">NGO ID CARD</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80">Full Name</p>
                  <p className="text-2xl font-bold">{member.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-80">Registration No</p>
                    <p className="text-lg font-bold">{member.regNo}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Status</p>
                    <p className="text-lg font-bold uppercase">{member.status}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm opacity-80">Email</p>
                  <p className="text-sm font-mono">{member.email}</p>
                </div>
              </div>
              
              <div className="text-xs opacity-70">
                <p>Valid Member • Issued by NGO Management System</p>
              </div>
            </div>
          </Card>

          {/* Download Button */}
          <Button
            onClick={handleDownloadIDCard}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl h-12 font-bold text-lg shadow-lg shadow-indigo-500/25"
          >
            <Download className="w-5 h-5 mr-2" />
            Download ID Card as Image
          </Button>

          {/* Instructions */}
          <Card className="glass-panel border-0">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-3">How to Use Your ID Card</h3>
              <ol className="space-y-2 text-sm text-foreground list-decimal list-inside">
                <li>Download the ID card image to your device</li>
                <li>Print it on a standard A4 paper or photo paper</li>
                <li>Cut along the edges using a card template</li>
                <li>Laminate it for durability (optional)</li>
                <li>Your ID card is now ready to use</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
