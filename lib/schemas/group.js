Groups = new Mongo.Collection('groups');
Groups.attachSchema(new SimpleSchema({
  name: {
    label: 'The group name',
    type: String,
    max: 64,
    min: 4
  },
  description: {
    label: 'A short description of the group',
    type: String,
    max: 128
  },
  icon: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return 'http://placehold.it/128x128';
      }
    }
  },
  admins: {
    type: [Object],
    blackbox: true,
    optional: true // TODO REMOVE LATER
  },
  participants: {
    type: [Object],
    blackbox: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date;
    }
  }
}));
