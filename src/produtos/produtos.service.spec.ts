import { Test, TestingModule } from "@nestjs/testing";
import { ProdutosService } from "./produtos.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

const mockPrisma = {
    produtos: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("ProdutosService", () => {
    let service: ProdutosService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProdutosService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile()

        service = module.get<ProdutosService>(ProdutosService)
    })

    it("Deve criar um novo produto", async () => {
        const product = { nome: "Nescau", preco: 9.90, descricao: "Achocolatado" }

        mockPrisma.produtos.create.mockResolvedValue(product)

        const result = await service.create(product as any)

        expect(result).toEqual(product)
        expect(mockPrisma.produtos.create).toHaveBeenCalledWith({ data: product })
    })

    it("Deve listar todos os produtod", async () => {
        const product = [
            { nome: "Nescau", preco: 9.90, lancamento: "Achocalatado" },
            { nome: "Biscoito", preco: 5.50, lancamento: "Biscoito recheado" }
        ]

        mockPrisma.produtos.findMany.mockResolvedValue(product)

        expect(await service.findAll()).toEqual(product)
    })

    it("Deve monstra um produto pelo ID", async () => {
        const product = { id: 1, nome: "Nescau", preco: 9.90, descricao: "Achocolatado" }

        mockPrisma.produtos.findUnique.mockResolvedValue(product)

        expect(await service.findOne("1")).toEqual(product)
    })

    it("Deve atualizar um produto", async () => {
        const newProduct = { id: 1, nome: "Fone de ouvidos", preco: 25.00, descricao: "Ótimo para escutar musica" }

        mockPrisma.produtos.update.mockResolvedValue(newProduct)

        expect(await service.update("1", { nome: "Fone de ouvidos", preco: 25.00, descricao: "Ótimo para escutar musica" })).toEqual(newProduct)
    })

    it("Deve deletar um produto", async () => {
        const removed = { id: '1' }

        mockPrisma.produtos.delete.mockResolvedValue(removed)

        const result = await service.remove('1');

        expect(result).toEqual(removed);
        expect(mockPrisma.produtos.delete).toHaveBeenCalledWith({
            where: { id: '1' }
        });
    })

    it("Deve mostrar erro se não encontra um produto", async () => {
        mockPrisma.produtos.findUnique.mockResolvedValue(null)

        await expect(service.findOne('999')).rejects.toThrow(NotFoundException)
    })

    it('Deve lançar erro ao atualizar produto inexistente', async () => {
        mockPrisma.produtos.update.mockRejectedValue(new Error('Not found'));

        await expect(service.update('999', { nome: 'Teste' })).rejects.toThrow();
    });

    it('Deve lançar erro ao deletar produto inexistente', async () => {
        mockPrisma.produtos.delete.mockRejectedValue(new Error('Not found'));

        await expect(service.remove('999')).rejects.toThrow();
    });
})