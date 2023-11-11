import { HTTP_METHODS } from "@/constants/httpMethods";
import httpRequest from "@/utils/httpRequest";

const EventService = {
  getAllEvents: async () => {
    const res = await httpRequest(`/api/events`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },
};

export default EventService;
