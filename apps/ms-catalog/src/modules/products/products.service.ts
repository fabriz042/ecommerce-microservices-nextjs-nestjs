import { Injectable } from '@nestjs/common';
import { RpcNotFound } from '@packages/shared';
import { RpcException } from '@nestjs/microservices';
import { DatabaseService } from '../../common/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterDto } from 'src/common/dtos/filter.dtos';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  //Get all
  async findAll(filterDto: FilterDto) {
    //Pagination params
    const page = filterDto.page ?? 1;
    const per_page = Math.min(filterDto.per_page ?? 10, 100);

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
      where.category = { id: category };
    }

    if (status) {
      where.status = { id: status };
    }

    //Query
    const totalResults = await this.db.product.count({ where });
    const products = await this.db.product.findMany({
      where,
      skip: (page - 1) * per_page,
      take: per_page,
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
            image_url: true,
            alt_text: true,
            order: true,
          },
        },
      },
    });

    // Meta info
    const totalPages = Math.ceil(totalResults / per_page);
    const hasNext = totalResults > page * per_page;
    const hasPrevious = page > 1;

    //Response
    return {
      meta: {
        total_items: totalResults,
        current_page: page,
        per_page: per_page,
        total_pages: totalPages,
        has_next: hasNext,
        has_previous: hasPrevious,
      },
      data: products,
    };
  }

  //Get one
  async findOne(slug: string) {
    const fullProduct = await this.db.product.findUnique({
      where: { slug },
      include: {
        image: true,
        sport: true,
        tag: true,
        status: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
        bag: true,
        glove: true,
        airgear: true,
        oil: true,
        trophy: true,
      },
    });

    if (!fullProduct) throw RpcNotFound(`Product ${slug} not found`);

    // Exclude product-types relations that are null and exclude foreign keys
    const {
      bag,
      glove,
      airgear,
      oil,
      trophy,
      statusId,
      brandId,
      categoryId,
      ...rest
    } = fullProduct;

    return {
      ...rest,
      ...(bag && { bag }),
      ...(glove && { glove }),
      ...(airgear && { airgear }),
      ...(oil && { oil }),
      ...(trophy && { trophy }),
    };
  }

  //Get recommendations
  async findRecommendations(id: string) {
    const product = await this.db.product.findUnique({
      where: { id },
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
            image_url: true,
            alt_text: true,
            order: true,
          },
        },
      },
    });
    // TODO : Implement recommendation algorithm
    return Array(6).fill(product);
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
      images,
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
          ...(images &&
            images.length > 0 && {
              image: {
                create: images,
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
        include: {
          image: true,
          sport: true,
          tag: true,
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
    const existingProduct = await this.db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new RpcException({
        status: 400,
        message: `Product ${id} not found.`,
      });
    }

    const {
      bag,
      glove,
      airgear,
      oil,
      trophy,
      images,
      sportIds,
      tagIds,
      ...productData
    } = updateProductDto;

    const updatedProduct = await this.db.product.update({
      where: { id },
      data: {
        ...productData,
        ...(images && {
          image: {
            deleteMany: {},
            create: images,
          },
        }),
      },
    });

    return updatedProduct;
  }

  //Delete
  async remove(id: string) {
    await this.findOne(id);
    return this.db.product.delete({ where: { id } });
  }

  //---------------------------------------------
  // Additional methods to other ms
  //---------------------------------------------

  //Validate products
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
}
