import Mailjet from "node-mailjet";

export const sendVerificationMail = async (name, email, confirmation_link) => {
  try {
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_API_KEY,
      process.env.MJ_API_SECRET
    );

    await mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          
          From: { Email: "dawood.612027.it@mhssce.ac.in", Name: "ACM OFFICE" },
          To:[ { Email: email, Name: name }],
          TemplateID: 5161327,
          TemplateLanguage: true,
          Subject: "Verify your email address to create your account",
          Variables: {
            name: name,
            confirmation_link: confirmation_link,
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
