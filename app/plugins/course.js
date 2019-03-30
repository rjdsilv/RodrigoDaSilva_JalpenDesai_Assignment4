module.exports = function course(options) {
    this.add('role:course,cmd:create', (msg, respond) => {
        respond(null, {
            course: {
                code: msg.code,
                name: msg.name
            },
            message: 'Course Successfully Created!'
        });
    });

    this.add('role:course,cmd:read', (msg, respond) => {
        respond(null, {
            course: {
                code: msg.code,
                name: msg.name
            },
            message: 'Course Successfully Read!'
        });
    });

    this.add('role:course,cmd:update', (msg, respond) => {
        respond(null, {
            course: {
                code: msg.code,
                name: msg.name
            },
            message: 'Course Successfully Updated!'
        });
    });

    this.add('role:course,cmd:delete', (msg, respond) => {
        respond(null, {
            course: {
                code: msg.code,
                name: msg.name
            },
            message: 'Course Successfully Deleted!'
        });
    });
}