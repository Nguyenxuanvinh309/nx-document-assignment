import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import {
  Documents
} from '../app/router';

// Define routes
const rootRoute = createRootRoute();
// Define child routes in an array
const routes = [
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: Documents }),
  createRoute({ getParentRoute: () => rootRoute, path: "/document", component: Documents }),
  createRoute({ getParentRoute: () => rootRoute, path: "*", component: () => 'Not found' }), // Catch-all route
];

const routeTree = rootRoute.addChildren(routes);

const router = createRouter({ routeTree });

export {
  router
};