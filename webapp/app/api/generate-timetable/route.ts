import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { constraints } = await req.json()

    const prompt = `
You are a school timetable scheduling expert. Generate a complete weekly timetable
for a coaching institute based on the following constraints.

BATCHES:
${JSON.stringify(constraints.batches, null, 2)}

TEACHERS:
${JSON.stringify(constraints.teachers, null, 2)}

ROOMS:
${JSON.stringify(constraints.rooms, null, 2)}

SUBJECTS PER BATCH:
${JSON.stringify(constraints.subjectsPerBatch, null, 2)}

CONSTRAINTS:
${JSON.stringify(constraints.rules, null, 2)}

Generate a timetable that:
1. Assigns the correct number of periods per subject per week for each batch
2. Never double-books a teacher (same teacher, same time, different batch)
3. Never double-books a room (same room, same time, different batch)
4. Respects each teacher's available days and hours
5. Respects each batch's preferred class days
6. Distributes subjects evenly across the week (no subject twice in one day)
7. Keeps the same teacher for the same subject in a batch
8. Respects minimum gap between classes for teachers (at least 1 slot gap)
9. Ensures no batch has more than 3 back-to-back periods

Return ONLY a valid JSON object in this exact format:
\`\`\`json
{
  "timetable": {
    "BATCH_ID": {
      "Monday": [
        {
          "slotId": "SLOT_ID",
          "startTime": "08:00",
          "endTime": "10:00",
          "subject": "Mathematics",
          "subjectColor": "#5E4E99",
          "teacherId": "TCH001",
          "teacherName": "Priya Sharma",
          "room": "Room 101",
          "type": "Regular"
        }
      ],
      "Tuesday": [ ... ],
      "Wednesday": [ ... ],
      "Thursday": [ ... ],
      "Friday": [ ... ],
      "Saturday": [ ... ]
    }
  },
  "conflicts": [],
  "warnings": ["Teacher X has 4 consecutive periods on Monday — consider splitting"],
  "stats": {
    "totalPeriodsScheduled": 48,
    "teacherUtilization": { "TCH001": 85, "TCH002": 72 },
    "roomUtilization": { "Room 101": 60, "Room 102": 55 },
    "unscheduledSubjects": []
  }
}
\`\`\`

If any constraint cannot be satisfied, add it to the "conflicts" array with a reason.
Do not include any explanation outside the JSON block.
`

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

    const content = response.content[0];
    const text = content.type === "text" ? content.text : "";

    // Parse JSON from Claude's response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/)
    const timetableData = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(text)

    return NextResponse.json(timetableData)
  } catch (error: any) {
    console.error("AI Generation Error:", error)
    return NextResponse.json({ 
      error: "Failed to generate timetable", 
      details: error.message 
    }, { status: 500 })
  }
}
