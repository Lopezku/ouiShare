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
const getUsersInvitations = async (userId) => {
  try {
    const res = await fetch(BASE_URL + "api/users/invitations/" + userId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
const updateInvitationStatus = async (invitationId, status) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/updateInvitations/" + invitationId,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
export { sendInvitation, updateInvitationStatus, getUsersInvitations };
