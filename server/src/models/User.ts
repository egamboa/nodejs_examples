import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/db'

interface UserAttributes {
  id: number
  email: string
  password_hash: string
  role: string
  created_at?: Date
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role'>

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public email!: string
  public password_hash!: string
  public role!: string
  public created_at!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
  },
)
