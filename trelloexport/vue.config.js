module.exports = {
    publicPath: '/Trello-Reports/',
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
