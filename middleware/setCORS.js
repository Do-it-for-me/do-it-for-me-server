module.exports = (req, res, next) => {
    // Add a header to the response
    res.set({ 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token', // Headers that the browser JS runtime can send
        'Access-Control-Expose-Headers': 'X-Auth-Token' // Headers that the browser JS runtime has access to
    });
    next();
};