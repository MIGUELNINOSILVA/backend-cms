import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationService } from 'src/pagination/pagination.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto, UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private readonly productRepository: Repository<Product>,
        private readonly paginationService: PaginationService,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }

    async findAll(query: QueryProductDto) {
        const where: any = {};

        if (query.category) {
            where.category = query.category;
        }

        if (query.search) {
            where.name = Like(`%${query.search}%`);
        }

        return this.paginationService.paginate(
            this.productRepository,
            {
                page: query.page,
                limit: query.limit,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            },
            where,
        );
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOneOrFail({ where: { id } });
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.productRepository.update(id, updateProductDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

}
