import { Request } from 'express';
import asyncHandler from 'express-async-handler';
import Author from '../models/author';

export interface AuthorRequest
  extends Request<{
    id: string;
  }> {}

// Display list of all Authors.
export const author_list = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author list');
  }
);

// Display detail page for a specific Author.
export const author_detail = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  }
);

// Display Author create form on GET.
export const author_create_get = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author create GET');
  }
);

// Handle Author create on POST.
export const author_create_post = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author create POST');
  }
);

// Hnadle Author delete form on GET
export const author_delete_get = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
  }
);

// Handle Author delete on POST
export const author_delete_post = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
  }
);

// Handle Author update form on GET
export const author_update_get = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author update GET');
  }
);

// Handle Author delete on POST
export const author_update_post = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Author update POST');
  }
);
