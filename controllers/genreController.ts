import { Request } from 'express';
import asyncHandler from 'express-async-handler';
import Genre from '../models/genre';
import Book from '../models/book';
import mongoose from 'mongoose';

export interface GenreRequest
  extends Request<{
    id: string;
  }> {}

// Display list of all Genre.
export const genre_list = asyncHandler(async (req: GenreRequest, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();

  res.render('genre_list.pug', {
    title: 'Genre List',
    genre_list: allGenres,
  });
});

// Display detail page for a specific Genre.
export const genre_detail = asyncHandler(
  async (req: GenreRequest, res, next) => {
    // Get details of genre and all associated books (in parallel)
    const [genre, booksInGenre] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }, 'title summary').exec(),
    ]);

    if (genre === null) {
      // No results.
      const err = new Error('Genre not found') as Error & { status: number };
      err.status = 404;
      return next(err);
    }

    res.render('genre_detail', {
      title: 'Genre Detail',
      genre: genre,
      genre_books: booksInGenre,
    });
  }
);

// Display Genre create form on GET.
export const genre_create_get = asyncHandler(
  async (req: GenreRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create GET');
  }
);

// Handle Genre create on POST.
export const genre_create_post = asyncHandler(
  async (req: GenreRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create POST');
  }
);

// Display Genre delete form on GET.
export const genre_delete_get = asyncHandler(
  async (req: GenreRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete GET');
  }
);

// Handle Genre delete on POST.
export const genre_delete_post = asyncHandler(
  async (req: GenreRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete POST');
  }
);

// Display Genre update form on GET.
export const genre_update_get = asyncHandler(
  async (req: GenreRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update GET');
  }
);

// Handle Genre update on POST.
export const genre_update_post = asyncHandler(
  async (req: GenreRequest, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update POST');
  }
);
