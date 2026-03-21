"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, Github } from "lucide-react"

const data = {
  user: {
    name: "Team Nomads",
    email: "keshavdubey.design@gmail.com",
    avatar: "/avatars/avatar.jpg",
  },
  navMain: [
    {
      title: "Scorecard Overview",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
    },
    {
      title: "Demographics",
      url: "/dashboard/demographics",
      icon: (
        <UsersIcon />
      ),
    },
    {
      title: "Time & Effort (RQ1)",
      url: "/dashboard/rq1",
      icon: (
        <FileChartColumnIcon />
      ),
    },
    {
      title: "Tools & Pain (RQ2)",
      url: "/dashboard/rq2",
      icon: (
        <FileTextIcon />
      ),
    },
    {
      title: "Interview Transcripts",
      url: "/dashboard/transcripts",
      icon: (
        <FileTextIcon />
      ),
    },
    {
      title: "Research Report (2.4)",
      url: "/dashboard/report",
      icon: (
        <FileChartColumnIcon />
      ),
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/dashboard/data-library",
      icon: (
        <DatabaseIcon />
      ),
    },
    {
      name: "GitHub Repository",
      url: "https://github.com/Drool3008/ScribeHealth_form",
      icon: (
        <Github className="size-4" />
      ),
    },
    {
      name: "Live Survey Form",
      url: "/",
      icon: (
        <FileTextIcon />
      ),
      tooltip: "This is a survey which was taken from the doctors and this is the dashboard where all the data is analysed."
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">ScribeHealth</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
