
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Save, Share, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const platforms = [
  { value: "twitter", label: "X / Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
];

const contentTypes = [
  { value: "post", label: "Regular Post" },
  { value: "thread", label: "Thread" },
  { value: "caption", label: "Image Caption" },
  { value: "blog", label: "Blog Post" },
];

const ContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [contentType, setContentType] = useState("post");
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Missing prompt",
        description: "Please provide a prompt for the AI to generate content",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock content generation based on inputs
      let result = "";
      if (platform === "twitter") {
        result = contentType === "thread" 
          ? `1/ Web3 innovation continues! Just discovered how @RENEGADE_ICP combines AI with blockchain security.\n\n2/ Their platform generates social media content and securely stores it on the ICP blockchain. Transparency + AI power!\n\n3/ Been testing their automated posting feature across platforms - what used to take hours now happens in seconds. Game-changer for creators!\n\n4/ The analytics insights are surprisingly detailed. I can track performance across all channels from one dashboard. #Web3 #ContentCreation`
          : `Just discovered @RENEGADE_ICP - an AI content generator built on #InternetComputer that's actually useful! Create, schedule, and track social media posts with blockchain security. Game-changer for my content strategy! #Web3 #AI`;
      } else if (platform === "instagram") {
        result = `✨ INNOVATION ALERT ✨\n\nTaking my content game to the next level with @renegade_icp - the Web3 social media manager that uses AI to create engaging posts while keeping my data secure on the blockchain.\n\nNo more spending hours creating content! Now I can focus on what matters - engaging with YOU, my amazing community! ❤️\n\n#ContentCreation #Web3 #AITechnology #SocialMedia #Blockchain #InternetComputer #RENEGADE`;
      } else if (platform === "linkedin") {
        result = `🚀 Exciting Web3 Innovation 🚀\n\nI'm thrilled to share my experience with RENEGADE - a groundbreaking platform built on the Internet Computer Protocol that's revolutionizing how professionals manage social media content.\n\nWhat sets it apart:\n• AI-powered content generation tailored to your brand voice\n• Blockchain-based storage for unmatched security and transparency\n• Cross-platform automation to save valuable time\n• Comprehensive analytics to optimize strategy\n\nAs someone who values both innovation and efficiency, I'm impressed by how seamlessly this solution bridges AI capabilities with Web3 security.\n\nHave you explored any blockchain-based tools for your content strategy? I'd love to hear your thoughts!\n\n#Web3 #AIInnovation #ContentStrategy #InternetComputer #ProfessionalGrowth`;
      }
      
      setGeneratedContent(result);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    toast({
      title: "Content saved",
      description: "Your content has been saved to the blockchain",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Ready to share",
      description: "Content has been added to your publishing queue",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="history">Generation History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6">
          <Card className="cyber-card">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">What would you like to create?</Label>
                  <Textarea
                    id="prompt"
                    placeholder="E.g., A post about new AI features in our product, focusing on user benefits"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] bg-renegade-dark border-renegade-green/30 focus:border-renegade-green focus:ring-renegade-green/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="excited">Excited</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black font-medium"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Content
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card className="cyber-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label>Generated Content</Label>
                  <div className="relative">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="min-h-[180px] bg-renegade-dark border-renegade-green/30"
                      readOnly={false}
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                        className="h-8 w-8 p-0 text-renegade-green hover:bg-renegade-green/10"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                      onClick={handleSave}
                    >
                      <Save className="mr-2 h-4 w-4" /> Save to Blockchain
                    </Button>
                    <Button
                      onClick={handleShare}
                      className="bg-accent hover:bg-accent/80 text-white"
                    >
                      <Share className="mr-2 h-4 w-4" /> Add to Publishing Queue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="cyber-card">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your generated content history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentGenerator;
