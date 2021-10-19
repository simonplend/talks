# Menu Service v3 Test Results

## Commands used

```bash
# On laptop
clinic doctor -- node menu-service-v3/server.js
```

```bash
# On desktop
autocannon -c 100 -d 60 menu-service.icecreamcorp.net:3000/menu
```

## AutoCannon results

```
Running 60s test @ http://menu-service.icecreamcorp.net:3000/menu
100 connections

┌─────────┬────────┬─────────┬─────────┬─────────┬──────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg      │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼──────────┼───────────┼─────────┤
│ Latency │ 282 ms │ 1006 ms │ 1116 ms │ 1167 ms │ 967.9 ms │ 172.98 ms │ 1251 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴──────────┴───────────┴─────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 4       │ 78      │ 104     │ 111     │ 102.57  │ 13.55   │ 4       │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 1.87 kB │ 25.3 kB │ 32.9 kB │ 36.2 kB │ 32.3 kB │ 4.28 kB │ 1.87 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

614 2xx responses, 5540 non 2xx responses
6k requests in 60.03s, 1.94 MB read
```

## Clinic.js results

[28477.clinic-doctor.html](.clinic/28477.clinic-doctor.html)
