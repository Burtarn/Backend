import { login } from '../controllers/usersController.js'; 
import * as userModel from '../models/userModel'; 
jest.mock('../models/userModel');

describe('loginUser', () => {
    test('ska returnera token vid korrekt inloggning', async () => {
    userModel.getUserByUsername.mockResolvedValue({
        id: 1,
        username: 'anna',
      password: '$2b$10$hashadhere' // bcrypt-hashad version av "1234"
    });

    const bcrypt = require('bcrypt');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // simulate korrekt lösenord

    const token = await loginUser('anna', '1234');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
});

    test('ska kasta fel vid ogiltigt lösenord', async () => {
        userModel.getUserByUsername.mockResolvedValue({
        id: 1,
        username: 'anna',
        password: '$2b$10$hashadhere'
        });

        const bcrypt = require('bcrypt');
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // simulate fel lösenord

        await expect(loginUser('anna', 'fel')).rejects.toThrow('Ogiltiga inloggningsuppgifter');
    });

    test('ska kasta fel om användaren inte finns', async () => {
        userModel.getUserByUsername.mockResolvedValue(null);

        await expect(loginUser('okänd', '1234')).rejects.toThrow('Ogiltiga inloggningsuppgifter');
    });
});
