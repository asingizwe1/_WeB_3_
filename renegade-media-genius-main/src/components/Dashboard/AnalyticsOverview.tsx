
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, TrendingUp, BarChart2 } from "lucide-react";

const AnalyticsOverview: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
        <TabsTrigger value="audience">Audience</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Activity className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,840</div>
              <p className="text-xs text-muted-foreground">
                +15.8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Followers</CardTitle>
              <Users className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+249</div>
              <p className="text-xs text-muted-foreground">
                +10.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reach</CardTitle>
              <TrendingUp className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34.2K</div>
              <p className="text-xs text-muted-foreground">
                +25.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              <BarChart2 className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.4K</div>
              <p className="text-xs text-muted-foreground">
                +22.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Your content performance across platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Analytics chart will display here</p>
                <div className="w-full h-[200px] bg-renegade-dark rounded-md border border-renegade-green/30 flex items-center justify-center">
                  <p className="text-renegade-green">Performance Chart</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>
                Your most engaging posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b border-renegade-green/20 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">X / Twitter post</div>
                    <div className="text-renegade-green">2.4K engagements</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    "Just discovered @RENEGADE_ICP - an AI content generator..."
                  </div>
                </div>
                <div className="border-b border-renegade-green/20 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Instagram post</div>
                    <div className="text-renegade-green">1.8K engagements</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    "✨ INNOVATION ALERT ✨ Taking my content game..."
                  </div>
                </div>
                <div className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">LinkedIn article</div>
                    <div className="text-renegade-green">856 engagements</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    "🚀 Exciting Web3 Innovation 🚀 I'm thrilled..."
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
              <CardDescription>
                Performance by social platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-renegade-green mr-2"></div>
                      <span>X / Twitter</span>
                    </div>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-renegade-green h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                      <span>Instagram</span>
                    </div>
                    <span>28%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span>LinkedIn</span>
                    </div>
                    <span>18%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <span>Others</span>
                    </div>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="engagement">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Engagement Analytics</CardTitle>
            <CardDescription>Detailed breakdown of your audience engagement</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Engagement analytics will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audience">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Understand who is engaging with your content</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Audience demographic data will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Analysis of your content strategy effectiveness</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Content performance metrics will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsOverview;
