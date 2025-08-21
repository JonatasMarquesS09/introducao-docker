import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @ApiProperty({example: 'Coca-Cola', description: 'Nome do produto'})
    @IsString()
    @IsNotEmpty()
    nome: string

    @ApiProperty({example: 9.99, description: 'Preço do produto'})
    @IsNumber()
    @Type(() => Number)
    preco: number

    @ApiProperty({example: 'Coca-Cola é um refrigerante carbonatado vendido em lojas', description: 'Descrição do produto'})
    @IsString()
    @IsNotEmpty()
    descricao: string
}