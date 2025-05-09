import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database';

interface TicketAttributes {
  id: number;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Cancelled';
  resolution?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Make `status` optional during creation
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id' | 'status' | 'resolution' | 'cancellationReason' | 'createdAt' | 'updatedAt'> {}

class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public subject!: string;
  public message!: string;
  public status!: 'New' | 'In Progress' | 'Completed' | 'Cancelled';
  public resolution?: string;
  public cancellationReason?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('New', 'In Progress', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'New',
    },
    resolution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
    tableName: 'Tickets',
  }
);

export default Ticket;
