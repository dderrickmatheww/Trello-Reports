module.exports = {
    publicPath: '/',
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