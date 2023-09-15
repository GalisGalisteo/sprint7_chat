import { Request, Response, NextFunction } from "express";


export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    req.user ? next(): res.status(401).json({ error: "not logged in" });
}

export const isLoggedInFront = (req: Request, res: Response) => {
    if (req.user) {
        res.json({ isLoggedIn: true })
    } else {
        res.json({ isLoggedIn: false })
    }
}

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.isAuthenticated()) {
      // User is authenticated, continue to the next middleware
      return next();
    } else {
      // User is not authenticated, send an error response
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };

  export const isAuthenticatedFront = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({ isLoggedIn: true })
    } else {
        res.json({ isLoggedIn: false })
    }
}