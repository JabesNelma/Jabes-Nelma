import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import type { AuthResponse } from '@/types/auth';

export async function GET(): Promise<NextResponse<AuthResponse>> {
  try {
    const user = await getSession();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authenticated',
      user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
