
    export default function errorHandler(err, req, res, next) {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || 'Något gick fel på servern';


    const response = { message };
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(status).json(response);
    }
