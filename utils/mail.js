import nodemailer from "nodemailer";
import MailVerification from "@/components/mail/verification";

export const sendVerificationMail = async (email, otp) => {
  const from = "ACM OFFICE";
  const user = process.env.EMAIL_USERNAME;
  const pass = process.env.EMAIL_PASSWORD;

  const date = new Date();
  date.setHours(date.getHours() + 1);

  let mailTemplate = MailVerification({
    name: email.split("@")[0],
    otp: otp,
    validity: 5
  });

  const options = {
    from: `${from} <${user}>`,
    to: email,
    subject: "Email Verification",
    html: mailTemplate,
  };

  let transpoter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
  });

  await transpoter.sendMail(options);
};
