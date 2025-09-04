import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const [width, height] = resolvedParams.params;
    
    // Validate dimensions
    const w = parseInt(width) || 400;
    const h = parseInt(height) || 300;
    
    // Limit dimensions for security
    const maxWidth = 2000;
    const maxHeight = 2000;
    
    const finalWidth = Math.min(w, maxWidth);
    const finalHeight = Math.min(h, maxHeight);
    
    // Redirect to Picsum Photos with the requested dimensions
    const picsumUrl = `https://picsum.photos/${finalWidth}/${finalHeight}?random=${Date.now()}`;
    
    return NextResponse.redirect(picsumUrl);
    
  } catch (error) {
    console.error('Placeholder API error:', error);
    // Fallback to a default image
    return NextResponse.redirect('https://picsum.photos/400/300');
  }
}
