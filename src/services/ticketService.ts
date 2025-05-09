
import Ticket from '../models/ticket';
import { Op } from 'sequelize';


export const createTicket = async (subject: string, message: string) => {
  try {
    const ticket = await Ticket.create({
      subject,
      message
      // status: 'New',  
    });
    return ticket;
  } catch (error) {
    console.error('Failed to create ticket:', error);

    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred while creating ticket');
    }
  }
};



export const getAllTickets = async (filter: any = {}) => {
  return Ticket.findAll({
    where: filter,
    order: [['createdAt', 'DESC']],
  });
};


export const getTicketById = async (id: number) => {
  return Ticket.findByPk(id);
};



export const getTicketsByDateRange = async (from?: string, to?: string) => {
  const whereClause: any = {};

  // Add date filters if present
  if (from || to) {
    whereClause.createdAt = {};
    if (from) whereClause.createdAt[Op.gte] = new Date(from);
    if (to) whereClause.createdAt[Op.lte] = new Date(to);
  }

  return Ticket.findAll({ where: whereClause, order: [['createdAt', 'DESC']] });
};



export const updateTicketStatus = async (id: number, status: string, message?: string, resolution?: string) => {
  const updates: any = { status };

  if (message) updates.message = message;
  if (status === 'Completed' && resolution) updates.resolution = resolution;

  const [affectedRows, [updatedTicket]] = await Ticket.update(updates, {
    where: { id },
    returning: true,
  });

  if (affectedRows === 0) {
    throw new Error('Ticket not found');
  }

  return updatedTicket;
};




export const cancelAllInProgressTickets = async (reason: string) => {
  return Ticket.update(
    { status: 'Cancelled', cancellationReason: reason },
    { where: { status: 'In Progress' } }
  );
};


