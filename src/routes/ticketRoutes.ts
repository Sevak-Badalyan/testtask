import { Router } from 'express';
import * as ticketService from '../services/ticketService';

const router = Router();


router.get('/', async (req, res) => {
  try {
    const { from, to } = req.query;

    // Fetch tickets with optional date range filtering
    const tickets = await ticketService.getTicketsByDateRange(from as string, to as string);
    res.json(tickets);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});



router.post('/', async (req, res) => {
  try {
    const { subject, message } = req.body;
    const ticket = await ticketService.createTicket(subject, message);
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message, resolution } = req.body;

    // Check if the status is "Completed" and require a resolution
    if (status === 'Completed' && !resolution) {
      return res.status(400).json({ error: 'Resolution is required when completing a ticket' });
    }

    // Update the ticket status
    const ticket = await ticketService.updateTicketStatus(Number(id), status, message, resolution);
    res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});






// Cancel all "In Progress" tickets


router.post('/cancel-all-in-progress', async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ error: 'Cancellation reason is required' });
    }

    const result = await ticketService.cancelAllInProgressTickets(reason);
    res.json({ message: 'All in-progress tickets cancelled',reason, result });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});




export default router;
