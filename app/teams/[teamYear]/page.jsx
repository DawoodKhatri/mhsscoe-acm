import TeamSectionCard from "@/components/teams/teamSectionCard";
import { getTeamSections } from "@/actions/teams";
import { redirect } from "next/navigation";
import TeamChangeControl from "@/components/teams/teamChangeControl";

const TeamDetailsPage = async ({ params: { teamYear } }) => {
  let teamSections;

  try {
    teamSections = await getTeamSections(teamYear);
  } catch (error) {
    redirect("/not-found");
  }

  return (
    <>
      <TeamChangeControl currYear={teamYear} />
      <div className="flex flex-col gap-10 pb-10">
        {teamSections.map((sectionId, index) => (
          <TeamSectionCard
            key={`teams_page_section_${index}`}
            teamYear={teamYear}
            sectionId={sectionId}
          />
        ))}
      </div>
    </>
  );
};

export default TeamDetailsPage;
