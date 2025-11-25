import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path if needed

// GET: Fetch all users
export async function GET() {
    try {
        const users = await prisma.test.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

// POST: Create a new user
export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();
        const user = await prisma.test.create({
            data: { name, email },
        });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}