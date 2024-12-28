import { Injectable } from '@nestjs/common';
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import { PaginatedResponse, PaginationParams } from './pagination.interface';

@Injectable()
export class PaginationService {
    async paginate<T>(
        repository: Repository<T>,
        params: PaginationParams = {},
        where: FindOptionsWhere<T> = {},
    ): Promise<PaginatedResponse<T>> {
        const {
            page = 1,
            limit = 10,
            sortBy = 'id',
            sortOrder = 'DESC',
        } = params;

        const skip = (page - 1) * limit;

        const [data, total] = await repository.findAndCount({
            where,
            take: limit,
            skip,
            order: { [sortBy]: sortOrder } as FindOptionsOrder<T>, // Conversión explícita
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
}
