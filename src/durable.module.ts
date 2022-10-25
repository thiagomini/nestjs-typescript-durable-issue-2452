import { Controller, Get } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Field, ObjectType, Resolver, Query } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class DurableService {
  public instanceCounter = 0;

  constructor(@Inject(REQUEST) public readonly requestPayload: unknown) {}

  greeting() {
    ++this.instanceCounter;
    return `Hello world! Counter: ${this.instanceCounter}`;
  }
}


@Controller('durable')
export class DurableController {
  constructor(private readonly durableService: DurableService) {}

  @Get()
  greeting(): string {
    return this.durableService.greeting();
  }

  @Get('echo')
  echo() {
    return this.durableService.requestPayload;
  }
}

@ObjectType('Durable')
class DurableDto {
    @Field(() => String, { nullable: true })
    id: string
}

@Resolver(() => DurableDto)
export class DurableResolver {
  constructor(private readonly service: DurableService) {}

  @Query(() => DurableDto)
  async durable() {
    return {
        id: this.service.greeting()
    }
  }
}

@Module({
  controllers: [DurableController],
  providers: [DurableService, DurableResolver],
})
export class DurableModule {}
