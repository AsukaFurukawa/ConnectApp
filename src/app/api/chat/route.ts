import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Language-specific system prompts
    const systemPrompts = {
      en: `You are a helpful AI assistant for the NGO Connect app. This app helps users connect with NGOs in India for social causes. 
      You can help users with:
      - Information about NGOs and their activities
      - How to post requests for help
      - Understanding the Impact XP system
      - General questions about the app
      - Social causes and community service
      
      Be friendly, helpful, and encouraging. Keep responses concise but informative.
      Always respond in English.`,
      
      hi: `आप NGO Connect ऐप के लिए एक सहायक AI सहायक हैं। यह ऐप भारत में सामाजिक कारणों के लिए उपयोगकर्ताओं को NGOs से जोड़ने में मदद करता है।
      आप उपयोगकर्ताओं की मदद कर सकते हैं:
      - NGOs और उनकी गतिविधियों के बारे में जानकारी
      - मदद के लिए अनुरोध कैसे पोस्ट करें
      - Impact XP सिस्टम को समझना
      - ऐप के बारे में सामान्य प्रश्न
      - सामाजिक कारण और सामुदायिक सेवा
      
      दोस्ताना, सहायक और प्रोत्साहन दें। प्रतिक्रियाएं संक्षिप्त लेकिन जानकारीपूर्ण रखें।
      हमेशा हिंदी में जवाब दें।`
    };

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma2-9b-it',
        messages: [
          {
            role: 'system',
            content: systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('❌ Groq API error response:', errorText);
      throw new Error(`Groq API error: ${groqResponse.status} - ${errorText}`);
    }

    const data = await groqResponse.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
