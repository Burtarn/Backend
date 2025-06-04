    import * as userModel from '../models/userModel.js';

    export const createUser = async ({ username, hashedPassword }) => {
    return await userModel.createUser({ username, hashedPassword });
    };

    export const findUserByUsername = async (username) => {
    return await userModel.findUserByUsername(username);
    };

    export const deleteUserById = async (id) => {
    return await userModel.deleteUserById(id);
    };

    export const deleteUserByUsername = async (username) => {
    return await userModel.deleteUserByUsername(username);
    };
