import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, Edit, Settings } from "lucide-react";

const UserInfo = () => {
  const userStats = [
    { label: "Projects", value: "12", color: "bg-primary" },
    { label: "Tasks Completed", value: "148", color: "bg-primary-glow" },
    { label: "Hours Logged", value: "324", color: "bg-accent" },
  ];

  const recentActivity = [
    { action: "Completed project dashboard", time: "2 hours ago" },
    { action: "Updated user profile", time: "1 day ago" },
    { action: "Created new task", time: "3 days ago" },
    { action: "Joined team meeting", time: "1 week ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">User Information</h1>
        <p className="text-muted-foreground">Manage your profile and account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-gradient-card shadow-elevated border-border">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24 shadow-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="text-xl bg-gradient-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl text-foreground">John Doe</CardTitle>
            <CardDescription className="text-base">Senior Developer</CardDescription>
            <div className="flex justify-center gap-2 mt-3">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">Pro User</Badge>
              <Badge variant="outline" className="border-primary text-primary">Verified</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Joined March 2022</span>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button size="sm" className="flex-1 bg-gradient-primary hover:shadow-primary">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {userStats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card shadow-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-gradient-card shadow-elevated border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your latest actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground font-medium">{activity.action}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Overview */}
          <Card className="bg-gradient-card shadow-elevated border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Account Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Subscription and account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
                  <p className="text-lg font-semibold text-foreground">Professional</p>
                  <p className="text-sm text-muted-foreground">$29/month • Next billing on Apr 15</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-lg font-semibold text-foreground">4.2 GB / 10 GB</p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full w-[42%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;