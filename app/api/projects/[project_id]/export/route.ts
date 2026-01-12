/**
 * Export Project as Template API
 * GET /api/projects/[project_id]/export - Export project as template zip
 */

import { NextRequest, NextResponse } from 'next/server';
import { exportProjectAsTemplate } from '@/lib/services/template';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ project_id: string }> }
) {
  try {
    const { project_id: projectId } = await params;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Get query parameters for optional metadata
    const searchParams = request.nextUrl.searchParams;
    const options = {
      templateId: searchParams.get('templateId') || undefined,
      name: searchParams.get('name') || undefined,
      description: searchParams.get('description') || undefined,
      author: searchParams.get('author') || undefined,
      version: searchParams.get('version') || undefined,
    };

    // Export project as template
    const zipBuffer = await exportProjectAsTemplate(projectId, options);

    // Generate filename
    const filename = `${options.templateId || projectId}-template.zip`;

    // Return zip file
    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[ExportAPI] Export failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Export failed' },
      { status: 500 }
    );
  }
}
