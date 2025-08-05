import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @ApiProperty({example: 'Coca-Cola'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({example: '9,99'})
    @IsNumber()
    @Type(() => Number)
    preco: number

    @ApiProperty({example: 'Coca-Cola é um refrigerante carbonatado vendido em lojas'})
    @IsString()
    @IsNotEmpty()
    descricao: string
}