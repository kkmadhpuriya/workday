import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZohoWebhookController } from './controllers/zoho-webhook.controller';
import { WebhookKeyGuard } from './guards/webhook-key.guard';
import { DomainRestrictionGuard } from './guards/domain-restriction.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, ZohoWebhookController],
  providers: [AppService, WebhookKeyGuard, DomainRestrictionGuard],
})
export class AppModule {}
