import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const dir = params.dir.join("/");

    if (!dir) {
        return new NextResponse(null);
    }

    // Prevent path traversal attacks
    if (dir.indexOf('..') >= 0) {
        return new NextResponse(null);
    }

    try {
        // Read and serve the file
        const data = fs.readFileSync('public/' + dir, { flag: 'r' });

        return new NextResponse(data);

    } catch (error) {
        return new NextResponse(null);
    }
}
