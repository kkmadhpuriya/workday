import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZohoWebhookController } from './controllers/zoho-webhook.controller';
import { WebhookKeyGuard } from './guards/webhook-key.guard';
import { DomainRestrictionGuard } from './guards/domain-restriction.guard';

@Module({
  imports: [],
  controllers: [AppController, ZohoWebhookController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: WebhookKeyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: DomainRestrictionGuard,
    },
  ],
})
export class AppModule {}
