function createTeam(coach, ...players) {
  return {
      coach: coach,
      players: players,
      teamSize: players.length,
      listPlayers: function() {
          console.log(`Coach: ${this.coach}`);
          this.players.forEach((player, index) => {
              console.log(`Player ${index + 1}: ${player}`);
          });
      }
  };
}

// 创建一个团队
const myTeam = createTeam("Coach Smith", "John Doe", "Jane Doe", "Alice Johnson");

// 输出团队信息
console.log(myTeam);
/*
输出:
{
coach: 'Coach Smith',
players: [ 'John Doe', 'Jane Doe', 'Alice Johnson' ],
teamSize: 3,
listPlayers: [Function: listPlayers]
}
*/

// 列出所有球员
myTeam.listPlayers();
/*
输出:
Coach: Coach Smith
Player 1: John Doe
Player 2: Jane Doe
Player 3: Alice Johnson
*/