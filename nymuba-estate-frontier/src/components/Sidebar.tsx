
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader 
} from '@/components/ui/sidebar';
import { Building, Key, Calendar, Tag, House, Plus } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: House, path: '/dashboard' },
    { title: 'Properties', icon: Building, path: '/properties' },
    { title: 'Add Property', icon: Plus, path: '/add-property' },
    { title: 'Occupancy', icon: Key, path: '/occupancy' },
    { title: 'Registry', icon: Calendar, path: '/registry' },
    { title: 'NFT Marketplace', icon: Tag, path: '/marketplace' }
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="bg-nymuba-primary rounded-md h-8 w-8 flex items-center justify-center">
            <span className="text-white font-bold">NT</span>
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-orange">
            Nymuba Track
          </span>
        </div>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild className="hover:bg-nymuba-primary/20">
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive 
                          ? "flex items-center gap-3 text-nymuba-primary" 
                          : "flex items-center gap-3 hover:text-nymuba-primary"
                      }
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
