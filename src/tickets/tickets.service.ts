import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';

@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Issue with login',
      description: 'User cannot log in to the system.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-10-01T00:00:00Z',
    },
    {
      id: 2,
      subject: 'Feature request: Dark mode',
      description: 'User requests a dark mode feature for the application.',
      priority: 'medium',
      status: 'open',
      createdAt: '2026-11-02T00:00:00Z',
    },
    {
      id: 3,
      subject: 'Bug report: Application crashes on startup',
      description: 'The application crashes immediately upon startup.',
      priority: 'high',
      status: 'closed',
      createdAt: '2026-11-03T00:00:00Z',
    },
  ];

  private nextId = 4;

  findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
    let tickets = this.tickets;

    if (status) {
      tickets = tickets.filter((ticket) => ticket.status === status);
    }
    if (priority) {
      tickets = tickets.filter((ticket) => ticket.priority === priority);
    }
    return tickets;
  }

  findOne(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  create(createTicketDto: CreateTicketDto) {
    const newTicket: Ticket = {
      id: this.nextId++,
      subject: createTicketDto.subject,
      description: createTicketDto.description,
      priority: createTicketDto.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(newTicket);
    return newTicket;
  }
}
