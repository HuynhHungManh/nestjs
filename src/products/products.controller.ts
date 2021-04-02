import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Delete,
    NotFoundException
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/products.entity';

@Controller('/api/products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    public async findAll(): Promise<Products[]> {
        return await this.productsService.findAll();
    }

    @Get('/:productId')
    public async findOne(@Param('productId') productId: number): Promise<Products> {
        return await this.productsService.findOne(productId);
    }

    @Post()
    public async create(
        @Body() createProductsDto: CreateProductDto,
    ): Promise<Products> {
        return await this.productsService.create(createProductsDto);
    }

    @Patch('/:productId')
    public async update(
        @Body() updateProductDto: UpdateProductDto,
        @Param('productId') productId: number,
    ): Promise<Products> {
        const product = await this.productsService.update(
            productId,
            updateProductDto,
        );
        return product;
    }

    @Delete('/:productId')
    public async delete(@Param('productId') productId: number): Promise<void> {
        const product = await this.findOne(productId);
        if (!product) {
            throw new NotFoundException(`Product #${product} not found`);
        }

        return await this.productsService.remove(productId);
    }
}
