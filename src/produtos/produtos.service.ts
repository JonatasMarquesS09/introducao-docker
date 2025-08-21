import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Produtos } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateProductDto) {
        const product = await this.prisma.produtos.create({
            data: {
                nome: data.nome,
                preco: data.preco,
                descricao: data.descricao
            }
        })
        return product
    }

    async findAll() {
        return this.prisma.produtos.findMany()
    }

    async findOne(id: string): Promise<Produtos | null> {
        const foundProduct = await this.prisma.produtos.findUnique(
            { where: { id } }
        )

        if (!foundProduct) {
            throw new NotFoundException(
                `Produto com o ID ${id} não encontrado!`)
        }

        return foundProduct
    }

    async update(id: string, data: Partial<Produtos>): Promise<Produtos> {
        const product = await this.prisma.produtos.findUnique(
            { where: { id } }
        )

        if (!product) throw new BadRequestException('Produto não encontrado!')

        return this.prisma.produtos.update({
            where: { id }, data
        })
    }

    async remove(id: string) {
        const product = await this.prisma.produtos.findUnique({
            where: { id },
        });

        if (!product) throw new BadRequestException('Produto não Encontrado!');

        return await this.prisma.produtos.delete({
            where: { id },
        });
    }
}
