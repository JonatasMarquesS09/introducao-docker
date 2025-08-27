import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';
import { UserRole } from '@prisma/client';

@ApiBearerAuth()
@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtoService: ProdutosService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post()
    @ApiOperation({summary: "Cria um Produto"})
    @ApiResponse({ status: 201, description: "Produto criado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    async registration(@Body() data: CreateProductDto) {
        return this.produtoService.create(data)
    }

    @ApiBearerAuth()
    @Get()
    @ApiOperation({summary: "Mostrar todos os produtos"})
    @ApiResponse({ status: 201, description: "Produto encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    async getAll() {
        return this.produtoService.findAll()
    }

    @ApiBearerAuth()
    @Get('id=:id')
    @ApiOperation({summary: "Mostrar os produtos pelo ID"})
    @ApiResponse({ status: 201, description: "Produto encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: "Id do produto", example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async getById(@Param('id') id: string) {
        return this.produtoService.findOne(id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Put('id=:id')
    @ApiOperation({summary: "Atualizar produto pelo Id"})
    @ApiResponse({ status: 201, description: "Produto encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: "Id do produto", example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
        return this.produtoService.update(id, data)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, AdminGuard)
    @Delete('id=:id')
    @ApiOperation({summary: "Deletar produtos pelo ID"})
    @ApiResponse({ status: 201, description: "Produto encontrado com sucesso!!" })
    @ApiResponse({ status: 400, description: "Dados inválidos" })
    @ApiParam({ name: 'id', type: String, description: "Id do produto", example: "4f4e7edf-2c82-4a43-ab47-d49ed9d0cb0a" })
    async delete(@Param('id') id: string) {
        return this.produtoService.remove(id)
    }
}
