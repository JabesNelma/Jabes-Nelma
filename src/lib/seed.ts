import { db } from './db';
import { hashPassword } from './auth';

const DEFAULT_ADMIN = {
  email: 'admin@portfolio.com',
  password: 'Admin123!',
  name: 'Admin',
  role: 'admin',
};

export async function seedAdminUser() {
  console.log('Seeding admin user...');

  try {
    // Check if admin already exists
    const existingAdmin = await db.user.findUnique({
      where: { email: DEFAULT_ADMIN.email },
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return { success: true, message: 'Admin user already exists', user: existingAdmin };
    }

    // Hash password
    const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

    // Create admin user
    const admin = await db.user.create({
      data: {
        email: DEFAULT_ADMIN.email,
        password: hashedPassword,
        name: DEFAULT_ADMIN.name,
        role: DEFAULT_ADMIN.role,
      },
    });

    console.log('Admin user created successfully');
    console.log(`Email: ${DEFAULT_ADMIN.email}`);
    console.log(`Password: ${DEFAULT_ADMIN.password}`);

    return { success: true, message: 'Admin user created successfully', user: admin };
  } catch (error) {
    console.error('Error seeding admin user:', error);
    return { success: false, message: 'Failed to create admin user', error };
  }
}

// Run seed if called directly
if (require.main === module) {
  seedAdminUser()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
