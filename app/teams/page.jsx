import { getAllTeams } from "@/actions/teams";
import { redirect, RedirectType } from "next/navigation";

const TeamsPage = async () => {
  let teams;
  try {
    teams = await getAllTeams();
    if (teams.length === 0) throw { status: 404, message: "No Teams Found" };
  } catch (error) {
    redirect("/not-found");
  }
  redirect(`/teams/${teams[0].year}`);
};

export default TeamsPage;
