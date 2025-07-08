import prisma from '../src/config/database.js';
import { hashPassword } from '../src/utils/helpers.js';

const createAdmin = async () => {
  const adminData = {
    username: 'admin', // Change this to your preferred username
    password: await hashPassword('admin123') // Change this to a strong password
  };

  try {
    const existingAdmin = await prisma.admin.findFirst({
      where: { username: adminData.username }
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const admin = await prisma.admin.create({
      data: adminData
    });

    console.log('Admin created successfully');
    console.log('Username:', adminData.username);
    console.log('Password: admin123 (change this immediately after first login)');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();