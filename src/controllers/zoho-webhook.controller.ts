import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AllowedAccess } from '../decorators/allowed-domains.decorator';

@Controller('webhooks/zoho')
export class ZohoWebhookController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @AllowedAccess(
    process.env.ZOHO_WEBHOOK_KEY || '',
    'zoho.com',
    'zoho.in',
    'zoho.eu',
  )
  async receiveWebhook(
    @Body() body: { requests: { request_status: string } },
    @Headers() headers: Record<string, string>,
  ) {
    // console.log('Received Zoho webhook:', {
    //   body,
    //   headers: {
    //     'x-webhook-key': headers['x-webhook-key'],
    //     origin: headers.origin,
    //     referer: headers.referer,
    //   },
    // });

    const requests = body.requests;
    if (!requests) {
      return {
        success: false,
        message: 'Request is required',
        timestamp: new Date().toISOString(),
      };
    }

    if (!requests.request_status) {
      return {
        success: false,
        message: 'Request status is required',
        timestamp: new Date().toISOString(),
      };
    }

    const requestStatus = requests.request_status;
    if (requestStatus !== 'completed') {
      return {
        success: false,
        message: 'Request status is not completed',
        timestamp: new Date().toISOString(),
      };
    }

    try {
      // basic auth, post method
      const requestData = await fetch(process.env.WORKDAY_URL || '', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.WORKDAY_USERNAME}:${process.env.WORKDAY_PASSWORD}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      });

      const response = await requestData.json();

      console.log('Response from Workday:', response);

      return {
        success: true,
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send request to Workday',
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('summit')
  @HttpCode(HttpStatus.OK)
  @AllowedAccess(
    process.env.ZOHO_WEBHOOK_KEY || '',
    'zoho.com',
    'zoho.in',
    'zoho.eu',
  )
  receiveSummitWebhook(
    @Body() body: Record<string, unknown>,
    @Headers() headers: Record<string, string>,
  ) {
    console.log('Received Zoho Summit webhook:', {
      body,
      headers: {
        'x-webhook-key': headers['x-webhook-key'],
        origin: headers.origin,
        referer: headers.referer,
      },
    });

    return {
      success: true,
      message: 'Summit webhook received successfully',
      timestamp: new Date().toISOString(),
      data: body,
    };
  }
}
