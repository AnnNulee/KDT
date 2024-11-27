const dns = require('dns')
const { error } = require('console');
const { hostname } = require('os');

dns.lookup('www.naver.com', (err, address) => {
    if (err) throw err;
    console.log(address)
});

dns.reverse('223.130.192.247', (err, hostnames) => {
    if (err) throw err;
    console.log(hostnames)
});
