    const { login } = require('./auth');
    const db = require('./db');

    jest.mock('./db'); 

    test('ska logga in en användare med rätt lösenord', async () => {
    db.getUser.mockResolvedValue({ username: 'anna', password: '1234' });

    const response = await login('anna', '1234');

    expect(response.message).toBe('Välkommen!');
    });

    test('ska kasta fel vid fel lösenord', async () => {
    db.getUser.mockResolvedValue({ username: 'anna', password: '1234' });

    await expect(login('anna', 'fel')).rejects.toThrow('Ogiltiga inloggningsuppgifter');
    });
