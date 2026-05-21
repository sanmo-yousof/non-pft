import ProfileClient from "./_components/ProfileClient";

const page = async () => {
  await new Promise((res) => setTimeout(res, 500));


  return <ProfileClient />;
};

export default page;
