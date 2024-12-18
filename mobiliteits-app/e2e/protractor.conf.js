exports.config = {
    directConnect: true,
    framework: 'jasmine',
    specs: ['../e2e/src/*.e2e-spec.ts'],
    capabilities: {
        'browserName': 'firefox'
    },
    onPrepare: function () {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    }
};