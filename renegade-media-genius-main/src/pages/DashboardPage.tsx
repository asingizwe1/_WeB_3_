
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGenerator from "@/components/Dashboard/ContentGenerator";
import AnalyticsOverview from "@/components/Dashboard/AnalyticsOverview";
import SocialAccounts from "@/components/Dashboard/SocialAccounts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, BarChart3, Share2, Calendar, Settings } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">Manage your content and track performance across platforms.</p>
      </div>

      <Tabs defaultValue="generate" className="space-y-8">
        <div className="border-b border-renegade-green/30">
          <TabsList className="bg-transparent">
            <TabsTrigger value="generate" className="data-[state=active]:border-b-2 data-[state=active]:border-renegade-green data-[state=active]:text-renegade-green rounded-none">
              <Bot className="mr-2 h-4 w-4" /> Content Generator
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-renegade-green data-[state=active]:text-renegade-green rounded-none">
              <BarChart3 className="mr-2 h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="accounts" className="data-[state=active]:border-b-2 data-[state=active]:border-renegade-green data-[state=active]:text-renegade-green rounded-none">
              <Share2 className="mr-2 h-4 w-4" /> Social Accounts
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:border-b-2 data-[state=active]:border-renegade-green data-[state=active]:text-renegade-green rounded-none">
              <Calendar className="mr-2 h-4 w-4" /> Scheduler
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-renegade-green data-[state=active]:text-renegade-green rounded-none">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generate" className="space-y-4">
          <ContentGenerator />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsOverview />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <SocialAccounts />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>
                Schedule and manage your upcoming content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Your scheduled content will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your preferences and account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Account settings will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
