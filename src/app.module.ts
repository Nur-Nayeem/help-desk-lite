import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module.js';

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com

    TicketsModule,
  ],
})
export class AppModule {}
