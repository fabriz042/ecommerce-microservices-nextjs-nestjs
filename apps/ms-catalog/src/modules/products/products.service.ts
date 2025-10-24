import { Injectable } from '@nestjs/common';
import { RpcNotFound } from '@packages/shared';
import { RpcException } from '@nestjs/microservices';
import { DatabaseService } from '../../common/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterDto } from 'src/common/dtos/filter.dtos';
import { ToolCallRequestDto } from './dto/mcp-request.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  //Get all
  async findAll(filterDto: FilterDto) {
    //Pagination params
    const page = filterDto.page ?? 1;
    const limit = Math.min(filterDto.limit ?? 10, 100);

    //Filters
    const { search, category, status } = filterDto;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (category) {
      where.category = { name: category };
    }

    if (status) {
      where.status = { name: status };
    }

    //Query
    const totalResults = await this.db.product.count({ where });
    const products = await this.db.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        name: true,
        slug: true,
        price: true,
        status: {
          select: {
            name: true,
          },
        },
        image: {
          select: {
            imageUrl: true,
            alt: true,
            order: true,
          },
        },
      },
    });

    // Meta info
    const totalPages = Math.ceil(totalResults / limit);
    const hasNext = totalResults > page * limit;
    const hasPrevious = page > 1;

    //Response
    return {
      meta: {
        total: totalResults,
        page: page,
        perPage: limit,
        totalPages: totalPages,
        hasNext: hasNext,
        hasPrevious: hasPrevious,
      },
      data: products,
    };
  }

  //Get one
  async findOne(id: string) {
    const product = await this.db.product.findUnique({
      where: { id },
    });

    if (!product) throw RpcNotFound(`Product ${id} not found`);
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    // Generate slug if not provided
    const slugify = require('slugify');
    const slug =
      createProductDto.slug ||
      slugify(createProductDto.name, { lower: true, strict: true });

    // Check if slug is unique
    const existingProduct = await this.db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      throw new RpcException({
        status: 400,
        message: `Product with slug ${slug} already exists.`,
      });
    }

    // Destructure the DTO to separate relations from main product data
    const {
      bag,
      glove,
      airgear,
      oil,
      trophy,
      imageIds,
      sportIds,
      tagIds,
      ...productData
    } = createProductDto;

    // Save the product to the database
    try {
      const created = await this.db.product.create({
        data: {
          ...productData,
          slug,
          ...(bag && { bag: { create: bag } }),
          ...(glove && { glove: { create: glove } }),
          ...(airgear && { airgear: { create: airgear } }),
          ...(oil && { oil: { create: oil } }),
          ...(trophy && { trophy: { create: trophy } }),
          ...(imageIds &&
            imageIds.length > 0 && {
              image: {
                connect: imageIds.map((id: string) => ({ id })),
              },
            }),
          ...(sportIds &&
            sportIds.length > 0 && {
              sport: {
                connect: sportIds.map((id: string) => ({ id })),
              },
            }),
          ...(tagIds &&
            tagIds.length > 0 && {
              tag: {
                connect: tagIds.map((id: string) => ({ id })),
              },
            }),
        },
      });
      return created;
    } catch (error) {
      // Handle foreign key constraint errors
      if (error.code === 'P2003') {
        const field = error.meta?.constraint?.split('_')[1] || 'foreign key';
        throw new RpcException({
          status: 400,
          message: `Invalid ${field}. Entity not found.`,
        });
      }
      throw error;
    }
  }

  //Update
  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const {
      bag,
      glove,
      airgear,
      oil,
      trophy,
      imageIds,
      sportIds,
      tagIds,
      ...productData
    } = updateProductDto;

    const updatedProduct = await this.db.product.update({
      where: { id },
      data: { ...productData },
    });

    return updatedProduct;
  }

  //Delete
  async remove(id: string) {
    await this.findOne(id);
    return this.db.product.delete({ where: { id } });
  }

  //---------------------------------------------------------------
  // Additional methods to other microservices
  //---------------------------------------------------------------

  //---------------------------------------------------------------
  // MS-ORDERS

  async validateProduct(ids: string[]) {
    ids = Array.from(new Set(ids));
    const products = await this.db.product.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (products.length !== ids.length)
      throw new RpcException({
        status: 404,
        message: 'Some products not found',
      });

    return products;
  }

  //----------------------------------------------------------------
  // MS-CHATBOT

  async searchProducts(toolCallRequestDto: ToolCallRequestDto) {
    const { id, function: func } = toolCallRequestDto;

    const args = JSON.parse(func.arguments);
    const query = args.query;

    console.log('Searching products with query:', query);

    const products = await this.db.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
        price: true,
      },
    });

    //TODO: make a response DTO
    return {
      role: 'tool',
      name: func.name,
      tool_call_id: id,
      content: products,
    };
  }
}
