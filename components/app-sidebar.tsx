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
      title: "Business Model",
      url: "/dashboard/business-model",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        {
          title: "Pricing",
          url: "/dashboard/business-model/pricing",
        },
        {
          title: "Solo Doctors",
          url: "/dashboard/business-model/solo-doctors",
        },
        {
          title: "P&L",
          url: "/dashboard/business-model/pnl",
        },
        {
          title: "Balance Sheet",
          url: "/dashboard/business-model/balance-sheet",
        },
        {
          title: "Funding",
          url: "/dashboard/business-model/funding",
        },
        {
          title: "Cash Flow",
          url: "/dashboard/business-model/cash-flow",
        },
        {
          title: "LTV",
          url: "/dashboard/business-model/ltv",
        },
        {
          title: "G&A",
          url: "/dashboard/business-model/ga",
        },
        {
          title: "Risks",
          url: "/dashboard/business-model/risks",
        },
      ],
    },
    {
      title: "Research",
      url: "/dashboard/research",
      icon: <FolderIcon />,
      items: [
        {
          title: "Scorecard Overview",
          url: "/dashboard/research",
        },
        {
          title: "Demographics",
          url: "/dashboard/research/demographics",
        },
        {
          title: "Time & Effort (RQ1)",
          url: "/dashboard/research/rq1",
        },
        {
          title: "Tools & Pain (RQ2)",
          url: "/dashboard/research/rq2",
        },
        {
          title: "Interview Transcripts",
          url: "/dashboard/research/transcripts",
        },
        {
          title: "Research Report (2.4)",
          url: "/dashboard/research/report",
        },
      ],
    },
  ],
  documents: [
    {
      name: "Challenge 2 (PDF)",
      url: "https://drive.google.com/file/d/1QLj8avwMvzZrdG3ZP7TKf6d6Ye-CFlGT/view?usp=sharing",
      icon: (
        <FileChartColumnIcon />
      ),
      newTab: true,
    },
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
      newTab: true,
    },
    {
      name: "Live Survey Form",
      url: "/",
      icon: (
        <FileTextIcon />
      ),
      tooltip: "This is a survey which was taken from the doctors and this is the dashboard where all the data is analysed.",
      newTab: true,
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
