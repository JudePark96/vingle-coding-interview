import { DataTypes } from 'sequelize';
import sequelize from '../../common/dbConfig';

const serviceEntity = sequelize.define('service', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isUrl: true },
  },
  visits: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
}, {
  underscored: true,
  timestamps: true,
});

export default serviceEntity;
