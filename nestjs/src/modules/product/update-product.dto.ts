import { SizeQuantityDto } from "./size-quantity.dto";

export class UpdateProductDto {
    name: string;
    price: number;
    sizes: SizeQuantityDto[];
    category: string;
    imageUrl: string;
}
