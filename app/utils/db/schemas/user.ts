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