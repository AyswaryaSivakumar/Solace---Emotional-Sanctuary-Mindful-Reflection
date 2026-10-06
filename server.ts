import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for generating tailored therapeutic stories with Gemini
  app.post('/api/generate-story', async (req, res) => {
    try {
      const { feelings = [], score = 6, reflection = '', resonanceCategory = 'Gentle & Reflective' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Return rich crafted therapeutic story
        return res.json({
          story: {
            id: `story-${Date.now()}`,
            title: 'The Shelter of the Willow',
            subtitle: `Generated for Maya · ${resonanceCategory}`,
            excerpt: 'When the wind bends the branch toward the brook, it is not breaking; it is drinking from the current.',
            fullStory: `Across the meadow, where the wild clover met the cool winding stream, grew an ancient silver willow. For seventy summers, storms had surged across the valley, and on days when the gale raged loudest, the other trees held rigid, trembling with the strain of resisting every gust.

The willow, however, had learned a secret rhythm. When the tempest gathered, she did not stiffen her spine. She let her longest boughs dip downward, brushing the glass surface of the stream, bowing with the wind rather than bruising against it.

A small thrush, exhausted from flying against the headwinds, nested deep inside the willow’s hollow trunk. "Tree," the bird tweeted through the rain, "are you not terrified that the torrent will tear your roots from the soil?"

The willow answered with a low, woody hum that vibrated through the earth: "When you feel overwhelmed, little one, do not waste your breath fighting the entire sky. Let your branches bend. The bend is not your ruin; it is how you keep your roots in the dark earth while the sky clears."

As twilight arrived, the wind subsided into a warm, gentle draft. The willow stood intact, her leaves glistening like silver coins in the evening light.

Whatever weight you hold today (${feelings.join(', ') || 'in your heart'}), remember: you do not have to carry the whole storm. Give yourself permission to bend, to breathe, and to trust your roots.`,
            readTime: '4 min read',
            audioDuration: '4:10',
            category: 'Compassion & Peace',
            tag: feelings[0] || 'Reflection',
            image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'The silver willow by the riverbank',
            quote: '“When you feel overwhelmed, do not waste your breath fighting the entire sky. Let your branches bend. The bend is how you keep your roots.”',
            date: 'Today',
            isSaved: true,
            tailoredFor: feelings,
          },
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a gentle, poetic therapeutic storyteller for a mindfulness sanctuary app named Solace.
The user is checking in:
- Emotional state: ${feelings.join(', ')}
- Energy resonance score: ${score}/10 (${resonanceCategory})
- Personal mindful reflection: "${reflection}"

Write a soothing, evocative 3-4 paragraph parable or fable (around 250-350 words) centered on nature, artisan crafts, light, or quiet sanctuary that directly cradles their feelings with warmth, unhurried compassion, and quiet hope.
Do NOT give clinical advice or generic platitudes. Use sensory imagery (rain, cedar, tea, morning mist, pottery, weaving, hearth).

Format your response as a valid JSON object with the following fields:
{
  "title": "A serene poetic title",
  "quote": "A 1-2 sentence memorable, comforting excerpt in quotation marks",
  "excerpt": "A 1-sentence synopsis",
  "fullStory": "The 3-4 paragraphs of the story separated by double newlines",
  "category": "e.g. Anxiety Relief, Hope & Renewal, or Comfort & Solitude",
  "readTime": "3 min read or 4 min read",
  "audioDuration": "3:30 or 4:00"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);

      const generatedStory = {
        id: `story-${Date.now()}`,
        title: parsed.title || 'The Sanctuary of Dawn',
        subtitle: `Generated for Maya · ${resonanceCategory}`,
        excerpt: parsed.excerpt || 'A quiet reminder of your inner strength.',
        fullStory: parsed.fullStory,
        readTime: parsed.readTime || '4 min read',
        audioDuration: parsed.audioDuration || '3:45',
        category: parsed.category || 'Comfort & Solitude',
        tag: feelings[0] || 'Reflection',
        image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Morning light in the quiet grove',
        quote: parsed.quote || '“The dawn does not hurry to chase the shadow.”',
        date: 'Today',
        isSaved: true,
        tailoredFor: feelings,
      };

      res.json({ story: generatedStory });
    } catch (error) {
      console.error('Error generating story:', error);
      res.status(500).json({ error: 'Failed to generate story' });
    }
  });

  // Mount Vite dev middleware or serve static dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Solace Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
