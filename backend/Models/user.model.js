import { DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        clerkUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Clerk user ID must be unique.',
            },
            primaryKey: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'Clerk user ID must be between 1 and 255 characters long.',
                },
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Username must be unique.',
            },
            validate: {
                len: {
                    args: [3, 50],
                    msg: 'Username must be between 3 and 50 characters long.',
                },
            },
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email must be unique.',
            },
            validate: {
                isEmail: {
                    msg: 'Must be a valid email address.',
                },
            },
        }
    });
    
    User.associate = (models) => {
        // Association for claimed furniture
        User.hasMany(models.Furniture, {
            as: 'ClaimedFurniture',
            foreignKey: 'claimedBy',
            onDelete: 'CASCADE',
        });
        
        // Association for reported furniture
        User.hasMany(models.Furniture, {
            as: 'ReportedFurniture',
            foreignKey: 'reportedBy',
            onDelete: 'CASCADE',
        });
    };
    
    return User;
}