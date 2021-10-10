'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Admins', [{
        email: 'adonai.servicios@hotmail.com',
        password: '$2a$12$YWa9J5gV1R4SQhyIyuXQEuEPPSmvfKda1j1z8MpOILgewECoAptLG',
        createdAt: '2021-10-09 09:12:23',
        updatedAt: '2021-10-09 09:12:23'
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Admins', null, {});
     
  }
};
