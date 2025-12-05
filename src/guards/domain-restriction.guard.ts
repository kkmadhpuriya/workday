import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ALLOWED_DOMAINS_METADATA } from '../decorators/allowed-domains.decorator';

@Injectable()
export class DomainRestrictionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedDomains = this.reflector.getAllAndOverride<string[]>(
      ALLOWED_DOMAINS_METADATA,
      [context.getHandler(), context.getClass()],
    );

    // If decorator is not used, allow access
    if (!allowedDomains || allowedDomains.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const origin = request.headers.origin || request.headers.referer || '';
    const host = request.headers.host || '';

    // Extract domain from origin or referer
    let requestDomain = '';
    if (origin) {
      try {
        const url = new URL(origin);
        requestDomain = url.hostname;
      } catch {
        // If origin is not a valid URL, try to extract domain from string
        requestDomain = origin.replace(/^https?:\/\//, '').split('/')[0];
      }
    } else if (host) {
      requestDomain = host.split(':')[0]; // Remove port if present
    }

    // Check if the request domain matches any allowed domain
    const isAllowed = allowedDomains.some((domain) => {
      // Support exact match and subdomain matching
      return (
        requestDomain === domain ||
        requestDomain.endsWith(`.${domain}`) ||
        requestDomain === `www.${domain}`
      );
    });

    if (!isAllowed) {
      throw new ForbiddenException(
        `Access denied. Domain ${requestDomain} is not allowed.`,
      );
    }

    return true;
  }
}
