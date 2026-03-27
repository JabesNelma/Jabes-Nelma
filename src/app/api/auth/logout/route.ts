import { NextResponse } from 'next/server';
import { logout } from '@/lib/auth';
import type { AuthResponse } from '@/types/auth';

export async function POST(): Promise<NextResponse<AuthResponse>> {
  try {
    await logout();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
