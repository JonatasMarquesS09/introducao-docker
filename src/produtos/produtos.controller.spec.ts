import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("ProdutosController", () => {
    let controller: ProdutosController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProdutosController],
            providers: [
                {provide: ProdutosService, useValue: mockProductService},
            ],
        }).compile()

        controller = module.get<ProdutosController>(ProdutosController)
    })

    it("Deve criar um novo produto", async () => {
        const product = {nome: "Nescau", preco: 9.90, descricao: "Achocolatado"}

        mockProductService.create.mockResolvedValue(product)

        expect(await controller.registration(product as any)).toEqual(product)
        expect(mockProductService.create).toHaveBeenCalledWith(product)
    })

    it("Deve montra todos os produtos", async () => {
        const product = {nome: "Nescau", preco: 9.90, descricao: "Achocolatado"}

        mockProductService.findAll.mockResolvedValue(product)

        expect(await controller.getAll()).toEqual(product)
    })

    it("Deve mostra um produto pelo ID", async () => {
        const product = {id: 1, nome: "Nescau", preco: 9.90, descricao: "Achocolatado"}

        mockProductService.findOne.mockResolvedValue(product)

        expect(await controller.getById("1")).toEqual(product)
        expect(mockProductService.findOne).toHaveBeenCalledWith("1")
    })

    it("Deve atualizar um produto", async () => {
        const newProduct = {id: 1, nome: "Nescau", preco: 9.90, descricao: "Achocolatado"}

        mockProductService.update.mockResolvedValue(newProduct)

        expect(await controller.updateProduct("1", {nome: "Nescau", preco: 9.90, descricao: "Achocolatado"})).toEqual(newProduct)
    })

    it("Deve remove um produto", async () => {
        const removed = {id: 1, nome: "Nescau", preco: 9.90, descricao: "Achocolatado"}

        mockProductService.remove.mockResolvedValue(removed)

        expect(await controller.delete('1')).toEqual(removed)
    })
})