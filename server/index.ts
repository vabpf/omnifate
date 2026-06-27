import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import fateAnalysisRouter from './routes/fate-analysis';
import numerologyPartRouter from './routes/numerology-part';

dotenv.config();

const app = express();
const PORT = 6868;

app.use(express.json());

app.use(fateAnalysisRouter);
app.use(numerologyPartRouter);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is booted and listening on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
