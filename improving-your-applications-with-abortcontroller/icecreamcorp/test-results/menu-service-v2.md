# Menu Service v2 Test Results

## Commands used

```bash
# On laptop
clinic doctor -- node menu-service-v2/server.js
```

```bash
# On desktop
autocannon -c 100 -d 60 menu-service.icecreamcorp.net:3000/menu
```

## AutoCannon results

```
Running 60s test @ http://menu-service.icecreamcorp.net:3000/menu
100 connections

┌─────────┬────────┬─────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 253 ms │ 1004 ms │ 1024 ms │ 1146 ms │ 957.63 ms │ 176.57 ms │ 1217 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────────┬───────┬───────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%  │ 50%   │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼───────┼───────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 13      │ 100   │ 105   │ 112     │ 103.47  │ 12.1   │ 13      │
├───────────┼─────────┼───────┼───────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 6.08 kB │ 31 kB │ 33 kB │ 36.1 kB │ 32.8 kB │ 3.7 kB │ 6.08 kB │
└───────────┴─────────┴───────┴───────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

612 2xx responses, 5596 non 2xx responses
6k requests in 60.03s, 1.97 MB read
```

## Clinic.js results

[29186.clinic-doctor.html](.clinic/29186.clinic-doctor.html)
