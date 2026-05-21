"use client";

import CreateTeam from "@/components/dashboard/walker-team/CreateTeam";
import InviteSection from "@/components/dashboard/walker-team/InviteSection";
import MembersTable from "@/components/dashboard/walker-team/MembersTable";
import TeamHeader from "@/components/dashboard/walker-team/TeamHeader";
import TeamStats from "@/components/dashboard/walker-team/TeamStats";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuth from "@/hook/useAuth";
import { useTeams } from "@/hook/useTeam";
import axiosInstance from "@/lib/api";
import { TUser } from "@/types/auth";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TJoinTeam = {
  id: number;
  owner: {
    full_name: string;
    display_name: string;
  };
  team_members_count: number;
  name: string;
  invite_url: string;
  tagline: string;
};

type TTeamList = {
  id: number;
  name: string;
  tagline: string;
  invite_url: string;
  team_members_count: number;
};

export default function TeamPage() {
  const { user } = useAuth();
  const [teamsJoined, setTeamsJoined] = useState<TJoinTeam[]>([]);
  const [teams, setTeams] = useState<TTeamList[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TTeamList[]>([]);

  const searchTeams = (query: string) => {
    if (!query.trim()) {
      setSearchResults(teams);
      return;
    }

    const filteredTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchResults(filteredTeams);
  };

  const fetchTeamsJoined = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/teams-join");
      setTeamsJoined(res.data.data);
    } catch (error) {
      console.error("Error fetching joined teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      setTeamLoading(true);
      const res = await axiosInstance.get("/teams-list");
      setTeams(res.data.data);
      setSearchResults(res.data.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setTeamLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsJoined();
  }, []);

  useEffect(() => {
    fetchTeams();
  }, []);

  const joinTeam = async (teamId: number) => {
    try {
      await axiosInstance.post(`join-team/${teamId}`);
      toast.success("Joined team!");
      await fetchTeamsJoined();
      await fetchTeams();
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to join team");
    }
  };

  const { data, isLoading, refetch } = useTeams();
  const isLeader =
    data && user && data.teams.owner_id === (user as TUser).id ? true : false;

  if (isLoading || !user || loading || teamLoading) return <Loader />;
  const hasTeam = data || teamsJoined?.length > 0;

  return (
    <div data-testid="team-page" className="container-app py-8 md:py-12">
      {!hasTeam ? (
        <>
          <CreateTeam />
          {teams?.length ? (
            <Card className="rounded-2xl mt-12 border border-stone-100">
              <CardContent className="p-5">
                <h3 className="text-center mb-8 text-xl font-bold text-stone-900 ">
                  Join a Team
                </h3>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchQuery(value);
                      searchTeams(value);
                    }}
                    placeholder="Search by team name..."
                    className="rounded-xl border-stone-200 bg-stone-50 h-11 flex-1"
                    data-testid="team-search-input"
                    onKeyDown={(e) =>
                      e.key === "Enter" && searchTeams(searchQuery)
                    }
                  />
                  <Button
                    onClick={() => searchTeams(searchQuery)}
                    className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white"
                    data-testid="team-search-btn"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
                        data-testid={`team-result-${t.id}`}
                      >
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            {t.name}
                          </p>
                          <p className="text-xs text-stone-400">
                            {t.team_members_count} member
                            {t.team_members_count !== 1 ? "s" : ""}{" "}
                            {t.tagline ? `· ${t.tagline}` : ""}
                          </p>
                        </div>
                        <Button
                          onClick={() => joinTeam(t.id)}
                          size="sm"
                          className="rounded-full bg-orange-600 hover:bg-orange-700 text-white"
                          data-testid={`team-join-${t.id}`}
                        >
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-stone-400 text-center py-4">
                    {searchQuery
                      ? "No teams found for that search. Try a different name or create your own!"
                      : "No teams available yet. You can create your own!"}
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            <div
              className="text-center text-stone-500 mt-14"
              data-testid="no-teams-message"
            >
              No teams available to join at the moment.
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">
            Your Team
          </h1>
          {data && (
            <div className="space-y-6" data-testid="team-management-section">
              {/* Team Header with Leader */}
              <TeamHeader
                data={{
                  title: data?.teams.name,
                  description: data?.teams.tagline,
                  teamLeader: data?.teams?.owner.display_name,
                  teamId: data?.teams.id,
                }}
                isLeader={isLeader}
              />

              {/* Invite Section */}
              <InviteSection
                isLeader={isLeader}
                inviteUrl={data?.teams.invite_url}
              />

              {/* Team Stats */}
              <TeamStats
                stats={{
                  totalRaise: data?.totalRaise,
                  totalDistance: data?.totalDistance,
                  avgCompletion: data?.avgCompletion,
                  totalMembers: data?.totalMembers,
                }}
              />

              {/* Members Table */}
              {data?.teamMembers?.length > 0 && (
                <MembersTable
                  teamMembers={data?.teamMembers}
                  isLeader={isLeader}
                />
              )}
            </div>
          )}
          {teamsJoined?.length > 0 && (
            <div className="space-y-6" data-testid="team-management-section">
              <TeamHeader
                data={{
                  title: teamsJoined[0]?.name,
                  description: teamsJoined[0]?.tagline,
                  teamLeader: teamsJoined[0]?.owner.display_name,
                  teamId: teamsJoined[0]?.id,
                }}
                isLeader={false}
                teammembers={teamsJoined[0]?.team_members_count}
              />
              <InviteSection
                teamId={teamsJoined[0]?.id}
                isLeader={false}
                inviteUrl={teamsJoined[0]?.invite_url}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
