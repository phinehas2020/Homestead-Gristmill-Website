
export interface Product {
    id: number | string;
    name: string;
    description: string;
    price: number;
    image: string;
    weight: string;
    category: 'wheat' | 'rye' | 'corn' | 'goods' | string;
    variantId?: string;
    variants?: {
        id: string;
        title: string;
        price: number;
    }[];
    handle: string;
}

export interface CartItem extends Product {
    quantity: number;
}


