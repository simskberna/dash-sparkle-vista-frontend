import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { User, BarChart3, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';


const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "User Info",
    url: "/user",
    icon: User,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Başarılı!',
        description: 'Çıkış yapıldı.',
      });
      navigate("/")
    } catch (error) {
      toast({
        title: 'Hata!',
        description: 'Giriş yapılamadı. Email ve şifrenizi kontrol edin.',
        variant: 'destructive',
      });
    }
  }

  return (
      <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}>
        <SidebarContent className="bg-gradient-card shadow-card border-r border-border">
          <div className="p-6 border-b border-border">
            {!collapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
                </div>
            )}
            {collapsed && (
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
            )}
          </div>

          <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className={`${collapsed ? "sr-only" : ""} text-muted-foreground font-medium`}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                            to={item.url}
                            end={item.url === "/dashboard"}
                            className={({ isActive: navIsActive }) =>
                                `flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${
                                    isActive(item.url) || navIsActive
                                        ? "bg-accent text-accent-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                }`
                            }
                        >
                          <item.icon className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} transition-transform group-hover:scale-110`} />
                          {!collapsed && <span className="font-medium">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User section with logout */}
          <div className="mt-auto p-3 border-t border-border">
            {!collapsed ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                  <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Çıkış Yap
                  </Button>
                </div>
            ) : (
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="icon"
                    className="w-full text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
            )}
          </div>
        </SidebarContent>
      </Sidebar>
  );
}
