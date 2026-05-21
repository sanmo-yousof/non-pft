import {
  Award,
  BarChart3,
  Building2,
  Footprints,
  Mountain,
  Settings,
  Users,
  HeartHandshake,
} from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Stats from "@/components/admin/Stats";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Overview from "@/components/admin/Overview";

import Config from "@/components/admin/Config";
import CorporateSponsorsAdmin from "@/components/admin/CorporateSponsorsAdmin";
import User from "@/components/admin/User";
import Achievment from "@/components/admin/Achievment";
import RegistrationLevel from "@/components/admin/RegistrationLevel";
import Challenges from "@/components/admin/Challenges";
import Teams from "@/components/admin/Teams";
import Supporters from "@/components/admin/Supporters";

const page = () => {
  return (
    <div className="container-app py-8 md:py-12" data-testid="admin-page">
      <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">
        Admin Console
      </h1>
      <Tabs defaultValue="stats">
        <TabsList className="flex flex-wrap w-full bg-stone-100 rounded-xl p-1 mb-6 gap-1">
          <TabsTrigger
            value="stats"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-stats"
          >
            <BarChart3 className="w-3 h-3 mr-1" /> Stats
          </TabsTrigger>
          <TabsTrigger
            value="challenges"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-challenges"
          >
            <Mountain className="w-3 h-3 mr-1" /> Challenges
          </TabsTrigger>
          <TabsTrigger
            value="walker-types"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-walker-types"
          >
            <Footprints className="w-3 h-3 mr-1" /> Registration Levels
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-achievements"
          >
            <Award className="w-3 h-3 mr-1" /> Achievement
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-users"
          >
            <Users className="w-3 h-3 mr-1" /> Users
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-teams"
          >
            <Users className="w-3 h-3 mr-1" /> Teams
          </TabsTrigger>
          <TabsTrigger
            value="supporters"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-supporters"
          >
            <HeartHandshake className="w-3 h-3 mr-1" /> Supporters
          </TabsTrigger>
          <TabsTrigger
            value="corporate"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-corporate"
          >
            <Building2 className="w-3 h-3 mr-1" /> Corporate
          </TabsTrigger>
          <TabsTrigger
            value="config"
            className="rounded-lg text-xs sm:text-sm"
            data-testid="admin-tab-config"
          >
            <Settings className="w-3 h-3 mr-1" /> Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <Overview />
        </TabsContent>

        <TabsContent value="challenges">
          <Challenges />
        </TabsContent>

        <TabsContent value="walker-types">
          <RegistrationLevel />
        </TabsContent>

        <TabsContent value="achievements">
          <Achievment />
        </TabsContent>

        <TabsContent value="users">
          <User />
        </TabsContent>

        <TabsContent value="teams">
          <Teams />
        </TabsContent>

        <TabsContent value="corporate">
          <CorporateSponsorsAdmin />
        </TabsContent>

        <TabsContent value="config">
          <Config />
        </TabsContent>

        <TabsContent value="supporters">
          <Supporters />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
