import fetch from 'node-fetch';

export interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  citations: string[];
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface LocalResource {
  title: string;
  description: string;
  phone?: string;
  website?: string;
  hours?: string;
  address?: string;
  type: string;
}

export async function searchLocalResources(location: string): Promise<LocalResource[]> {
  if (!process.env.PERPLEXITY_API_KEY) {
    throw new Error("PERPLEXITY_API_KEY environment variable must be set");
  }

  const prompt = `
    I'm looking for maternal and child support resources in ${location}, Australia. Please provide a list of:
    
    1. Local childcare services
    2. Healthcare facilities specializing in maternal and child health
    3. Parent support groups
    4. Mental health resources for new mothers
    5. Community centers with mother-baby programs
    
    For each resource, please include the name, a brief description, phone number (in Australian format), 
    website URL, opening hours, and street address if available.
    
    Format your response as a concise, structured list that would be helpful for a mother looking for local support.
  `;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant focused on helping Australian mothers find local resources and support. Be precise, accurate, and focus on providing practical information. When information isn't available, indicate that clearly rather than making assumptions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        search_domain_filter: [],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month",
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} ${errorText}`);
    }

    const data = await response.json() as PerplexityResponse;
    
    // Extract and parse the response into LocalResource objects
    return parseResponseToResources(data.choices[0].message.content);
  } catch (error) {
    console.error('Error searching for local resources:', error);
    throw error;
  }
}

// Helper function to parse the AI response into structured LocalResource objects
function parseResponseToResources(content: string): LocalResource[] {
  // This is a basic implementation that would need to be improved based on the actual response format
  const resources: LocalResource[] = [];
  
  // Split the content by numbered items or double line breaks
  const sections = content.split(/\d+\.\s|\n\n/).filter(Boolean);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    const lines = section.split('\n').filter(Boolean).map(line => line.trim());
    if (lines.length < 2) continue;
    
    const title = lines[0].replace(/^[-*•]|\*\*/g, '').trim();
    const description = lines[1].replace(/^[-*•]|\*\*/g, '').trim();
    
    const resource: LocalResource = {
      title,
      description,
      type: determineResourceType(title, description),
    };
    
    // Try to extract contact information, hours, etc.
    for (const line of lines.slice(2)) {
      if (line.match(/phone|call|tel/i)) {
        resource.phone = extractPhoneNumber(line);
      } else if (line.match(/website|www|http|\.com|\.org|\.gov/i)) {
        resource.website = extractWebsite(line);
      } else if (line.match(/hours|open|time/i)) {
        resource.hours = extractHours(line);
      } else if (line.match(/address|located at|location/i)) {
        resource.address = extractAddress(line);
      }
    }
    
    resources.push(resource);
  }
  
  return resources;
}

function extractPhoneNumber(line: string): string {
  // Match Australian phone number formats
  const match = line.match(/((?:\+?61|0)[2-478](?:\s?\d{4}){2}|(?:\+?61|0)4\d{2,3}(?:\s?\d{3}){2}|1[38]00\s?\d{3}\s?\d{3})/);
  return match ? match[0] : '';
}

function extractWebsite(line: string): string {
  const match = line.match(/(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/);
  let website = match ? match[0] : '';
  if (website && !website.startsWith('http')) {
    website = 'https://' + website;
  }
  return website;
}

function extractHours(line: string): string {
  const colonPos = line.indexOf(':');
  return colonPos > -1 ? line.substring(colonPos + 1).trim() : line;
}

function extractAddress(line: string): string {
  const colonPos = line.indexOf(':');
  return colonPos > -1 ? line.substring(colonPos + 1).trim() : line;
}

function determineResourceType(title: string, description: string): string {
  const textToCheck = title.toLowerCase() + ' ' + description.toLowerCase();
  
  if (textToCheck.includes('childcare') || textToCheck.includes('daycare') || textToCheck.includes('child care')) {
    return 'childcare';
  } else if (textToCheck.includes('hospital') || textToCheck.includes('clinic') || textToCheck.includes('medical') || textToCheck.includes('health') || textToCheck.includes('doctor')) {
    return 'healthcare';
  } else if (textToCheck.includes('group') || textToCheck.includes('support') || textToCheck.includes('community')) {
    return 'support';
  } else if (textToCheck.includes('mental') || textToCheck.includes('counseling') || textToCheck.includes('therapy')) {
    return 'mental-health';
  } else {
    return 'other';
  }
}