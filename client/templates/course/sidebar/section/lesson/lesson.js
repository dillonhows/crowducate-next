Template.sectionLesson.events({
    'click .sidebar-lesson-link': function (event) {
        event.preventDefault();

        // Check if user is editing lesson text
        if (editingLessonText.get()) {
            // if so, alert them that changes might be lost
            if (window.confirm("Changes may be lost! Proceed?")) {
                // Remove rich text and set edit mode to false
                lessonEditCleanup();

                // set active lesson ID reactive variable
                // to the value of clicked lesson
                activeLessonID.set(this._id);
            }
        } else {
            // set active lesson ID reactive variable
            // to the value of clicked lesson
            activeLessonID.set(this._id);
        }
    },
    'click .editable-submit': function (event, template) {
        // Get the new name from the inline editor
        var newName = template.find('input').value;

        // update the lesson in database
        Lessons.update(this._id, {$set: {'name': newName}});
    },
    'click .lesson-mark-done': function(event, template) {
      console.log(this);
      var CompletedLessonId = CompletedLessons.insert({
        lessonId: this._id,
        userId: Meteor.userId(),
        createdAt: new Date()
      });
    }
});

Template.sectionLesson.helpers({
  isCompleted: function() {
    return !!CompletedLessons.findOne({lessonId: this._id}) ? "completed" : "";
  }
});
