module.exports = {
    publicPath: '/Trello-Exports/',
    configureWebpack: () => {
        var obj = {
            externals: {
                './cptable': 'var cptable',
                '../xlsx.js': 'var _XLSX'
            }
        };
        return obj;
    }
}
