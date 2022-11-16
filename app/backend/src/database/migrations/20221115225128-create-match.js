'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        field: 'home_team',
        type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: Sequelize.INTEGER
      },
      awayTeam: {
        field: 'away_team',
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
