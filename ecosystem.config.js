module.exports = {
  apps : [{
    name: 'shopeeProduct',
    script: 'shop.js',
    cron_restart: '0 0 * * *',
    autorestart: true
  }]
};
