# Menu Service v1 Test Results

```bash
# On laptop
clinic doctor -- node menu-service-v1/server.js
```

```bash
# On desktop
autocannon -c 100 -d 60 menu-service.icecreamcorp.net:3000/menu
```

## AutoCannon results

```
Running 60s test @ http://menu-service.icecreamcorp.net:3000/menu
100 connections

┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬────────────┬──────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev      │ Max      │
├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼────────────┼──────────┤
│ Latency │ 244 ms │ 4862 ms │ 9718 ms │ 9900 ms │ 4898.42 ms │ 2941.22 ms │ 10000 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴────────────┴────────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 6       │ 8       │ 19      │ 27      │ 19.15   │ 4.63    │ 6       │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.81 kB │ 3.75 kB │ 8.91 kB │ 12.7 kB │ 8.98 kB │ 2.17 kB │ 2.81 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

1k requests in 60.03s, 539 kB read
3 errors (3 timeouts)
```

## Clinic.js results

[29503.clinic-doctor.html](.clinic/29503.clinic-doctor.html)
