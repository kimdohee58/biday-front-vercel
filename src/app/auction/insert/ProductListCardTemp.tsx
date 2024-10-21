"use client";

import { FixedSizeList as List, ListChildComponentProps} from "react-window";
import {useQuery} from "@tanstack/react-query";
import {fetchAllProducts} from "@/service/product/product.service";

const productArray = useQuery({queryKey: ["product"], queryFn: fetchAllProducts});

interface Item {
    id: number;
    name: string;
}

interface VirtualizedListProps {
    items: Item[];
}

export default function ProductListCard({items}: VirtualizedListProps) {
    const Row = ({index, style}: ListChildComponentProps) => (
        <div>
            {items[index].name}
        </div>
    );

    return (
        <List height={300}
              itemCount={items.length}
              itemSize={50}
              width={300}
        >
            {Row}
        </List>
    );
};