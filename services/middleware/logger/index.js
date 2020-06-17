const Logger = async (ctx, next) => {
    await next();
}

module.exports = Logger;