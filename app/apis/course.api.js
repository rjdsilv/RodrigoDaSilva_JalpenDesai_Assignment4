module.exports = function api(options) {
    // Adds a course with the given code and the given name
    this.add('role:api,path:add', (msg, respond) => {
        const code = msg.args.params.code;
        const name = msg.args.params.name;

        this.act('role:course', {
            cmd: 'create',
            code: code,
            name: name
        }, respond);
    });

    // GETs the course with the current code.
    this.add('role:api,path:get', (msg, respond) => {
        const code = msg.args.params.code;

        this.act('role:course', {
            cmd: 'read',
            code: code
        }, respond);
    });

    // Modifies the name of the course with the given code.
    this.add('role:api,path:modify', (msg, respond) => {
        const code = msg.args.params.code;
        const name = msg.args.params.name;

        this.act('role:course', {
            cmd: 'update',
            code: code,
            name: name
        }, respond);
    });

    // Removes the course with the given code.
    this.add('role:api,path:remove', (msg, respond) => {
        const code = msg.args.params.code;
        
        this.act('role:course', {
            cmd: 'delete',
            code: code
        }, respond);
    });

    this.add('init:api', (msg, respond) => {
        this.act('role:web', {
            routes: {
                prefix: '/api',
                pin: 'role:api,path:*',
                map: {
                    add: {
                        POST: true,
                        suffix: '/:code/:name'
                    },
                    get: {
                        GET: true,
                        suffix: '/:code'
                    },
                    modify: {
                        PUT: true,
                        suffix: '/:code/:name'
                    },
                    remove: {
                        DELETE: true,
                        suffix: '/:code'
                    }
                }
            }
        }, respond)
    });
}