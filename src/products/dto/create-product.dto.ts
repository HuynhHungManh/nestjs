import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    description: string;

    @IsString()
    @IsNotEmpty()
    price: string;
}
