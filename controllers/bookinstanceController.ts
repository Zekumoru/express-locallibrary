import { Request } from 'express';
import BookInstance from '../models/bookinstance';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Book from '../models/book';

export interface BookInstanceRequest
  extends Request<{
    id: string;
  }> {}

// Display list of all BookInstances
export const bookinstance_list = asyncHandler(
  async (req: BookInstanceRequest, res, next) => {
    const allBookInstances = await BookInstance.find().populate('book').exec();

    res.render('bookinstance_list', {
      title: 'Book Instance List',
      bookinstance_list: allBookInstances,
    });
  }
);

// Display detail page for a specific BookInstance.
export const bookinstance_detail = asyncHandler(
  async (req: BookInstanceRequest, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate('book')
      .exec();

    if (bookInstance === null) {
      // No results.
      const err = new Error('Book copy not found');
      res.status(404);
      return next(err);
    }

    res.render('bookinstance_detail', {
      title: 'Book:',
      bookinstance: bookInstance,
    });
  }
);

// Display BookInstance create form on GET.
export const bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

  res.render('bookinstance_form', {
    title: 'Create BookInstance',
    book_list: allBooks,
  });
});

// Handle BookInstance create on POST.
export const bookinstance_create_post = [
  // Validate and sanitize fields.
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

      return res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
    }

    // Data from form is valid
    await bookInstance.save();
    res.redirect(bookInstance.url);
  }),
];

// Display BookInstance delete form on GET.
export const bookinstance_delete_get = asyncHandler(
  async (req: BookInstanceRequest, res, next) => {
    // Get details of book instance
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate('book')
      .exec();

    if (bookInstance === null) {
      // No results.
      res.redirect('/catalog/bookinstances');
    }

    res.render('bookinstance_delete', {
      title: 'Delete Book Instance',
      bookinstance: bookInstance,
    });
  }
);

// Handle BookInstance delete on POST.
export const bookinstance_delete_post = asyncHandler(
  async (req: BookInstanceRequest, res, next) => {
    await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
    res.redirect('/catalog/bookinstances');
  }
);

// Display BookInstance update form on GET.
export const bookinstance_update_get = asyncHandler(
  async (req: BookInstanceRequest, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
  }
);

// Handle bookinstance update on POST.
export const bookinstance_update_post = asyncHandler(
  async (req: BookInstanceRequest, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
  }
);
