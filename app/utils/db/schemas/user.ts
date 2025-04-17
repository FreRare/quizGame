import {User} from "@/app/models/models";
import {v4 as uuidv4} from "uuid";

export const userSchema = {
    title: "user schema",
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 50,
        },
        firstName: {
            type: 'string',
            maxLength: 50,
        },
        lastName: {
            type: 'string',
            maxLength: 50,
        },
        username: {
            type: 'string',
            maxLength: 25,
        },
        password: {
            type: 'string',
        },
        isAdmin: {
            type: 'boolean',
        },
        dateOfBirth: {
            type: 'string',
            format: 'date-time',
        },
        registrationDate: {
            type: 'string',
            format: 'date-time',
        },
        games: {
            type: 'array',
            items: {type: 'string'},
        },
    },
    required: ['id', 'username', 'password', 'dateOfBirth', 'registrationDate'],
    indexes: ['username', 'dateOfBirth'],
};

export const convertUserToSchema = (u: User) => {
    return {
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username,
        password: u.password,
        isAdmin: u.isAdmin,
        dateOfBirth: u.dateOfBirth.toISOString(),
        registrationDate: u.registrationDate.toISOString(),
    };
}

export const convertSchemaToUser = (s: any): User => {
    return {
        id: s._data.id,
        username: s._data.username,
        firstName: s._data.firstName,
        lastName: s._data.lastName,
        password: s._data.password,
        isAdmin: s._data.isAdmin,
        dateOfBirth: new Date(s._data.dateOfBirth) || new Date(),
        registrationDate: new Date(s._data.registrationDate) || new Date(),
        games: [] // fetch games here
    };
}