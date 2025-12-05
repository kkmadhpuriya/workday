import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { WEBHOOK_KEY_METADATA } from '../decorators/webhook-key.decorator';

@Injectable()
export class WebhookKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredKey = this.reflector.getAllAndOverride<string | boolean>(
      WEBHOOK_KEY_METADATA,
      [context.getHandler(), context.getClass()],
    );

    // If decorator is not used, allow access
    if (!requiredKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const query = request.query as { key?: string } | undefined;
    const body = request.body as { key?: string } | undefined;
    const providedKey =
      (request.headers['x-webhook-key'] as string | undefined) ||
      query?.key ||
      body?.key;

    // Get the expected key from environment or use the one from decorator
    const expectedKey =
      typeof requiredKey === 'string'
        ? requiredKey
        : process.env.ZOHO_WEBHOOK_KEY;

    if (!expectedKey) {
      throw new UnauthorizedException(
        'Webhook key is not configured. Please set ZOHO_WEBHOOK_KEY environment variable.',
      );
    }

    if (!providedKey || providedKey !== expectedKey) {
      throw new UnauthorizedException('Invalid webhook key');
    }

    return true;
  }
}
