const ApiUrl = GetApiUrl();

export default ApiUrl;

function GetApiUrl() {
    switch(process.env.NODE_ENV) {
        case 'production':
        return 'https://prod.com';
        case 'development':
        default:
        return 'http://127.0.0.1:8081';
    }
}