import { DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const Furniture = sequelize.define("Furniture", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'Name must be between 1 and 255 characters long.',
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        borough: {   
            type: DataTypes.STRING,
            allowNull: false,
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'available',
        },
        claimedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reportedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });

    Furniture.associate = (models) => {
        // Association for the user who claimed the furniture
        Furniture.belongsTo(models.User, {
            as: 'ClaimedBy',
            foreignKey: {
                name: 'clerkUserId',
                allowNull: true, 
            },
            onDelete: 'SET NULL',
        });
    
        // Association for the user who reported the furniture
        Furniture.belongsTo(models.User, {
            as: 'ReportedBy',
            foreignKey: {
                name: 'clerkUserId',
                allowNull: true, 
            },
            onDelete: 'SET NULL', 
        });
    
    }

    return Furniture;
}