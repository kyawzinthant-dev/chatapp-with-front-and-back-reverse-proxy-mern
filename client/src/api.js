import axios from "axios";

export const deleteMsgDb = async (uuid) => {
    await axios(`/api/deletemessage/${uuid}`)
}

export const acceptReq = async (userid) => {
    return await axios(`/api/responseaccept/${userid}`)
}

export const denyReq = async (userid) => {
    return await axios(`/api/responsedeny/${userid}`)
}

export const doReq = async (userid) => {
    return await axios(`/api/requestcontact/${userid}`)
}