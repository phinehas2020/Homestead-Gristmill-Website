
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    weight: string;
    category: 'wheat' | 'rye' | 'corn' | 'goods';
}

export interface CartItem extends Product {
    quantity: number;
}

export type CursorVariant = 'default' | 'hover' | 'text';
