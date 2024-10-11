import {announcementAPI} from "@/api/admin/announcement.api";

export function fetchAnnouncement () {
    announcementAPI.findAll();

}