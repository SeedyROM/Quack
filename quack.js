if (Meteor.isClient) {
  //Session.set('currentGroup', 'tgZFabqdJsTHbR8Lo');

  Template.registerHelper('currentGroup', function() {
    return Session.get('currentGroup');
    var d = $('.chatMessages');
    d.animate({
      scrollTop: d.prop('scrollHeight')
    }, 1000);
  });

  Template.groupsMenu.events({
    'click .groupMenuScroll li': function(e, t) {
      var groupId = e.currentTarget.id.split('_')[1];
      Session.set('currentGroup', groupId);
    }
  });

  Template.groupsMenu.rendered = function() {
    Session.set('currentGroup', undefined);
  };

  Template.groupsMenu.helpers({
    groups: function() {
      return Groups.find({}, {
        sort: {
          name: 1
        }
      });
    },
    isCurrentGroup: function(_id) {
      return Session.get('currentGroup') === _id;
    }
  });
  Template.chatSection.helpers({
    group: function() {
      return Groups.findOne({
        _id: Session.get('currentGroup')
      });
    },
    messages: function() {
      return Messages.find({
        groupId: this.id
      }, {
        sort: {
          sentAt: 1
        }
      });
    }
  });

  Template.chatSection.events({
    'submit #messageSend': function(e, t) {
      e.preventDefault();
      Messages.insert({
        groupId: Session.get('currentGroup'),
        body: $('#messageBody').val(),
        fromId: Session.get('currentGroup')
      }, function(error) {
        if (error) {
          throw new Meteor.Error(error);
        } else {
          $('#messageBody').val('');
          var d = $('.chatMessages');
          d.animate({
            scrollTop: d.prop('scrollHeight')
          }, 1000);
        }
      });
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function() {
    /*
    Groups.insert({
      name: 'Bash Script Tips and Tricks',
      description: 'Place to ask about shell and bash topics.',
      participants: [{
        _id: 'b105582bc495617542af18e9',
        username: 'friggydicky'
      }]
    });
    */
  });
}
