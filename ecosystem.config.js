module.exports = {
  apps : [{
    name: 'shopeeProduct',
    script: 'shop.js',
    cron_restart: '0 0 * * *',
    autorestart: true
  },{
    name: "server",
    script: 'server.js',
    autorestart: true
  }]
};
