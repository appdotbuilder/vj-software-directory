import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schema types
import { 
  createVjSoftwareInputSchema, 
  updateVjSoftwareInputSchema,
  searchVjSoftwareInputSchema,
  deleteVjSoftwareInputSchema,
  getVjSoftwareInputSchema
} from './schema';

// Import handlers
import { createVjSoftware } from './handlers/create_vj_software';
import { getAllVjSoftware } from './handlers/get_all_vj_software';
import { getVjSoftwareById } from './handlers/get_vj_software_by_id';
import { searchVjSoftware } from './handlers/search_vj_software';
import { updateVjSoftware } from './handlers/update_vj_software';
import { deleteVjSoftware } from './handlers/delete_vj_software';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Create a new VJ software entry
  createVjSoftware: publicProcedure
    .input(createVjSoftwareInputSchema)
    .mutation(({ input }) => createVjSoftware(input)),

  // Get all VJ software entries
  getAllVjSoftware: publicProcedure
    .query(() => getAllVjSoftware()),

  // Get a single VJ software entry by ID
  getVjSoftwareById: publicProcedure
    .input(getVjSoftwareInputSchema)
    .query(({ input }) => getVjSoftwareById(input)),

  // Search and filter VJ software entries
  searchVjSoftware: publicProcedure
    .input(searchVjSoftwareInputSchema)
    .query(({ input }) => searchVjSoftware(input)),

  // Update an existing VJ software entry
  updateVjSoftware: publicProcedure
    .input(updateVjSoftwareInputSchema)
    .mutation(({ input }) => updateVjSoftware(input)),

  // Delete a VJ software entry
  deleteVjSoftware: publicProcedure
    .input(deleteVjSoftwareInputSchema)
    .mutation(({ input }) => deleteVjSoftware(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`VJ Software Directory TRPC server listening at port: ${port}`);
}

start();