// This file maintains backward compatibility with the old static data structure
// while now using the new API service underneath

import PortfolioService from './portfolioService.js';

// Legacy portfolioData object for backward compatibility
export const portfolioData = {
  programs: {}
};

// Initialize portfolioData with API data
let isInitialized = false;

async function initializePortfolioData() {
  if (isInitialized) return;
  
  try {
    const apiData = await PortfolioService.getPortfolioData();
    portfolioData.programs = apiData.programs;
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize portfolio data:', error);
                }
              }

// Helper functions that now use the API service
export async function getAllStudents() {
  return await PortfolioService.getAllStudents();
}

export async function getAllProjects() {
  return await PortfolioService.getAllProjects();
}

export async function getStudentById(studentId) {
  return await PortfolioService.getStudentById(studentId);
}

export async function getStudentsByProgram(programId) {
  return await PortfolioService.getStudentsByProgram(programId);
}

export async function getStudentsByGroup(programId, groupId) {
  return await PortfolioService.getStudentsByGroup(programId, groupId);
}

export async function getPrograms() {
  return await PortfolioService.getPrograms();
}

export async function getGroups(programId) {
  return await PortfolioService.getGroups(programId);
}

export async function getStudentProjects(studentId) {
  return await PortfolioService.getStudentProjects(studentId);
}

export async function getTechnologies() {
  return await PortfolioService.getTechnologies();
}

// Initialize on module load
initializePortfolioData();

// Export the service for direct access
export { PortfolioService }; 