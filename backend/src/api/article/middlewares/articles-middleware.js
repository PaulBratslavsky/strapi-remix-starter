"use strict";

/**
 * `articles` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In articles middleware.");
    console.log(ctx.state.user);

    // Ensure filters property exists before modifying
    ctx.query.filters = ctx.query.filters || {};

    console.log(ctx.query, "query");

    if (ctx.state.user) ctx.query.filters.premium = [true, false]; // Both premium and non-premium
    else ctx.query.filters.premium = false; // Only non-premium
    
    await next();
  };
};
