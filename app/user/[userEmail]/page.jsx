import { connectDB } from "@/config/database";
import { BRANCHES } from "@/constants/branches";
import { ROLES } from "@/constants/roles";
import { YEARS } from "@/constants/years";
import User from "@/models/user";
import {
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  MailOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";

const getData = async (email) => {
  try {
    await connectDB();

    let user = await User.findOne({
      email: email + "@mhssce.ac.in",
    }).populate("teams.team teams.post");

    if (!user) return errorResponse(404, "Account not found");

    const teams = user.teams.map(({ team, section, post }) => ({
      year: team.year,
      section: team.sections.find(
        ({ _id: sectionId }) => section.toString() === sectionId.toString()
      ).title,
      post: post.title,
      level: post.level,
    }));

    const userDetails = { ...user._doc, teams };

    return userDetails;
  } catch (error) {
    console.log(error);
  }
};

const UserDetailsPage = async ({ params: { userEmail } }) => {
  const data = await getData(userEmail);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row w-full">
        <div className="md:w-fit w-full">
          <img
            src={`${process.env.CLIENT_URL}/api/file/${data.profilePicture}`}
            alt="Profile Photo"
            className="rounded-lg h-64 mx-auto md:my-6"
          />
          <ul className="mt-6 flex text-sm text-gray-600 w-fit flex-col gap-2 mx-auto md:m-0">
            {data.links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank">
                  {link.includes("github.com") ? (
                    <>
                      <GithubFilled className="!text-lg !text-gray-500" />{" "}
                      <span className="hover:underline">
                        @{link.split("/").slice(-1)[0]}
                      </span>
                    </>
                  ) : link.includes("linkedin.com") ? (
                    <>
                      <LinkedinFilled className="!text-lg !text-gray-500" />{" "}
                      <span className="hover:underline">
                        @{link.split("/").slice(-1)[0]}
                      </span>
                    </>
                  ) : link.includes("twitter.com") ? (
                    <>
                      <TwitterCircleFilled className="!text-lg !text-gray-500" />{" "}
                      <span className="hover:underline">
                        @{link.split("/").slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      <LinkOutlined className="!text-lg !text-gray-500" />{" "}
                      <span className="hover:underline"> {link}</span>
                    </>
                  )}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${data.email}`}
                className="mx-auto w-full md:m-0"
              >
                <MailOutlined className="!text-lg !text-gray-500" />{" "}
                <span className="hover:underline">{data.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="ml-[10%] text-xl font-bold text-gray-600 mt-8 flex-1">
          <span className="inline-block">{data.name}</span>
          {data.role && (
            <span className="text-xs text-white bg-red-400 ml-2 px-2 rounded-md py-[1px]">
              {Object.keys(ROLES)[
                Object.values(ROLES).findIndex((value) => value === data.role)
              ].replace("_", " ")}
            </span>
          )}

          <div className="mt-5 text-lg text-gray-800 font-semibold">
            <span className="block">Teams Joined</span>
            <div className="flex flex-wrap">
              {data.teams.length === 0 && (
                <div className="text-gray-500 font-normal italic text-md rounded-lg px-2 py-[1px] mr-2 mt-2">
                  No teams joined
                </div>
              )}
              {/* {console.log(data.teams)} */}

              {data.teams.map((team, index) => (
                <div
                  key={index}
                  className="relative bg-blue-400 text-white text-md rounded-lg px-2 py-[1px] mr-2 mt-2"
                >
                  {team.section} | {team.post}
                  <span className="absolute text-xs font-bold text-white bg-orange-400 rounded-full px-1 py-[1px] -top-3 -right-5">
                    {team.year}
                  </span>
                </div>
              ))}
            </div>
            {/* 
            <div className="flex flex-wrap">
              {data.teams.map((team, index) => (
                <div
                  key={index}
                  className="relative bg-blue-400 text-white text-md text-center rounded-lg px-2 py-[1px] mr-2 mt-2"
                >
                  <div>{team.section} </div>
                  <div className="italic text-base font-normal">
                    {
                      POST_LEVELS.find(({ value }) => value === team.level)
                        .label
                    }{" "}
                    {team.post}
                  </div>

                  <span className="absolute text-xs font-bold text-white bg-orange-400 rounded-full px-1 py-[1px] -top-3 -right-5">
                    {team.year}
                  </span>
                </div>
              ))}
            </div> */}

            <div>
              {data.membershipId && (
                <>
                  <span className="block mt-5">Membership Id</span>
                  <span className="text-sm text-gray-500">
                    {data.membershipId}
                  </span>
                </>
              )}

              <span className="block mt-5">Branch</span>
              <span className="text-sm text-gray-500">
                {BRANCHES.find(({ value }) => value === data.branch).label}
              </span>

              <span className="block mt-5">Year</span>
              <span className="text-sm text-gray-500">
                {YEARS.find(({ value }) => value === data.year).label}
              </span>

              <span className="block mt-5">Roll No</span>
              <span className="text-sm text-gray-500">{data.rollno}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;

// const data = {
//   _id: {
//     $oid: "654f80527386ceff3ccbc147",
//   },
//   email: "dawood.612027.it@mhssce.ac.in",
//   password: "$2b$10$ty6/aBeU5Bvkf4EkKeJMbutKIvlBPtWyhKedwhNtBd/UJN66F3Skq",
//   isMember: true,
//   branch: "IT",
//   name: "Dawood Khatri",
//   rollno: 612027,
//   year: 4,
//   isAdmin: true,
//   links: [
//     "https://github.com/DawoodKhatri",
//     "https://linkedin.com/in/DawoodKhatri",
//   ],
//   role: "superAdmin",
//   teams: [
//     {
//       team: {
//         $oid: "655670b7ba37caa477ae6084",
//       },
//       section: {
//         $oid: "655670bc3115c25729620a01",
//       },
//       post: {
//         $oid: "655670cf3115c25729620a15",
//       },
//     },
//   ],
//   profilePicture: "Profile Pictures/654f80527386ceff3ccbc147-1701973209147",

//membershipId: 12345

// };
