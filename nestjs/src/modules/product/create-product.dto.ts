export class CreateProductDto {
    id: number;
    name: string;
    quantity: number;
    price: number;
    sizes: string[];
    category: string;
    imageUrl: string;
}
