"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { JoinTeamAchievementTable } from "@/components/join-team/JoinTeamAchivementTable";
import { JoinTeamChallenge } from "@/components/join-team/JoinTeamChallenge";
import { JoinTeamHeader } from "@/components/join-team/JoinTeamHeader";
import { JoinTeamProgress } from "@/components/join-team/JoinTeamProgress";
import { JoinTeamSupporterSection } from "@/components/join-team/JoinTeamSupporters";
import { JoinTeamWalkerType } from "@/components/join-team/JoinTeamWalkerType";
import Loader from "@/components/shared/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import JoinTeamCreateAccount from "@/components/join-team/JoinTeamCreateAccount";
import useAuth from "@/hook/useAuth";
import { TAchievement, TChallenge, TRegistration } from "@/types/shared";
import { TTeam } from "@/types/team";
import { CreditCard } from "lucide-react";
import { TOnboardingResponse } from "@/types/onboard";
import { getApi, postApi } from "@/lib/apiHandler";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Script from "next/script";

const STEPS = ["Create Account", "Setup"];

export default function Page() {
  const queryClient = useQueryClient();
  const { slug } = useParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const [challenges, setChallenges] = useState<TChallenge[]>([]);
  const [walkerTypes, setWalkerTypes] = useState<TRegistration[]>([]);
  const [achievementLevels, setAchievementLevels] = useState<TAchievement[]>(
    [],
  );

  const [team, setTeam] = useState<TTeam | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");

  const { user } = useAuth();

  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [selectedChallenge, setSelectedChallenge] = useState<number | string>(
    "",
  );
  const [selectedType, setSelectedType] = useState<number | string>("");

  const [supporters, setSupporters] = useState([{ name: "", email: "" }]);

  // Auto move to step 2 if logged in
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user && step === 0) setStep(1);
  }, [user, step]);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const teamRes = await getApi<{ data: { data: TTeam } }>(
          "/onboarding/teams/" + slug,
        );

        setTeam(teamRes.data?.data);
        if (!user) return;
        const res = await getApi<{ data: { data: TOnboardingResponse } }>(
          "/onboarding",
        );
        const data = res.data?.data;
        setChallenges(data.challenges);
        setWalkerTypes(data.registrationLevels);
        setAchievementLevels(data.archievementLevels);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load onboarding data");
      } finally {
        setLoading(false);
      }
    };

    fetchOnboarding();
  }, [user, slug]);

  const selectedTypeObj = walkerTypes.find(
    (w) => w.id === Number(selectedType),
  );

  const giveButterWidgets: Record<number, string> = {
    5: "gOKK6r",
    25: "g6WW7Z",
    95: "pQqqnr",
    250: "gGRRzJ",
  };

  const fullName = user?.full_name || "";
  const [first_name, ...rest] = fullName.split(" ");
  const last_name = rest.join(" ");
  const email = user?.email || "";

  const handleFinish = async () => {
    if (!selectedChallenge) {
      toast.error("Select challenge");
      return;
    }

    if (!selectedType) {
      toast.error("Select walker type");
      return;
    }

    setSubmitting(true);

    try {
      // Fake delay (simulate API)
      // await new Promise((res) => setTimeout(res, 800));
      const supportersPayload = {
        members: supporters
          .filter((s) => s.name.trim() && s.email.trim())
          .map((s) => ({
            name: s.name,
            email: s.email,
          })),
      };
      if (supportersPayload.members.length > 0) {
        await postApi("/invite/supporters", supportersPayload);
      }
      const onboardpPayload = {
        challenge_id: Number(selectedChallenge),
        registration_level_id: Number(selectedType),
        amount: selectedTypeObj?.cost || 0,
        transaction_id: transactionId,
        phone: phone,
      };
      await postApi("invite/onboarding/store", onboardpPayload);

      toast.success("All set!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/walker-dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!team) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-stone-500">Invalid team invite</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://widgets.givebutter.com/latest.umd.cjs"
        strategy="afterInteractive"
      />
      <div className="container-app py-8 md:py-12 max-w-2xl">
        <JoinTeamHeader team={team} />

        <JoinTeamProgress step={step} steps={STEPS} />

        {step === 0 && <JoinTeamCreateAccount team={team} setStep={setStep} />}

        {step === 1 && (
          <>
            <Card className="bg-stone-900 rounded-2xl border-none mb-6">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">{team.name}</p>
                  <p className="text-stone-400 text-xs">
                    {team?.team_members_count} members
                  </p>
                </div>
                <Badge className="bg-emerald-500 text-white rounded-full">
                  Joined!
                </Badge>
              </CardContent>
            </Card>

            <JoinTeamChallenge
              challenges={challenges}
              selectedChallenge={selectedChallenge}
              setSelectedChallenge={setSelectedChallenge}
            />

            <JoinTeamWalkerType
              walkerTypes={walkerTypes}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />

            <JoinTeamAchievementTable levels={achievementLevels} />

            <JoinTeamSupporterSection
              supporters={supporters}
              setSupporters={setSupporters}
              user={user}
            />

            <Card className="bg-white rounded-xl border border-stone-100 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-700">Registration Fee</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${selectedTypeObj?.cost || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-900 text-center">
                Choose Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="rounded-2xl border border-stone-200 hover:border-primary-400 transition-all">
                  <CardContent className="p-5 text-center">
                    <CreditCard className="w-10 h-10 mx-auto text-primary-600 mb-3" />
                    <h4 className="font-bold text-stone-900 mb-1">
                      Pay with Mpesa
                    </h4>
                    <p className="text-sm text-stone-500 mb-4">
                      Complete payment using mobile money
                    </p>
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white">
                          Continue with Mpesa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Payment Information</DialogTitle>
                        </DialogHeader>
                        <h1 className="font-sans! font-semibold text-xl">
                          Mpesa Account Number :{" "}
                          <span className="text-primary-500">831500</span>
                        </h1>
                        <div className="space-y-3 mt-4">
                          <div>
                            <Label className="text-sm">
                              Number (send from)
                            </Label>
                            <Input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+254*********"
                              className="mt-1 rounded-xl"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Transaction ID</Label>
                            <Input
                              type="text"
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              placeholder="Transaction ID"
                              className="mt-1 rounded-xl"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Amount</Label>
                            <div className="mt-1 text-xl font-bold text-gray-900">
                              ${selectedTypeObj?.cost ?? "0.00"}
                            </div>
                          </div>
                          <Button
                            onClick={handleFinish}
                            className="w-full rounded-full bg-primary-600 hover:bg-primary-700 text-white"
                            data-testid="admin-challenge-save-btn"
                            disabled={submitting}
                          >
                            {submitting ? "Processing..." : "Submit Payment"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border border-stone-200 hover:border-black transition-all">
                  <CardContent className="p-5 text-center">
                    <CreditCard className="w-10 h-10 mx-auto text-black mb-3" />
                    <h4 className="font-bold text-stone-900 mb-1">
                      Pay with Credit Card
                    </h4>
                    <p className="text-sm text-stone-500 mb-4">
                      Secure payment via GiveButter
                    </p>
                    {giveButterWidgets[selectedTypeObj?.cost || 0] ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `
    <givebutter-widget
      id="${giveButterWidgets[selectedTypeObj?.cost || 0]}"
      account="eleg9okvNUj2zHsn"
     first_name="${first_name}"
last_name="${last_name}"
email="${email}"
      
    ></givebutter-widget>
  `,
                        }}
                      />
                    ) : (
                      <p className="text-sm text-red-500">
                        Payment widget unavailable for this amount.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
