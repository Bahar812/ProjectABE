import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Category = db.define('category', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate : {
            notEmpty : true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty : true,
            len: [3, 100]
        }
    },
    status : DataTypes.INTEGER,
},{
    freezeTableName : true
})

export default Category;