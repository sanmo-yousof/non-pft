import Achievment from "@/components/fundraise/Achievment";
import Banner from "@/components/fundraise/Banner";
import Donate from "@/components/fundraise/Donate";
import Pledge from "@/components/fundraise/Pledge";
import ProgressBar from "@/components/fundraise/ProgressBar";
import ShareSocial from "@/components/fundraise/ShareSocial";
import Stats from "@/components/fundraise/Stats";
import Supporter from "@/components/fundraise/Supporter";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/walker/fundraises/${id}`,
      { cache: "no-store" },
    );
    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  // if (!data) return null;


  return (
    <div className="min-h-screen bg-stone-50" data-testid="fundraising-page">
      <Banner user={data?.data.registration.user} team={data?.data?.team} />
      <div className="container-app py-8 md:py-12 max-w-3xl">
        <Pledge
          fullName={data?.data.registration.user.full_name}
          displayName={data?.data?.registration?.user.display_name}
          totalChallenge={data?.data?.challenge.distance}
          pledgeTo={id}
          challengeId={data?.data?.registration.challenge_id}
        />
        <Stats data={data?.data} />
        {data?.data?.registration.challenge_id && (
          <>
            <ProgressBar
              data={data?.data?.milestone}
              parcentage={data?.data?.distancePercentage}
              totalDistance={data?.data?.challenge?.distance}
              totalReach={data?.data?.totalDistance}
            />
            {/* {data.data.currentAchievement&&<Achievment totalRaised = {data.data.raised} data = {data.data.currentAchievement}/>} */}
            <ShareSocial />
          </>
        )}

        {/* <Supporter suporter={data?.data?.supporters} /> */}
        <Donate />
      </div>
    </div>
  );
};

export default Page;
