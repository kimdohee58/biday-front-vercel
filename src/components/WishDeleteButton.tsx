//src/components/WishDeleteButton.tsx

import React, {FC} from "react";
import {fetchDeleteWish} from "@/service/product/wish.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export interface WishDeleteProps {
    id: number;
    className?: string;
    contentClass?: string;
}

const WishDeleteButton: FC<WishDeleteProps> = ({
                                                   id,
                                                   className = "",
                                                   contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium"
                                               }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: fetchDeleteWish,
        onSuccess: (data: boolean) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ['fetchWishes'] });
            }
        },
    });

    const onClickDelete = async (event: React.MouseEvent) => {
        event.preventDefault();
        mutation.mutate(id);
    }

    return (
        <div className={`${className}`}>
            <div
                className={`flex items-center border-2 border-red-500 rounded-lg ${contentClass}`}
            >
                <button
                    className="text-red-500 !leading-none"
                    onClick={onClickDelete}
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default WishDeleteButton;