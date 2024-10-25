import {SizeModel} from "@/model/product/size.model";
import {ColorType, ProductModel} from "@/model/product/product.model";
import {Colors} from "@/data/color";

export const getColor = (productName: string) => {
    const parts = productName.split(`(`);
    if (parts.length > 1) {
        return parts[1].replace(')', '').trim();
    }
    return "";
};

export const getSizeById = (sizeId: number, sizeModels: SizeModel[]) => {
    const matchingSizeModel = sizeModels.find(sizeModel => sizeModel.id === sizeId);
    console.log(matchingSizeModel)
    return matchingSizeModel ? matchingSizeModel.size : "";
};

export const getColorsByTypes = (types: ColorType[]): typeof Colors[ColorType][] => {
    return types.map(type => Colors[type]);
}

export const getColorsArray = (products: ProductModel[]) => {
    return products.map((product) => {
        return product.color;
    })
};

export const getRandomItems = <T>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
