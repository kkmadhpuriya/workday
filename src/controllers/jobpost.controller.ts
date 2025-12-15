import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from '../services/redis.service';

interface JobPost {
  jobcode: string;
  designation: string;
  jobdescription: string;
  experience: string;
  job_url: string;
  bu: string;
  posted: string;
  timestamp: string;
}

type JobPostResult =
  | {
      success: false;
      message: string;
      jobPost?: JobPost;
      bu?: string;
      error?: string;
    }
  | { success: true; message: string; bu: string };

@Controller('jobpost')
export class JobPostController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveJobPost(@Body() body: JobPost[]) {
    if (!Array.isArray(body) || body.length === 0) {
      throw new BadRequestException('Request body must be a non-empty array');
    }

    const results: JobPostResult[] = [];

    for (const jobPost of body) {
      if (!jobPost.bu) {
        results.push({
          success: false,
          message: 'bu (business unit) is required',
          jobPost,
        });
        continue;
      }

      try {
        // Use bu as the unique key
        const key = `jobpost:${jobPost.bu}`;
        await this.redisService.setJson(key, jobPost);

        results.push({
          success: true,
          message: 'Job post saved successfully',
          bu: jobPost.bu,
        });
      } catch (error) {
        console.error('Error saving job post to Redis:', error);
        results.push({
          success: false,
          message: 'Failed to save job post',
          bu: jobPost.bu,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      success: true,
      message: 'Job post(s) processed',
      results,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':bu')
  @HttpCode(HttpStatus.OK)
  async getJobPost(@Param('bu') bu: string) {
    if (!bu) {
      throw new BadRequestException('bu (business unit) parameter is required');
    }

    try {
      const key = `jobpost:${bu}`;
      const jobPost = await this.redisService.getJson<JobPost>(key);

      if (!jobPost) {
        throw new NotFoundException(`Job post with bu "${bu}" not found`);
      }

      return {
        success: true,
        data: jobPost,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error getting job post from Redis:', error);
      throw new BadRequestException('Failed to retrieve job post from cache');
    }
  }
}
