import { Controller } from '@nestjs/common';

@Controller('story')
export class StoryController {}

// #### Public Endpoints
// - `GET /stories` - Get a list of stories (filter by difficulty, word count, grammar points, etc.)
// - `GET /stories/:id` - Get a specific story by ID
// - `GET /stories/random` - Get a random story
// - `POST /stories/generate` - Generate a new story based on user-provided words and grammar points
// - `POST /stories` - Create a custom story (if users can create their own)

// #### Admin/Owner Endpoints
// - `PUT /stories/:id` - Update a story
// - `DELETE /stories/:id` - Delete a story

// #### Real-time
// - `WS /stories/progress` - WebSocket for tracking story generation progress


