import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (!redisUrl) {
      throw new Error('REDIS_URL is not configured in environment variables');
    }
    this.client = new Redis(redisUrl);
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
    this.client.on('connect', () => {
      console.log('Redis Client Connected');
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.quit();
    }
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async setJson(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async getJson<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Error parsing JSON from Redis:', error);
      return null;
    }
  }
}
