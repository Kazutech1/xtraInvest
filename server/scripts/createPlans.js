import prisma from '../src/config/database.js';

const defaultPlans = [
  {
    name: 'Basic',
    description: 'Basic investment plan',
    minAmount: 50,
    maxAmount: 999,
    profitRate: 10,
    duration: 24, // hours
    isActive: true
  },
  {
    name: 'Premium',
    description: 'Premium investment plan',
    minAmount: 1000,
    maxAmount: 4999,
    profitRate: 15,
    duration: 120, // 5 days in hours
    isActive: true
  },
  {
    name: 'Advance',
    description: 'Advanced investment plan',
    minAmount: 5000,
    maxAmount: null, // Unlimited
    profitRate: 20,
    duration: 240, // 10 days in hours
    isActive: true
  }
];

async function initializePlans() {
  try {
    // Delete all existing plans (optional)
    await prisma.investmentPlan.deleteMany();

    // Create default plans
    for (const plan of defaultPlans) {
      await prisma.investmentPlan.create({
        data: plan
      });
      console.log(`Created plan: ${plan.name}`);
    }

    console.log('Default investment plans initialized successfully');
  } catch (error) {
    console.error('Error initializing plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializePlans();