import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Produtos } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) {}

    async create (data: {
        nome: string,
        preco: number,
        descricao: string
    }) {
        return this.prisma.produtos.create({data})
    }

    async findAll () {
        return this.prisma.produtos.findMany()
    }

    async findOne(id: string): Promise<Produtos | null> {
        const foundProduct = await this.prisma.produtos.findUnique(
            {where: {id}}
        )

        if(!foundProduct) {
            throw new NotFoundException(
                `Produto com o ID ${id} não encontrado!`)
        }

        return foundProduct
    }

    async update(id: string, data: Partial<Produtos>): Promise<Produtos> {
        const product = await this.prisma.produtos.findUnique(
            {where: {id}}
        )

        if(!product) throw new BadRequestException('Produto não encontrado!')

        return this.prisma.produtos.update({
            where: {id}, data
        })
    }

    async remove(id: string): Promise<void> {
        const product = await this.prisma.produtos.findUnique(
            {where: {id}}
        )

        if (!product) throw new BadRequestException('Produto não Encontrado!')

        await this.prisma.produtos.delete({where: {id}})
    }
}
