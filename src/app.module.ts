import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProdutosModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
