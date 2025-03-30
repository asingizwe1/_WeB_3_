
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Twitter, Instagram, Linkedin, Facebook, Plus, Link2 } from "lucide-react";

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  connected: boolean;
  icon: React.ReactNode;
}

const SocialAccounts: React.FC = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: "1",
      platform: "X / Twitter",
      username: "@yourusername",
      connected: true,
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      id: "2",
      platform: "Instagram",
      username: "@yourusername",
      connected: true,
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      id: "3",
      platform: "LinkedIn",
      username: "Your Name",
      connected: false,
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      id: "4",
      platform: "Facebook",
      username: "Your Page",
      connected: false,
      icon: <Facebook className="h-5 w-5" />,
    },
  ]);

  const toggleConnection = (id: string) => {
    setAccounts((prev) =>
      prev.map((account) => {
        if (account.id === id) {
          const newConnected = !account.connected;
          
          toast({
            title: newConnected ? "Account Connected" : "Account Disconnected",
            description: `${account.platform} account has been ${newConnected ? "connected" : "disconnected"}.`,
          });
          
          return { ...account, connected: newConnected };
        }
        return account;
      })
    );
  };

  const handleConnect = () => {
    toast({
      title: "Connect New Account",
      description: "This would open the OAuth flow to connect a new social media account.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Connected Social Accounts</h3>
        <Button
          onClick={handleConnect}
          className="bg-renegade-green hover:bg-renegade-green/80 text-black"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full ${account.connected ? "bg-renegade-green/20" : "bg-muted"}`}>
                  {account.icon}
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">{account.platform}</CardTitle>
                  <CardDescription>{account.username}</CardDescription>
                </div>
              </div>
              <Badge
                variant={account.connected ? "outline" : "secondary"}
                className={account.connected ? "border-renegade-green/50 text-renegade-green" : ""}
              >
                {account.connected ? "Connected" : "Disconnected"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor={`connection-${account.id}`} className="text-sm">Auto-posting</Label>
                <Switch
                  id={`connection-${account.id}`}
                  checked={account.connected}
                  onCheckedChange={() => toggleConnection(account.id)}
                  disabled={!account.connected}
                  className="data-[state=checked]:bg-renegade-green"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-renegade-green/20 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground w-full"
                onClick={() => toggleConnection(account.id)}
              >
                <Link2 className="mr-2 h-4 w-4" />
                {account.connected ? "Disconnect" : "Connect"} Account
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialAccounts;
