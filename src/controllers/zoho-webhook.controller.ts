import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WebhookKey } from '../decorators/webhook-key.decorator';
import { AllowedDomains } from '../decorators/allowed-domains.decorator';

@Controller('webhooks/zoho')
export class ZohoWebhookController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @WebhookKey()
  @AllowedDomains('zoho.com', 'zoho.in', 'zoho.eu')
  receiveWebhook(
    @Body() body: Record<string, unknown>,
    @Headers() headers: Record<string, string>,
  ) {
    // Process the webhook data
    console.log('Received Zoho webhook:', {
      body,
      headers: {
        'x-webhook-key': headers['x-webhook-key'],
        origin: headers.origin,
        referer: headers.referer,
      },
    });

    // Add your webhook processing logic here
    return {
      success: true,
      message: 'Webhook received successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('summit')
  @HttpCode(HttpStatus.OK)
  @WebhookKey()
  @AllowedDomains('zoho.com', 'zoho.in', 'zoho.eu')
  receiveSummitWebhook(
    @Body() body: Record<string, unknown>,
    @Headers() headers: Record<string, string>,
  ) {
    // Process the Summit webhook data
    console.log('Received Zoho Summit webhook:', {
      body,
      headers: {
        'x-webhook-key': headers['x-webhook-key'],
        origin: headers.origin,
        referer: headers.referer,
      },
    });

    // Add your Summit webhook processing logic here
    return {
      success: true,
      message: 'Summit webhook received successfully',
      timestamp: new Date().toISOString(),
      data: body,
    };
  }
}
