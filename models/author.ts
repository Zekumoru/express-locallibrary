import { Schema, model } from 'mongoose';
import { DateTime } from 'luxon';

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  },
  {
    virtuals: {
      url: {
        get() {
          return `/catalog/author/${this._id}`;
        },
      },
      name: {
        get() {
          let fullname = '';

          if (this.first_name && this.family_name) {
            fullname = `${this.family_name}, ${this.first_name}`;
          }

          return fullname;
        },
      },
      date_of_living: {
        get() {
          if (!this.date_of_birth && !this.date_of_death) {
            return 'Unknown';
          }

          const dateOfBirth = this.date_of_birth
            ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
                DateTime.DATE_MED
              )
            : 'Unknown';
          const dateOfDeath = this.date_of_death
            ? DateTime.fromJSDate(this.date_of_death).toLocaleString(
                DateTime.DATE_MED
              )
            : 'Alive';

          return `${dateOfBirth} - ${dateOfDeath}`;
        },
      },
    },
  }
);

export default model('Author', AuthorSchema);
