import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @ApiProperty({example: "Coca-Cola", description: "Nome do produto"})
    @IsString()
    @IsNotEmpty({message: "O nome do produto é obrigatório"})
    nome: string

    @ApiProperty({example: 9.99, description: "Preço do produto"})
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty({message: "O preço é obrigatório"})
    preco: number

    @ApiProperty({example: "Coca-Cola é um refrigerante carbonatado vendido em lojas", description: "Descrição do produto"})
    @IsString()
    @IsNotEmpty({message: "A descrição é obrigatória"})
    descricao: string
}