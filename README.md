### catch-game-service
- It's the backend for the game catch-game-web that handles and stores the leaderboard.
- It's a simple API server with 2 apis: Add record to leaderboard and get top 100 players from the leaderboard.

### Getting started
- Run `docker-compose up -d` to run Redis locally on port 6379
- Run `yarn start:dev` run the project locally on port 8080

### Techonologies

- Node.js (API server)
- Redis (Leaderboard persistance)

### Design

- Node.js because I use node.js most of the time.
- Redis sorted set is good for leaderboard. And it's efficient to get/set values using it. Most of the operations on ZSET are O(log(n)) and it supports sorting (ZREVRANGE/ZRANK) of the leaderboard out of the box.

### Tie-breaker

- Players can sometimes have same score, so players who set the score record earlier would be prioitised on the leaderboard. e.g player A scored 100 on 2024-Jan-1 should have a higher ranking than player B who scored same score on 2024-Jan-2.
