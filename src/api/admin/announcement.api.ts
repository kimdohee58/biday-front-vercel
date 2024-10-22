// src/api/announcement/announcement.api.ts
import {AnnouncementModel} from "@/model/admin/announcement.model";
import {api} from "../request";
import {strategy} from "../api.strategy";

// 모든 공지사항 조회 (GET 요청)
const findAll = async (): Promise<AnnouncementModel[]> => {
    return await strategy.GET(`${api.announcement}`, {}); // response.json()이 이미 처리되어 반환됩니다.
};

// 특정 공지사항 조회 (GET 요청)
const findById = async (id: number): Promise<AnnouncementModel> => {
    return await strategy.GET(`${api.announcement}/${id}`, {});
};

// 공지사항 추가 (POST 요청)
const addAnnouncement = async (announcementData: Partial<AnnouncementModel>): Promise<AnnouncementModel> => {
    return await strategy.POST(`${api.announcement}`, {});
};

// 공지사항 삭제 (DELETE 요청)
const delete_ = async (id: number): Promise<void> => {
    await strategy.DELETE(`${api.announcement}/${id}`, {});
};

export const announcementAPI = {
    findAll,
    findById,
    addAnnouncement,
    delete_,
};
