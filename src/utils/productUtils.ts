import {SizeModel} from "@/model/product/size.model";

export const getColor = (productName: string) => {
    const parts = productName.split(`(`);
    if (parts.length > 1) {
        return parts[1].replace(')', '').trim();
    }
    return "";
};

export const getSizeById = (sizeId: number, sizeModels: SizeModel[]) => {
    const matchingSizeModel = sizeModels.find(sizeModel => sizeModel.id === sizeId);
    return matchingSizeModel ? matchingSizeModel.size : "";
}