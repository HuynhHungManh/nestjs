import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsRepository)
        private productsRepository: ProductsRepository,
    ) {}

    public async findAll(): Promise<Products[]> {
        return await this.productsRepository.findAll();
    }

    public async findOne(productId: number): Promise<Products> {
        const product = await this.productsRepository.findById(productId);
        if (!product) {
            throw new NotFoundException(`Product #${productId} not found`);
        }
        return product;
    }

    public async create(
        createProductDto: CreateProductDto,
    ): Promise<Products> {
        try {
          return await this.productsRepository.createProduct(createProductDto);
        } catch (err) {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async update(
        productId: number,
        updateProductDto: UpdateProductDto,
    ): Promise<Products> {
        const product = await this.productsRepository.findOne(productId);
        if (!product) {
            throw new NotFoundException(`Product #${productId} not found`);
        }
        return this.productsRepository.editProduct(productId, updateProductDto);
    }

    public async remove(productId: number): Promise<void> {
        await this.productsRepository.delete(productId);
    }
}
