export const getDetailsFromEmail = (email) => {
  const user = email.split("@")[0].split(".");
  const name = user[0][0].toUpperCase() + user[0].slice(1);
  const rollno = user[1];
  const branch = user[2];
  return { name, rollno, branch };
};
