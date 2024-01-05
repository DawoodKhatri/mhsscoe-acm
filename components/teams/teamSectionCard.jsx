import Link from "next/link";
import TeamSectionsPostCard from "./teamSectionsPostCard";
import { getTeamSectionDetails } from "@/actions/teams";
import { redirect } from "next/navigation";

const TeamSectionCard = async ({ teamYear, sectionId }) => {
  let sectionDetails;

  try {
    sectionDetails = await getTeamSectionDetails(teamYear, sectionId);
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <div data-aos="fade-up">
      <div className="p-5 mb-5">
        <h3 className="text-center text-4xl font-bold italic text-gray-700">
          {sectionDetails?.title}
        </h3>
      </div>
      <div
        className="grid gap-8 grid-cols-[repeat(auto-fit,_calc(50%-16px))] sm:grid-cols-[repeat(auto-fit,_calc(33%-24px))] md:grid-cols-[repeat(auto-fit,_calc(25%-24px))] lg:grid-cols-[repeat(auto-fit,_20%)] justify-evenly"
        data-aos="fade-up"
      >
        {sectionDetails?.posts?.map((post, index) => (
          <Link
            key={`teams_page_section_post_${index}`}
            href={`/user?email=${post.user.email}`}
          >
            <TeamSectionsPostCard {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamSectionCard;
