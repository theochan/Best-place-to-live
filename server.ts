/**
 * WhereSG AI - Full Stack Express Server with Vite Middleware
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { orchestrateSearch } from './src/lib/engine/orchestrator';
import { oneMapProvider } from './src/lib/providers/onemap';
import { ltaProvider } from './src/lib/providers/lta';
import { uraProvider } from './src/lib/providers/ura';
import { dataGovSgProvider } from './src/lib/providers/dataGovSg';
import { singStatProvider } from './src/lib/providers/singstat';
import { masProvider } from './src/lib/providers/mas';
import { geminiProvider } from './src/lib/providers/gemini';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check & provider status endpoint
  app.get('/api/health', async (req, res) => {
    try {
      const providers = await Promise.all([
        oneMapProvider.getStatus(),
        ltaProvider.getStatus(),
        uraProvider.getStatus(),
        dataGovSgProvider.getStatus(),
        singStatProvider.getStatus(),
        masProvider.getStatus(),
        geminiProvider.getStatus()
      ]);

      res.json({
        status: 'ok',
        appName: 'WhereSG AI',
        timestamp: new Date().toISOString(),
        providers
      });
    } catch (err) {
      res.status(500).json({ status: 'error', message: (err as Error).message });
    }
  });

  // 2. Providers list endpoint for Data Sources page
  app.get('/api/providers', async (req, res) => {
    try {
      const providers = await Promise.all([
        oneMapProvider.getStatus(),
        ltaProvider.getStatus(),
        uraProvider.getStatus(),
        dataGovSgProvider.getStatus(),
        singStatProvider.getStatus(),
        masProvider.getStatus(),
        geminiProvider.getStatus()
      ]);
      res.json({ providers });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // 3. Geocode endpoint for location resolution
  app.post('/api/geocode', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query parameter is required' });
        return;
      }
      const result = await oneMapProvider.geocode(query);
      res.json({ result });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // 4. Main Search Orchestration API
  app.post('/api/search', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        res.status(400).json({ error: 'Please enter a search description.' });
        return;
      }

      const response = await orchestrateSearch(query.trim());
      res.json(response);
    } catch (err) {
      console.error('[API /api/search Error]', err);
      res.status(500).json({
        error: 'An error occurred while analyzing Singapore location data.',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  });

  // 5. Vite Middleware or Static Assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
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
    console.log(`WhereSG AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
