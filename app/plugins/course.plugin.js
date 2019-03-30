module.exports = function course(options) {
    const mongoose = require('mongoose');
    const Course = mongoose.model('Course');
    //
    function getErrorMessage(err) {
        if (err.errors) {
            for (let errName in err.errors) {
                if (err.errors[errName].message) return err.errors[errName].
                    message;
            }
        } else {
            return 'Unknown server error';
        }
    };

    this.add('role:course,cmd:create', (msg, respond) => {
        const course = new Course({ code: msg.code, name: msg.name });
        course.save((err) => {
            if (err) {
                respond(null, { message: 'Error when creating course: ' + getErrorMessage(err) });
            } else {
                respond(null, { course: course });
            }
        });
    });

    this.add('role:course,cmd:read', (msg, respond) => {
        Course.findOne({ code: msg.code }).exec((err, course) => {
            if (err) {
                respond(null, { message: 'Error when searching course: ' + getErrorMessage(err) });
            } else {
                if (course) {
                    respond(null, { course: course });
                } else {
                    respond(null, { message: 'Course ' + msg.code + ' not found.' });
                }
            }
        });
    });

    this.add('role:course,cmd:update', (msg, respond) => {
        Course.findOne({ code: msg.code }).exec((err, course) => {
            if (err) {
                respond(null, { message: 'Error when updating course: ' + getErrorMessage(err) });
            } else {
                if (course) {
                    course.name = msg.name;
                    course.save((err) => {
                        if (err) {
                            respond(null, { message: 'Error when updating course: ' + getErrorMessage(err) });
                        } else {
                            respond(null, { course: course });
                        }
                    });
                } else {
                    respond(null, { message: 'Course ' + msg.code + ' cannot be updated as it does not exist.' });
                }
            }
        });
    });

    this.add('role:course,cmd:delete', (msg, respond) => {
        Course.findOne({ code: msg.code }).exec((err, course) => {
            if (err) {
                respond(null, { message: 'Error when removing course: ' + getErrorMessage(err) });
            } else {
                if (course) {
                    course.remove((err) => {
                        if (err) {
                            respond(null, { message: 'Error when removing course: ' + getErrorMessage(err) });
                        } else {
                            respond(null, { message: 'Course ' + msg.code + ' successfully removed.' });
                        }
                    });
                } else {
                    respond(null, { message: 'Course ' + msg.code + ' cannot be removed as it does not exist.' });
                }
            }
        });
    });
}