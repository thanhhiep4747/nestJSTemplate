import { SizeQuantityDto } from "./size-quantity.dto";

export class CreateProductDto {
    name: string;
    price: number;
    sizes: SizeQuantityDto[];
    category: number;
    imageUrl: string;
}
