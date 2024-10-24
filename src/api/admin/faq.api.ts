// src/api/faq/faq.api.ts
import {FaqModel} from "@/model/admin/faq.model";
import {api} from "../request";
import {strategy} from "../api.strategy";

// 모든 질문 조회
const findAll = async (): Promise<FaqModel[]> => {
    return await strategy.GET(`${api.faq}`, {});
};

// 특정 질문 ID로 질문 조회
const findById = async (id: number): Promise<FaqModel> => {
    return await strategy.GET(`${api.faq}/${id}`, {});
};
// 새로운 질문 등록
const addQuestion = async (questionData: Partial<FaqModel>): Promise<FaqModel> => {
    return await strategy.POST(`${api.faq}`, {});
};

// 특정 질문 삭제
const deleteById = async (id: number): Promise<void> => {
    await strategy.DELETE(`${api.faq}/${id}`, {});
};

// 특정 질문 존재 여부 확인
const existsById = async (id: number): Promise<boolean> => {
    return await strategy.GET(`${api.faq}/exists/${id}`, {});
};

export const faqAPI = {
    findAll,
    findById,
    addQuestion,
    deleteById,
    existsById,
};
