import { BASE_URL } from "../config";

const sendInvitation = async (idSender, idReceiver) => {
  try {
    const res = await fetch(BASE_URL + "api/users/sendInvitation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idSender, idReceiver }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { sendInvitation };
