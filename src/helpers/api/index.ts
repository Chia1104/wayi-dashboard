import { BASE_API } from "@wanin/shared/constant";
import axios, { type AxiosResponse } from "axios";
import type {
  Activity,
  ApiRespond,
  PieTotalChartData,
  WeekChartData,
} from "@wanin/shared/types";
import type { NewActivityDto, UpdateActivityDto } from "@wanin/shared/dto";

export const exportAllPlayers = async (
  token: string,
  activitySlug: string
): Promise<AxiosResponse<Blob>> => {
  return await axios.get(`${BASE_API}/file/export-all-players`, {
    responseType: "blob",
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      "x-activity-slug": activitySlug,
    },
  });
};

export const getTotalCountGroupByRegion = async (
  token: string,
  activitySlug: string
): Promise<AxiosResponse<ApiRespond<PieTotalChartData>>> => {
  return await axios.get(
    `${BASE_API}/aggregate/get-total-count-group-by-region`,
    {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${token}`,
        "x-activity-slug": activitySlug,
      },
    }
  );
};

export const getCountGroupByRegionAndWeek = async (
  token: string,
  activitySlug: string
): Promise<AxiosResponse<ApiRespond<WeekChartData>>> => {
  return await axios.get(
    `${BASE_API}/aggregate/get-count-group-by-region-and-week`,
    {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${token}`,
        "x-activity-slug": activitySlug,
      },
    }
  );
};

export const createNewActivity = async (
  token: string,
  activity: NewActivityDto
): Promise<AxiosResponse<ApiRespond>> => {
  return await axios.post(`${BASE_API}/activity`, activity, {
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateActivity = async (
  token: string,
  id: number,
  activity: UpdateActivityDto
): Promise<AxiosResponse<ApiRespond>> => {
  return await axios.put(`${BASE_API}/activity/${id}`, activity, {
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllActivities = async (
  token: string
): Promise<AxiosResponse<ApiRespond<Activity[]>>> => {
  return await axios.get(`${BASE_API}/activity`, {
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
