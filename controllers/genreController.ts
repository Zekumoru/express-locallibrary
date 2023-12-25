import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Genre from '../models/genre';
import Book from '../models/book';
import { body, validationResult } from 'express-validator';

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
      const err = new Error('Genre not found');
      res.status(404);
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
export const genre_create_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render('genre_form', { title: 'Create Genre' });
};

// Handle Genre create on POST.
export const genre_create_post = [
  // Validate and sanitize the name field.
  body('name', 'Genre name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array(),
      });
    }

    // Data from form is valid.
    // Check if Genre with same name already exists.
    const genreExists = await Genre.findOne({ name: req.body.name })
      .collation({ locale: 'en', strength: 2 })
      .exec();
    if (genreExists) {
      // Genre exists, redirect to its detail page.
      return res.redirect(genreExists.url);
    }

    await genre.save();
    // New genre saved. Redirect to genre detail page.
    res.redirect(genre.url);
  }),
];

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
