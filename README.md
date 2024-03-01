### Techonologies

- Node.js (API server)
- Redis (Leaderboard persistance)

### Design

- Node.js because I use node.js most of the time.
- Redis sorted set is good for leaderboard. And it's efficient to get/set values using it.

### Tie-breaker

- Players can sometimes have same score, so players who set the score record earlier would be prioitised on the leaderboard. e.g player A scored 100 on 2024-Jan-1 should have a higher ranking than player B who scored same score on 2024-Jan-2.
