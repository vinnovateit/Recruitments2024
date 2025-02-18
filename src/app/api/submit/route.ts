import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

interface BasicInfo {
  name: string;
  registrationNumber: string;
  mobileNumber: string;
}

interface DomainData {
  domain: 'technical' | 'management' | 'design';
  data: {
    answers: string[];
  };
}

interface SubmissionRequest {
  basicInfo: BasicInfo;
  domains: DomainData[];
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerAuthSession();
    if (!session?.user?.email?.endsWith("@vitstudent.ac.in")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Only VIT students can submit applications." },
        { status: 401 }
      );
    }

    const body = await req.json() as SubmissionRequest;
    const { basicInfo, domains } = body;

    // Validate basic info
    if (!basicInfo.name || !basicInfo.registrationNumber || !basicInfo.mobileNumber) {
      return NextResponse.json(
        { success: false, error: "Missing required basic information" },
        { status: 400 }
      );
    }

    // Validate registration number format
    const regNoRegex = /^2[2-5][A-Z]{3}\d{4}$/; //TODO: Verify!!
    if (!regNoRegex.test(basicInfo.registrationNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid registration number format" },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(basicInfo.mobileNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Create the application
    const application = await db.application.create({
      data: {
        name: basicInfo.name,
        regNo: basicInfo.registrationNumber,
        email: session.user.email!,
        phone: basicInfo.mobileNumber,
        domainSubmissions: {
          create: domains.map((domain: DomainData) => ({
            domain: domain.domain,
            answers: domain.data.answers,
          })),
        },
      },
      include: {
        domainSubmissions: true,
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    );
  }
}