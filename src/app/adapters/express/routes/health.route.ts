import express from 'express';

const healthRoutes = express.Router();

healthRoutes.get('/', (req, res) => {
    res.json({ message: 'This is a simple GET request handler' });
});
export default healthRoutes;