import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user.update({ unsafeMetadata: { role } }).then(() => {
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    });
  };

  useEffect(() => {
    if (user?.unsafeMetadata.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#09BB94" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        Iam a .....
      </h2>

      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="green"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="secondary"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;