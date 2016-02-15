Messages = new Mongo.Collection('messages');
Messages.attachSchema(new SimpleSchema({
  groupId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  fromId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  body: {
    type: String,
    max: 512,
    min: 1
  },
  sentAt: {
    type: Date,
    autoValue: function() {
      return new Date;
    }
  },
  seenBy: {
    type: [Object],
    blackbox: true,
    optional: true
  }
}));
