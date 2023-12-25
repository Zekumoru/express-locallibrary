import { Request } from 'express';
import asyncHandler from 'express-async-handler';
import Author from '../models/author';
import Book from '../models/book';

export interface AuthorRequest
  extends Request<{
    id: string;
  }> {}

// Display list of all Authors.
export const author_list = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();

    res.render('author_list', {
      title: 'Author List',
      author_list: allAuthors,
    });
  }
);

// Display detail page for a specific Author.
export const author_detail = asyncHandler(
  async (req: AuthorRequest, res, next) => {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, 'title summary').exec(),
    ]);

    if (author === null) {
      // No results.
      const err = new Error('Author not found');
      res.status(404);
      return next(err);
    }

    res.render('author_detail', {
      title: 'Author Detail',
      author: author,
      author_books: allBooksByAuthor,
    });
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
